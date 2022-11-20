import { UploadedFile } from "express-fileupload"
import fs from 'fs'
const sharp = require('sharp')

export const fileService = new class FileService {
  saveFiles(folder: string, files: UploadedFile | UploadedFile[]): void {
    const path = require('path')
    const directory = path.join(__dirname, '..') + '/public/' + folder + '/'
    if (!(files instanceof Array)) {
      files = [files]
    }
    files.forEach(async file => {
      await file.mv(directory + file.name)
      if (folder === 'img') {
        await sharp(directory + file.name).resize({ height: 400 })
          .toFile(path.join(__dirname, '..') + '/public/min/' + file.name)
      }
    })
  }
  deleteFiles(folder: string, fileName: string | string[]): void {
    const path = require('path')
    const directory = path.join(__dirname, '..') + '/public/' + folder + '/'
    if (!(fileName instanceof Array)) {
      fileName = [fileName]
    }
    fileName.forEach(file => {
      fs.unlink(directory + file, (err) => { if (err) console.log(err) })
      if (folder === 'img') {
        fs.unlink(path.join(__dirname, '..') + '/public/min/' + file, (err) => { if (err) console.log(err) })
      }
    })
  }
}