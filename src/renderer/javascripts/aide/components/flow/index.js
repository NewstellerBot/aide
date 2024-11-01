import React, { useCallback, useState } from 'react'
import { ReactFlow, Background, Controls } from '@xyflow/react'

import { ConstantNode, PromptNode } from './nodes'
import { useNodeStore } from '../../store/nodeStore'
import { useShallow } from 'zustand/react/shallow'

const nodeTypes = {
  prompt: PromptNode,
  constant: ConstantNode,
}

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
})

const Flow = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useNodeStore(useShallow(selector))
  return (
    <ReactFlow
      nodes={nodes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      edges={edges}
    >
      <Background />
      <Controls />
    </ReactFlow>
  )
}

export default Flow
