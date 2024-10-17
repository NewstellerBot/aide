import { app, ipcMain } from 'electron';
import path from 'path'

import Window from '../window'
import { isWindows } from './helpers'
import { EVENTS } from '../events'

export default class Aide {
    constructor(settings = {}) {
        this.app = app
        this.settings = settings
        this.instanceLock = app.requestSingleInstanceLock()

        if (!this.instanceLock) {
            app.quit()
        } else {
            app.on('second-instance', () => {
                return this.showMainWindow()
            })
            app.on('ready', () => {
                this.init()
                if (this.onReady !== undefined) this.onReady()
            })

            app.on('activate', () => {
                return this.showMainWindow()
            })

            app.on('before-quit', () => {
                return (this.window.forceClose = true)
            })
        }
    }

    init() {
        this.window = new Window({
            titleBarStyle: 'hiddenInset',
            name: this.settings.name,
            width: this.settings.width,
            height: this.settings.height,
            devTools: this.settings.devTools,
            frame: !isWindows(),
            transparent: false,
            webPreferences: {
                worldSafeExecuteJavaScript: true,
                sandbox: false,
                contextIsolation: true,
                preload: path.join(app.getAppPath(), 'preload', 'index.js')
            },
            show: true,
            onWindowReady: () => this.onWindowReady()
        })
    }

    showMainWindow() {
        return this.window.show()
    }

    subscribe() {
        Object.keys(EVENTS).forEach(event => {
            ipcMain.on(event, (e, data) => EVENTS[event].call(this, e, data))
        })
    }

    onWindowReady() {
        this.window.window.removeMenu()
        this.window.disableNavigation()
        // this.setupWindowEvents()
        this.subscribe()
        this.window.send('onload', this.i18n)
    }

    setupWindowEvents() {
        this.window.on('close', () => {
            this.closed = true
            this.showAuth()
        })
        this.window.on('show', () => (this.closed = false))
        this.window.on('blur', () => {
            if (this.closed) return
            this.inactiveTimeout = setTimeout(() => {
                if (this.cryptor) this.showAuth()
            }, INACTIVE_TIMEOUT)
        })
        this.window.on('focus', () => clearTimeout(this.inactiveTimeout))
    }

}

