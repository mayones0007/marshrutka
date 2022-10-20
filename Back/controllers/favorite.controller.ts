import { Request } from "express"
import { models } from "../models/index"
import { Favorite } from "../models/favorite.model"
import { AppResponse } from "./response.model"

export class FavoriteController {
  async getFavorites(req: Request): Promise<AppResponse<Favorite[]>> {
    const userId = req.query.id
    const favorites = await models.favorite.getFavorites({ userId })
    return {
      status: 200,
      body: favorites,
    }
  }
  async deleteFavorite(req: Request): Promise<AppResponse> {
    const favorite = req.query
    await models.favorite.deleteFavorite(favorite)
    return {
      status: 200,
      body: { message: 'Место удалено из избранного' },
    }
  }
  async addFavorite(req: Request): Promise<AppResponse> {
    const favorite = req.body
    await models.favorite.addFavorite(favorite)
    return {
      status: 200,
      body: { message: 'Место добавлено в избранное' },
    }
  }
}