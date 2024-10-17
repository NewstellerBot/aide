require('application.css')

import React from 'react'
import ReactDOM from 'react-dom/client'

import Aide from './aide'

let root;
window.onload = () => {
    root = ReactDOM.createRoot(document.getElementById("root"))
    renderApplication()
}

const renderApplication = () => {
    document.querySelector('body').setAttribute('platform', window.AppAPI.platform())

    root.render(
        <Aide />
    )
}

window.refreshApplication = () => renderApplication()


window.MessagesAPI.onMessage('onload', () => {
    renderApplication()
})

