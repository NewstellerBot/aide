import React from 'react'
import { useShallow } from 'zustand/react/shallow'
import { Plus, Play } from 'lucide-react'

import Button from './ui/button'
import { useNodeStore } from '../store/nodeStore'

export default function Sidebar() {
  const addNode = useNodeStore((state) => state.addNode)
  const setResponse = useNodeStore((state) => state.setResponse)
  const startLoadingAll = useNodeStore((state) => state.startLoadingAll)
  const stopLoading = useNodeStore((state) => state.stopLoading)

  const { nodes, edges } = useNodeStore(
    useShallow((state) => ({ nodes: state.nodes, edges: state.edges }))
  )

  return (
    <div
      id="sidebar"
      className="sidebar relative h-full pt-10 flex px-5 flex-col w-52 border-r-2 border-gray-200"
    >
      <div className="flex gap-2 items-center w-full mb-5">
        <img src="images/logo.svg" alt="logo" className="w-5 h-5" />
        <span className="font-bold">aide</span>
      </div>
      <div className="flex flex-col gap-3">
        <Button
          className="flex text-xs items-center justify-center gap-1"
          onClick={() => {
            startLoadingAll()
            window.messagesApi.sendExecute(nodes, edges)
            window.messagesApi.onMessage('llm:response', (_, data) => {
              const { nodeId, response } = data
              stopLoading(nodeId)
              setResponse(nodeId, response)
            })
          }}
        >
          Run Chain <Play className="h-3 w-3" />
        </Button>

        <Button
          variant="secondary"
          className="flex text-xs items-center justify-center gap-1"
          onClick={addNode}
        >
          Add Node <Plus className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          className="flex text-xs items-center justify-center gap-1"
          onClick={() => console.log(nodes)}
        >
          Log
        </Button>

        <div className="w-full h-[1px] bg-gray-300 rounded-full" />
      </div>
    </div>
  )
}
