import { UploadedFile } from "express-fileupload"
import fs from 'fs'

export const fileService = new class FileService {
  saveFiles(folder: string, files: UploadedFile | UploadedFile[]): void {
    const path = require('path')
    const directory = path.join(__dirname, '..') + '/public/' + folder + '/'
    if (files instanceof Array) {
      files.forEach(file => {
        file.mv(directory + file.name)
      })
    } else {
      files.mv(directory + files.name)
    }
  }
  deleteFiles(folder: string, fileName: string | string[]): void {
    const path = require('path')
    const directory = path.join(__dirname, '..') + '/public/' + folder + '/'
    if (fileName instanceof Array) {
      fileName.forEach(file => {
        fs.unlink(directory + file, (err) => { if (err) throw err })
      })
    } else {
      fs.unlink(directory + fileName, (err) => { if (err) throw err })
    }
  }
}