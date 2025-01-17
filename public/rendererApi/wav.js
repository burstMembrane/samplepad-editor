/* Electron imports */
const { remote } = require("electron")
const spawn = require('child_process').spawn

let wavSpawn = {}

module.exports = {

  playWavFile: (wavId, path) => {
    return new Promise((resolve) => {
      switch (remote.process.platform) {
        case 'darwin':
          wavSpawn[wavId] = spawn('afplay', [path])
          break
        // add aplay for linux non-blocking
        case 'linux':
          wavSpawn[wavId] = spawn('aplay', [path, '-N'])
          break
        case 'win32':
          wavSpawn[wavId] = spawn('powershell', [
            '-c',
            '(New-Object System.Media.SoundPlayer "' + path + '").PlaySync()'
          ])
          wavSpawn[wavId].stdin.end()
          break
        default:
          resolve()
          break
      }

      wavSpawn[wavId].on('close', () => {
        resolve()
      })
    })
  },
  stopWavFile: (wavId) => {
    if (wavSpawn[wavId]) {
      wavSpawn[wavId].removeAllListeners('close')
      if (wavSpawn[wavId]) {
        wavSpawn[wavId].kill()
      }
    }
  }
}