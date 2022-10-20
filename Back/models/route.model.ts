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

interface DbQuery {
  [key: string]: any
}

export class RouteModel {
  async getRoute(dbQuery: DbQuery): Promise<RoutePoint[]> {
    return await knexService('routes')
      .join('places', 'routes.placeId', '=', 'places.id')
      .where(dbQuery)
      .leftJoin('pictures', 'places.id', 'pictures.placeId')
      .select('places.*', 'pictures.fileName as picture')
      .groupBy('places.id')
      .then((route) => {
        return route
      })
  }
  async addRoutePoint(dbQuery: DbQuery): Promise<void> {
    await knexService('routes').insert(dbQuery)
  }
  async deleteRoutePoint(dbQuery: DbQuery): Promise<void> {
    await knexService('routes').where(dbQuery).del()
  }
}