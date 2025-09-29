import { ipcMain } from 'electron'
import * as sqlite from '../db/sqlite'

export function initIpcMain() {
  ipcMain.on('SYSTEM::PING', () => console.log('pong'))

  Object.keys(sqlite).forEach((key) => {
    const func = sqlite[key]
    ipcMain.handle(`SQLITE::${key}`, (_, ...args) => {
      return func(...args)
    })
  })
}
