import React from 'react'
import { Handle, Position } from '@xyflow/react'
import { Clipboard } from 'lucide-react'

import { useNodeStore } from '../../../store/nodeStore'
import Spinner from '../../ui/spinner'
import toast from 'react-hot-toast'

function PromptNode({ isConnectable, id }) {
  const setPrompt = useNodeStore((state) => state.setPrompt)

  const node = useNodeStore((state) => state.nodes.find((n) => n.id === id))
  if (!node) return null

  const onChange = (e) => {
    setPrompt(id, e.target.value)
  }

  const copyToClipboard = () => {
    if (node.response) {
      navigator.clipboard.writeText(node.response)
      toast.success('Response copied to clipboard')
    }
  }

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
          disabled={node.isLoading}
          className="w-full border hover:cursor-text focus:ring-0 focus:border-0 p-1.5 text-xs rounded-md"
        />
        {node.isLoading && <Spinner />}
        {!node.isLoading && node.response && (
          <div className="mt-2">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold tracking-tight">Response</h1>
              <button className="cursor-pointer p-1" onClick={copyToClipboard}>
                <Clipboard className="ml-2 cursor-pointer text-gray-500 hover:text-gray-700 h-3 w-3" />
              </button>
            </div>
            <p className="text-[10px] text-gray-500">{node.response}</p>
          </div>
        )}
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
