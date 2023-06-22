import { knexService } from '../db/index'

export interface NewBooking {
  userId: number,
  bookDate: string,
  ref: string,
  persons: number,
  phone: string,
}

export interface Booking extends NewBooking {
  id: number,
  guideId: number,
}

interface DbQuery {
  [key: string]: any
}

export class BookingModel {
  async getBookings({ userId, role }: { userId: number, role: string }): Promise<Booking[]> {
    const timeElapsed = Date.now()
    const today = new Date(timeElapsed)
    return await knexService('bookings')
    .modify(function (query) {
      if (role !== 'user') {
        query.where({ guideId: userId }).orWhere({ guideId: null })
        .andWhere('bookDate', '>', today.toISOString())
        .leftJoin('users', 'bookings.userId', 'users.id')
      } else {
        query.where({ userId })
        .leftJoin('users', 'bookings.guideId', 'users.id')
      }
    })
    .leftJoin('routes', 'routes.id', 'bookings.routeId')
    .select('routes.*', 'bookings.*', 'routes.id as routeId', 'users.name as userName', 'users.phone as userPhone')
    .orderBy('bookDate')
      .then((bookings) => {
        return bookings
      })
  }
  async createBooking(NewBooking: NewBooking): Promise<void> {
    await knexService('bookings').where(NewBooking).first()
    .then(async(booking) => {
      if (!booking) {
        await knexService('bookings').insert(NewBooking)
      }
    })
  }
  async setBooking(Booking: Booking): Promise<void> {
    await knexService('bookings').where({ id: Booking.id }).first()
      .then(async (booking) => {
        if (booking.guideId === Booking.guideId) {
          await knexService('bookings').where({ id: Booking.id }).update({ guideId: null }).catch((err) => console.log(err))
        }
        if (!booking.guideId) {
          await knexService('bookings').where({ id: Booking.id }).update({ guideId: Booking.guideId }).catch((err) => console.log(err))
        }
      })
  }
  async getBooking(query: DbQuery): Promise<Booking[]> {
    return await knexService('bookings').where(query).leftJoin('users', 'users.id', 'bookings.userId').select('bookings.*', 'users.avatar', 'users.name')
      .then((bookings) => {
        return bookings
      })
  }
  async deleteBooking(id: DbQuery): Promise<void> {
    await knexService('bookings').where(id).del()
  }
}