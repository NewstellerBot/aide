const path = require('path')
const { Application } = require('spectron')

const appPath = () => {
  switch (process.platform) {
    case 'darwin':
      return path.join(__dirname, '..', '.tmp', 'mac', 'Aide.app', 'Contents', 'MacOS', 'Aide')
    case 'linux':
      return path.join(__dirname, '..', '.tmp', 'linux', 'Aide')
    case 'win32':
      return path.join(__dirname, '..', '.tmp', 'win-unpacked', 'Aide.exe')
    default:
      throw Error(`Unsupported platform ${process.platform}`)
  }
}
global.app = new Application({ path: appPath() })
