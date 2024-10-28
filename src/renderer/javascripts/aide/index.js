import React from 'react'

import Sidebar from './components/sidebar'
import Flow from './components/flow'

export default function Aide() {
  return (
    <>
      <div className="h-full flex w-full font-normal">
        <Sidebar />
        <div className="h-full w-full" id="flow">
          <Flow />
        </div>
      </div>
    </>
  )
}
