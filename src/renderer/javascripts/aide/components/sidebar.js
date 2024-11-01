import React from 'react'

import { useNodeStore } from '../store/nodeStore'
import { useShallow } from 'zustand/react/shallow'

export default function Sidebar() {
  const state = useNodeStore(
    useShallow((state) => ({ nodes: state.nodes, edges: state.edges }))
  )
  return (
    <div
      id="sidebar"
      className="sidebar relative h-full px-5 pt-10 flex flex-col w-40 border-r-2 border-gray-200"
    >
      <div className="flex gap-2 items-center">
        <img src="images/logo.svg" alt="logo" className="w-5 h-5" />
        <span className="font-bold">aide</span>
      </div>

      <button
        className="absolute border px-3 py-1 top-5 left-5"
        onClick={() => {
          console.log('sending execute', state.nodes, state.edges)
          window.messagesApi.sendExecute()
        }}
      >
        Log
      </button>
    </div>
  )
}
