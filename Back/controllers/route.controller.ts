import { Request } from "express"
import { models } from "../models/index"
import { RoutePoint } from "../models/route.model"
import { AppResponse } from "./response.model"

export class RouteController {
  async getRoute(req: Request): Promise<AppResponse<RoutePoint[]>> {
    const userId = req.query.id
    const route = await models.route.getRoute({ userId })
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
}