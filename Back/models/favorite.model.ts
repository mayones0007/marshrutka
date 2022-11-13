import { knexService } from '../db/index'

export interface Favorite {
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

export class FavoriteModel {
  async getFavorites(dbQuery: DbQuery): Promise<Favorite[]> {
    return await knexService('favorites').where(dbQuery)
      .join('places', 'favorites.placeId', '=', 'places.id')
      .leftJoin('pictures', 'places.id', 'pictures.placeId')
      .select('places.*', 'pictures.fileName as picture')
      .groupBy('places.id')
      .then((favorites) => {
        return favorites
      })
  }
  async getFavoriteRoutes(dbQuery: DbQuery): Promise<Favorite[]> {
    return await knexService('favorites').where(dbQuery)
      .join('routes', 'favorites.routeId', '=', 'routes.id')
      .then((favorites) => {
        return favorites
      })
  }
  async addFavorite(dbQuery: DbQuery): Promise<void> {
    await knexService('favorites').insert(dbQuery)
  }
  async deleteFavorite(dbQuery: DbQuery): Promise<void> {
    await knexService('favorites').where(dbQuery).del()
  }
}