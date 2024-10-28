import { applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react'
import { create } from 'zustand'

const initialNodes = [
  {
    id: '1',
    position: { x: 10, y: 10 },
    isConnectable: true,
    type: 'prompt',
  },
  {
    id: '2',
    position: { x: 200, y: 200 },
    isConnectable: true,
    type: 'prompt',
  },
]

const initialEdges = []

const useNodeStore = create((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) })
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    })
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    })
  },
  setNodes: (nodes) => {
    set({ nodes })
  },
  setEdges: (edges) => {
    set({ edges })
  },
}))

export { useNodeStore }
