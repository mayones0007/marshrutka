import { Request } from "express"
import { models } from "../models/index"
import { Booking } from "../models/booking.model"
import { AppResponse } from "./response.model"

export class BookingController {
  async getBookings(req: Request): Promise<AppResponse<Booking[]>> {
    const favorites = await models.booking.getBookings({ userId: req.user.userId!, role: req.user.role })
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
  async getBooking(req: Request): Promise<AppResponse<Booking[]>> {
    const query = req.query
    const favorites = await models.booking.getBooking(query)
    return {
      status: 200,
      body: favorites,
    }
  }
  async deleteBooking(req: Request): Promise<AppResponse> {
    const query = req.query
    const favorites = await models.booking.deleteBooking(query)
    return {
      status: 200,
      body: { message: 'Бронирование отменено' },
    }
  }
}