import { knexService } from '../db/index'

export interface RoutePoint {
  id: number,
  name: string,
  category: string,
  region: string,
  city: string,
  difficulty: string,
  availability: string,
  time: number,
  description: string,
  coords: string,
  isAccepted: number,
}

export interface Route {
  id: number,
  name: string,
  description: string,
  userId: number,
  price: number,
  views: number,
  ref: string,
}

interface DbQuery {
  [key: string]: any
}

export class RouteModel {
  async getMyRoute(userId: DbQuery): Promise<RoutePoint[]> {
    return await knexService('route')
      .join('places', 'route.placeId', '=', 'places.id')
      .where(userId)
      .leftJoin('pictures', 'places.id', 'pictures.placeId')
      .select('places.*', 'pictures.fileName as picture')
      .groupBy('places.id')
      .then((route) => {
        return route
      })
  }
  async addRoutePoint(dbQuery: DbQuery): Promise<void> {
    await knexService('route').insert(dbQuery)
  }
  async addRoute(newRoute: DbQuery): Promise<void> {
    await knexService('route').where({userId: newRoute.user}).del()
    await knexService('routes').where(newRoute).first()
      .then(async (route) => {
        if (!route) {
          await knexService('routes').insert(newRoute)
        }
      })
  }
  async deleteRoutePoint(dbQuery: DbQuery): Promise<void> {
    await knexService('route').where(dbQuery).del()
  }
  async getRouteByLink(routePointsIds : string[]): Promise<RoutePoint[]> {
    return await knexService('places')
    .whereIn('places.id', routePointsIds)
    .leftJoin('pictures', 'places.id', 'pictures.placeId')
    .select('places.*', 'pictures.fileName as picture')
    .groupBy('places.id')
    .then((route) => {
      return route
    })
  }
  async getRoutes(user: number | undefined): Promise<Route[]> {
    return await knexService('routes')
      .modify(function (query) {
        if (user) {
          query.where({ user })
        }
      })
      .orderBy('hits', 'desc')
      .then((routes) => {
        return routes
      })
  }
  async getRoute(id: DbQuery): Promise<Route> {
    await knexService('routes').where(id).increment('hits')
    return await knexService('routes').where(id).first()
      .then((route) => {
        return route
      })
  }
}