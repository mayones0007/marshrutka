import { knexService } from '../db/index'

export interface NewBooking {
  userId: number,
  date: string,
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
  async getBookings(guideId: number): Promise<Booking[]> {
    const timeElapsed = Date.now()
    const today = new Date(timeElapsed)
    return await knexService('bookings').where({ guideId }).orWhere({ guideId: null }).andWhere('date', '>', today.toISOString()).leftJoin('users', 'bookings.userId', 'users.id').select('bookings.*', 'users.name as userName').orderBy('date')
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
}