import { knexService } from '../db/index'
import { numWord } from '../services/numerals.service'
export interface NewBooking {
  userId: number,
  bookDate: string,
  ref: string,
  persons: number,
  phone: string,
  routeId: number,
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
  async createBooking(NewBooking: NewBooking): Promise<void | string> {
    return await knexService('bookings').where(NewBooking).first()
    .then(async(booking) => {
      if (!booking) {
        const route = await knexService('routes').where({ id: NewBooking.routeId }).first()
        const bookings = await this.getBooking({ ref: NewBooking.ref, bookDate: NewBooking.bookDate })
        const availablePersonCount = route.persons - bookings.reduce((acc, el) => acc + el.persons, 0)
        if (availablePersonCount - NewBooking.persons >= 0) {
          await knexService('bookings').insert(NewBooking)
        } else {
          return availablePersonCount ? `Доступно ${numWord(availablePersonCount, ['место', 'места', 'мест'])}` : 'Места закончились'
        }
      } else {
        return 'Вы уже забронировали'
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
    return await knexService('bookings').where(query).andWhereNot({ guideId: null }).leftJoin('users', 'users.id', 'bookings.userId').select('bookings.*', 'users.avatar', 'users.name')
      .then((bookings) => {
        return bookings
      })
  }
  async deleteBooking(id: DbQuery): Promise<void> {
    await knexService('bookings').where(id).del()
  }
}