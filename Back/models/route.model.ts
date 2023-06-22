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
  picture: string,
  category: string,
  region: string,
  way: string,
  time: number,
  persons: number,
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
    delete newRoute.avatar
    delete newRoute.userName
    await knexService('routes').where(newRoute).first()
      .then(async (route) => {
        if (!route) {
          await knexService('routes').insert(newRoute)
        }
      })
  }
  async editRoute(newRoute: DbQuery): Promise<void> {
    await knexService('routes').where({ id: newRoute.id }).del()
    delete newRoute.avatar
    delete newRoute.userName
    await knexService('routes').insert(newRoute)
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
  async getRoutes(filters?: DbQuery, pagination?: DbQuery, role?: string): Promise<Route[]> {
    return await knexService('routes')
      .orderBy('hits', 'desc')
      .modify(function (query) {
        if (filters) {
          query.where(filters)
        }
        if (role === 'user') {
          query.where('isAccepted', 1)
        }
        if (pagination) {
          query.limit(pagination.limit)
          query.offset(pagination.offset)
        }
      })
      .then((routes) => {
        return routes
      })
  }

  async getRoute(id: DbQuery): Promise<Route> {
    await knexService('routes').where(id).increment('hits')
    return await knexService('routes')
    .where(id)
    .first()
    .then(async(route) => {
      if (route) {
        const user = await knexService('users').where({ id: route.user }).select('name as userName', 'avatar').first()
        return { ...route, ...user }
      }
    })
  }
  async deleteRoute(id: string): Promise<void> {
    const promises = []
    promises.push(knexService('routes').where({ id }).del())
    promises.push(knexService('favorites').where({ placeId: id }).del())
    Promise.all(promises)
  }
}