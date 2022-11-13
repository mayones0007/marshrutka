import { Request } from "express"
import { models } from "../models/index"
import { Favorite } from "../models/favorite.model"
import { AppResponse } from "./response.model"

export class FavoriteController {
  async getFavorites(req: Request): Promise<AppResponse<Favorite[]>> {
    const userId = req.user.userId
    const favorites = await models.favorite.getFavorites({ userId })
    return {
      status: 200,
      body: favorites,
    }
  }
  async getFavoriteRoutes(req: Request): Promise<AppResponse<Favorite[]>> {
    const userId = req.user.userId
    const favorites = await models.favorite.getFavoriteRoutes({ userId })
    return {
      status: 200,
      body: favorites,
    }
  }

  async deleteFavorite(req: Request): Promise<AppResponse> {
    await models.favorite.deleteFavorite({ ...req.query, userId: req.user.userId })
    return {
      status: 200,
      body: { message: 'Удалено из избранного' },
    }
  }
  async addFavorite(req: Request): Promise<AppResponse> {
    await models.favorite.addFavorite({ ...req.body, userId: req.user.userId })
    return {
      status: 200,
      body: { message: 'Добавлено в избранное' },
    }
  }
}