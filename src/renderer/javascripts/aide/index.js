import React from 'react'

export default function Aide() {
    return <>
        <div className="h-full w-full p-10 bg-black text-white">
            <h1 className="text-4xl font-bold">
                Hello aide!
            </h1>
            Is windows: {window.AppAPI.platform()}
            <button onClick={() => window.AppAPI.maximizeWindow()}>Click here to maximize</button>
        </div>
    </>
}
