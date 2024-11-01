import Heap from '../../src/main/algo/heap'
import Graph from '../../src/main/algo/graph'

test('heap operations', () => {
  const heap = new Heap()
  heap.insert(4)
  heap.insert(3)
  heap.insert(2)
  heap.insert(1)
  heap.insert(0)
  expect(heap.extract()).toBe(0)
  expect(heap.extract()).toBe(1)
  expect(heap.extract()).toBe(2)
  expect(heap.extract()).toBe(3)
  expect(heap.extract()).toBe(4)
})

test('heapify', () => {
  const heap = new Heap([4, 3, 2, 1, 0])
  heap._buildHeap()
  expect(heap.heap).toEqual([0, 1, 2, 4, 3])
})

test('heapify with custom comparator', () => {
  const nodes = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]

  const edges = [
    { source: 1, target: 2 },
    { source: 1, target: 3 },
    { source: 2, target: 3 },
    { source: 3, target: 4 },
  ]

  //        2
  //       / \
  //   1 -    \
  //       \   \
  //        - - 3 - 4

  const g = new Graph(nodes, edges)

  expect(g.isCyclical()).toBe(false)

  const queue = new Heap(
    g.buildQueue(),
    (a, b) => a.dependencies.length - b.dependencies.length
  )

  const removeDependencies = (queue, extracted) => {
    queue.heap.forEach((node, i) => {
      queue.heap[i].dependencies = queue.heap[i].dependencies.filter(
        (d) => d !== extracted.id
      )
    })
  }

  let extracted = queue.peek()
  removeDependencies(queue, extracted)
  queue.extract()
  expect(extracted.id).toBe(1)

  extracted = queue.peek()
  removeDependencies(queue, extracted)
  queue.extract()
  expect(extracted.id).toBe(2)

  extracted = queue.peek()
  removeDependencies(queue, extracted)
  queue.extract()
  expect(extracted.id).toBe(3)

  extracted = queue.peek()
  removeDependencies(queue, extracted)
  queue.extract()
  expect(extracted.id).toBe(4)

  expect(() => queue.extract()).toThrow('Heap underflow')
})
