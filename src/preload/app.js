import { contextBridge, ipcRenderer, shell } from 'electron'
import { isWindows, platform } from '../main/application/helpers'

contextBridge.exposeInMainWorld('AppAPI', {
    isWindows: () => {
        return isWindows()
    },

    platform: () => {
        return platform()
    },

    minimizeWindow: () => {
        ipcRenderer.send('window:message', { message: 'minimize' })
    },

    maximizeWindow: () => {
        ipcRenderer.send('window:message', { message: 'maximize' })
    },

    unmaximizeWindow: () => {
        ipcRenderer.send('window:message', { message: 'unmaximize' })
    },

    closeWindow: () => {
        ipcRenderer.send('window:message', { message: 'close' })
    },

    openLink: url => {
        shell.openExternal(url)
    }
})
