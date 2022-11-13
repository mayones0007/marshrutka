import { Request } from "express"
import { models } from "../models/index"
import { RoutePoint, Route } from "../models/route.model"
import { AppResponse } from "./response.model"
import { fileService } from "../services/file.service"
import { UploadedFile } from "express-fileupload"

export class RouteController {
  async getMyRoute(req: Request): Promise<AppResponse<RoutePoint[]>> {
    const userId = req.query.id
    const route = await models.route.getMyRoute({ userId })
    return {
      status: 200,
      body: route,
    }
  }
  async deleteRoutePoint(req: Request): Promise<AppResponse> {
    const routePoint = req.query
    await models.route.deleteRoutePoint(routePoint)
    return {
      status: 200,
      body: { message: 'Место удалено из маршрута' },
    }
  }
  async addRoutePoint(req: Request): Promise<AppResponse> {
    const routePoint = req.body
    await models.route.addRoutePoint(routePoint)
    return {
      status: 200,
      body: { message: 'Место добавлено в маршрут' },
    }
  }
  async getRouteByLink(req: Request): Promise<AppResponse | AppResponse<RoutePoint[]>> {
    const routePointsIds = (req.query.id as string).split('.')
    const route = await models.route.getRouteByLink(routePointsIds)
    if (route.length) {
      return {
        status: 200,
        body: route,
      }
    }
    return {
      status: 406,
      body: { message: 'Неверная ссылка' },
    }
  }
  async getRoute(req: Request): Promise<AppResponse | AppResponse<Route>> {
    const id = req.query.id
    const route = await models.route.getRoute({id})
    return {
      status: 200,
      body: route,
    }
  }
  async addRoute(req: Request): Promise<AppResponse> {
    const route = JSON.parse(req.body.route)
    if (req.files) {
      const file = req.files.picture as UploadedFile
      fileService.saveFiles('img', file)
      route.picture = file.name
    }
    await models.route.addRoute({ ...route, user: req.user.userId })
    return {
      status: 200,
      body: { message: 'Маршрут сохранен' },
    }
  }
  async getRoutes(req: Request): Promise<AppResponse<Route[]>> {
    const user = req.user ? req.user.userId : undefined
    const routes = await models.route.getRoutes(user)
    return {
      status: 200,
      body: routes,
    }
  }
}