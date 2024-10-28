import React from 'react'
import { Handle, Position } from '@xyflow/react'

function PromptNode({ data, isConnectable, onChange, id }) {
  return (
    <div className="border relative border-gray-200 rounded-xl w-80 p-3 bg-white">
      <div className="">
        <div>
          <h1 htmlFor="text" className="block font-semibold tracking-tight">
            Prompt
          </h1>
          <label htmlFor="text" className="text-[10px] text-gray-500">
            Use this node for creating prompt in the flow.
          </label>
        </div>
        <textarea
          placeholder="Act as an expert in your summarization..."
          onChange={onChange}
          className="w-full border hover:cursor-text focus:ring-0 focus:border-0 p-1.5 text-xs rounded-md"
        />
        <button className="bg-green-500 px-3 mt-2 py-1 text-white font-black text-xs rounded">
          Run
        </button>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
    </div>
  )
}

export default PromptNode
