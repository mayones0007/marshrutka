import { Request } from "express"
import { models } from "../models/index"
import { Review } from "../models/review.model"
import { AppResponse } from "./response.model"

export class ReviewController {
  async getReviews(req: Request): Promise<AppResponse<Review[]>> {
    const placeId = req.query.id
    const reviews = await models.review.getReviews({ placeId })
    return {
      status: 200,
      body: reviews, 
    }
  }
  async deleteReview(req: Request): Promise<AppResponse> {
    const id = req.query.id
    await models.review.deleteReview({ id })
    return {
      status: 200,
      body: { message: 'Комментирий удален' },
    }
  }
  async createReview(req: Request): Promise<AppResponse> {
    const NewReview = req.body
    await models.review.createReview( NewReview )
    return {
      status: 200,
      body: { message: 'Комментирий добавлен' },
    }
  }
}