import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('messagesApi', {
  onMessage: (message, callback) => {
    ipcRenderer.on(message, callback)
  },
  onOnce: (message, callback) => {
    ipcRenderer.once(message, callback)
  },

  sendExecute: (nodes, edges) => {
    ipcRenderer.send('llm:execute', { nodes, edges })
  },
})

export default {}
