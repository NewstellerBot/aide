import Graph from '../algo/graph'
import Heap from '../algo/heap'

const removeDependencies = (queue, extracted) => {
  queue.heap.forEach((node, i) => {
    queue.heap[i].dependencies = queue.heap[i].dependencies.filter(
      (d) => d !== extracted.id
    )
  })
}

export const executeGraph = (_, data) => {
  console.log('Executing llm function', data)
  // try {
  //   console.log('Executing llm function')
  //   const { nodes, edges } = data
  //   if (!nodes || !edges) {
  //     throw new Error('Nodes and edges are required')
  //   }

  //   const graph = new Graph(nodes, edges)
  //   if (graph.isCyclical()) {
  //     throw new Error('Graph is cyclical')
  //   }

  //   const queue = new Heap(
  //     graph.buildQueue(),
  //     (a, b) => a.dependencies.length - b.dependencies.length
  //   )

  //   let prompts = []
  //   while (queue.heap.length > 0) {
  //     while (queue.heap.peek().dependencies.length === 0) {
  //       const extracted = queue.extract()
  //       prompts.push(this.llm.generateResponse(extracted.prompt))
  //       removeDependencies(queue, extracted)
  //     }

  //     const response = await Promise.allSettled(prompts)
  //     console.log(response)
  //   }
  // } catch (error) {
  //   console.error('error while executing llm function: ', error)
  // }
}
