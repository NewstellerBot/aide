import Graph from '../../lib/algo/graph'
import Heap from '../../lib/algo/heap'

const updateNodes = (queue, extracted, response) => {
  queue.heap.forEach((_, i) => {
    // add response to dependent nodes' context
    if (queue.heap[i].dependencies.includes(extracted.id))
      queue.heap[i].context.push(response)
    // remove the executed node from dependencies
    queue.heap[i].dependencies = queue.heap[i].dependencies.filter(
      (d) => d !== extracted.id
    )
  })
}

export async function executeGraph(event, { nodes, edges }) {
  if (!nodes || !edges) {
    throw new Error('Nodes and edges are required')
  }

  const graph = new Graph(nodes, edges)
  if (graph.isCyclical()) {
    throw new Error('Graph is cyclical')
  }

  const queue = new Heap(
    graph.buildQueue(),
    (a, b) => a.dependencies.length - b.dependencies.length
  )

  while (queue.heap.length > 0) {
    const current = queue.peek()
    // make sure dependencies are resolved
    if (current.dependencies.length !== 0)
      throw new Error('Dependencies not resolved')
    // execute the node
    const response = await this.llm.generateResponse(
      [current.prompt, ...current.context].join('\n---\n')
    )

    updateNodes(queue, current, response.choices[0].message.content)
    queue.extract()
    console.log(
      'Node executed:',
      current.dependencies,
      current.prompt + current.context.join(' '),
      '->',
      response.choices[0].message.content,
      '\n-----\n'
    )

    // event.emit('llm:response', response.choices[0].message.content)
    event.reply('llm:response', {
      nodeId: current.id,
      response: response.choices[0].message.content,
    })
  }
}
