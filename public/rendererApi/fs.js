/* Electron imports */
const fs = require('fs')
const path = require('path')

module.exports = {
  exists: (file) => {
    return fs.existsSync(file)
  },
  isDirectory: (file) => {
    let stats = fs.statSync(file)
    return stats.isDirectory()
  },
  mkdir: (file) => {
    return fs.mkdirSync(file)
  },
  renameFile: (source, destination) => {
    return fs.renameSync(source, destination)
  },
  readFileAsString: (file) => {
    return fs.readFileSync(file, "utf8")
  },
  readFileAsWavSurferBlob: (file) => {
    const buffer = fs.readFileSync(file);
    console.log(buffer)
    const blob = new window.Blob([new Uint8Array(buffer)]);
    return blob;
  },
  readFileAsArrayByLine: (file) => {
    return fs.readFileSync(file, "utf8").split("\n");
  },
  readFileBufferArray: (file) => {
    return fs.readFileSync(file)
  },
  writeFile: (file, content) => {
    return fs.writeFileSync(file, content)
  },
  getFileListFromDirectory: (dirPath) => {
    return fs.readdirSync(dirPath)
      .map((dirFile) => {
        return dirPath + "/" + dirFile
      })
  },
  getSampleFiles: (sampleDirectoryPath) => {
    return fs.readdirSync(sampleDirectoryPath, { withFileTypes: true })
      .filter((dirent) => {
        return dirent.isFile()
          && path.extname(dirent.name).toUpperCase() === ".WAV"
          && !(/(^|\/)\.[^/.]/g).test(dirent.name)
      })
  },
  getKitFiles: (kitPath) => {
    return fs.readdirSync(kitPath, { withFileTypes: true })
      .filter((dirent) => {
        return dirent.isFile()
          && path.extname(dirent.name).toUpperCase() === ".KIT"
          && !(/(^|\/)\.[^/.]/g).test(dirent.name)
      })
  },

  deleteFile: (filePath) => {
    try {
      fs.unlinkSync(filePath)
      console.log("Deleted file", filePath)
      return true
    } catch (error) {
      console.log("Error deleting file", filePath, error)
      return false
    }

  }
}