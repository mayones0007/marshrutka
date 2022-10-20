import { knexService } from '../db/index'

export interface NewReview {
  placeId: number,
  userId: number,
  text: string,
  raiting: number,
  createdAt: Date,
}

export interface Review extends NewReview{
  id: number,
}

interface DbQuery {
  [key: string]: any
}

export class ReviewModel {
  async getReviews(dbQuery: DbQuery): Promise<Review[]> {
    return await knexService('reviews').where(dbQuery).join('users', 'reviews.userId', '=', 'users.id').select('users.name', 'reviews.id', 'reviews.text', 'reviews.createdAt', 'users.avatar', 'reviews.raiting')
      .then((reviews) => {
        return reviews
      })
  }
  async deleteReview(dbQuery: DbQuery): Promise<void> {
    await knexService('reviews').where(dbQuery).del()
  }
  async createReview(NewReview: NewReview): Promise<void> {
    await knexService('reviews').insert(NewReview)
  }
}