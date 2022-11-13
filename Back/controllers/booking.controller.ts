import { Request } from "express"
import { models } from "../models/index"
import { Booking } from "../models/booking.model"
import { AppResponse } from "./response.model"

export class BookingController {
  async getBookings(req: Request): Promise<AppResponse<Booking[]>> {
    const guideId = req.user.userId as number
    const favorites = await models.booking.getBookings(guideId)
    return {
      status: 200,
      body: favorites,
    }
  }
  async createBooking(req: Request): Promise<AppResponse> {
    await models.booking.createBooking({ ...req.body, userId: req.user.userId })
    return {
      status: 200,
      body: { message: 'Бронирование добавлено' },
    }
  }
  async setBooking(req: Request): Promise<AppResponse> {
    await models.booking.setBooking({ ...req.body, guideId: req.user.userId })
    return {
      status: 200,
      body: { message: 'Бронирование обновлено' },
    }
  }
}