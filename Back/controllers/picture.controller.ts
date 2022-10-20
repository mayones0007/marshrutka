import { Request } from "express"
import { models } from "../models/index"
import { AppResponse } from "./response.model"
import { fileService } from "../services/file.service"

export class PictureController {
  async getPictures(req: Request): Promise<AppResponse<string[]>> {
    const placeId = req.query.id
    const pictures = await models.picture.getPictures({ placeId })
    return {
      status: 200,
      body: pictures
    }
  }
  async savePictures(req: Request): Promise<AppResponse> {
    if (req.files) {
      const placeId = req.body.id
      const files = req.files.images
      fileService.saveFiles('img', files)
      models.picture.savePictures(placeId, files)
      return {
        status: 200,
        body: { message: 'Картинки добавлены' },
      }
    } else {
      return {
        status: 400,
        body: { message: 'Ошибка при передаче файлов' },
      }
    }
  }
  async deletePictures(req: Request): Promise<AppResponse> {
    if (req.query.fileName) {
    const fileName = req.query.fileName as string
    models.picture.deletePictures({ fileName })
    fileService.deleteFiles('img', fileName)
    return {
      status: 200,
      body: { message: 'Картинка удалена' },
    }
    } else {
      return {
        status: 400,
        body: { message: 'Ошибка при удалении файлов' },
      }
    }
  }
}