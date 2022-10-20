import { knexService } from '../db/index'
import { UploadedFile } from "express-fileupload"

interface DbQuery {
  [key: string]: any
}

export class PictureModel {
  async getPictures(dbQuery: DbQuery): Promise<string[]> {
    return await knexService('pictures').where(dbQuery).select('fileName')
      .then((pictures) => {
        return pictures.map(item => item.fileName)
      })
  }
  async savePictures(placeId: number, files: UploadedFile | UploadedFile[]): Promise<void> {
    if (files instanceof Array) {
      files.forEach(file => {
        knexService('pictures').insert({ placeId, fileName: file.name }).catch((err) => console.log(err))
      })
    } else {
      knexService('pictures').insert({ placeId, fileName: files.name }).catch((err) => console.log(err))
    }
  }
  async deletePictures(fileName: DbQuery): Promise<void> {
    await knexService('pictures').where(fileName).del()
  }
}