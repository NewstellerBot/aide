import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('messagesApi', {
  onMessage: (message, callback) => {
    ipcRenderer.on(message, callback)
  },
  onOnce: (message, callback) => {
    ipcRenderer.once(message, callback)
  },
)


export default {}
