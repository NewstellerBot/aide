import { applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react'
import { create } from 'zustand'
import { v4 as uuid } from 'uuid'

const deafultNode = () => ({
  id: uuid(),
  position: { x: 50, y: 50 },
  prompt: '',
  response: null,
  isConnectable: true,
  isLoading: false,
  type: 'prompt',
})

const initialNodes = [deafultNode()]

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
  setResponse: (id, response) => {
    console.log('setting response', id, response)
    const nodes = get().nodes.map((node) =>
      node.id === id ? { ...node, response } : node
    )
    set({ nodes })
  },
  startLoadingAll: () => {
    set({ nodes: get().nodes.map((node) => ({ ...node, isLoading: true })) })
  },
  stopLoading: (id) => {
    const nodes = get().nodes.map((node) =>
      node.id === id ? { ...node, isLoading: false } : node
    )
    set({ nodes })
  },
  setEdges: (edges) => {
    set({ edges })
  },
  addNode: () => {
    set({ nodes: [...get().nodes, deafultNode()] })
  },
  setPrompt: (id, prompt) => {
    const nodes = get().nodes.map((node) =>
      node.id === id ? { ...node, prompt } : node
    )
    set({ nodes })
  },
}))

export { useNodeStore }
