import React from 'react'
import { Handle, Position } from '@xyflow/react'

import { useNodeStore } from '../../../store/nodeStore'

function ConstantNode({ data, isConnectable, id }) {
  const setPrompt = useNodeStore((state) => state.setPrompt)
  const onChange = (e) => {
    setPrompt(id, e.target.value)
  }

  return (
    <div className="border relative border-gray-200 rounded-xl w-80 p-3 bg-white">
      <div className="">
        <div>
          <h1 htmlFor="text" className="block font-semibold tracking-tight">
            Text
          </h1>
          <label htmlFor="text" className="text-[10px] text-gray-500">
            Use this node for constant text to be included in the flow.
          </label>
        </div>
        <textarea
          placeholder="A large language model (LLM) is a type of computational model designed for natural language processing..."
          onChange={onChange}
          className="w-full min-h-40 border hover:cursor-text focus:ring-0 focus:border-0 p-1.5 text-xs rounded-md"
        />
        <button className="bg-green-500 px-3 mt-2 py-1 text-white font-black text-xs rounded">
          Run
        </button>
      </div>
      <Handle
        type="target"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  )
}

export default ConstantNode
