import { Request } from "express"
import { models } from "../models/index"
import { Place } from "../models/place.model"
import { AppResponse } from "./response.model"
import { fileService } from "../services/file.service"

export class PlaceController {
  async getPlaces(req: Request): Promise<AppResponse<Place[]>> {
    const role = req.user.role
    const query = req.query
    const places = await models.place.getPlaces(role, query)
    return {
      status: 200,
      body: places
    }
  }
  async getPlace(req: Request): Promise<AppResponse<Place>> {
    const id = req.query.id
    const place = await models.place.getPlace({ id })
    return {
      status: 200,
      body: place,
    }
  }
  async addPlace(req: Request): Promise<AppResponse> {
    if (req.files) {
      const place = JSON.parse(req.body.place)
      const files = req.files.images
      const placeId = await models.place.addPlace(place)
      fileService.saveFiles('img', files)
      models.picture.savePictures(placeId, files)
      return {
        status: 200,
        body: { message: 'Место добавлено' },
      }
    } else {
      return {
        status: 400,
        body: { message: 'Ошибка при передаче файлов' },
      }
    }
  }
  async editPlace(req: Request): Promise<AppResponse> {
    const place = JSON.parse(req.body.place)
    await models.place.editPlace(place)
    if (req.files) {
      const files = req.files.images
      fileService.saveFiles('img', files)
      models.picture.savePictures(place.id, files)
    }
    return {
      status: 200,
      body: { message: 'Место обновлено' },
    }
  }
  async deletePlace(req: Request): Promise<AppResponse> {
    const id = req.query.id as string
    const pictures = await models.picture.getPictures({ placeId: id })
    fileService.deleteFiles('img', pictures)
    await models.place.deletePlace(id)
    return {
      status: 200,
      body: { message: 'Место удалено' },
    }
  }
}