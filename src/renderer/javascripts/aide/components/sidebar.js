import React from 'react'

export default function Sidebar() {
  return (
    <div
      id="sidebar"
      className="sidebar h-full px-5 pt-10 flex flex-col w-40 border-r-2 border-gray-200"
    >
      <div className="flex gap-2 items-center">
        <img src="images/logo.svg" alt="logo" className="w-5 h-5" />
        <span className="font-bold">aide</span>
      </div>
    </div>
  )
}
