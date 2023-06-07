import { knexService } from '../db/index'

interface DbQuery {
  [key: string]: any
}

export class FilterModel {
  async getFilters(filters?: DbQuery) {
    const city = await knexService('places').where('isAccepted', 1).distinct('city').groupBy('city').count('city as count')
    const region = await knexService('places').where('isAccepted', 1).distinct('region').groupBy('region').count('region as count')
    const way = await knexService('places').where('isAccepted', 1).modify(function (query) {
      if (filters) {
        query.where(filters)
      }
    }).distinct('way').groupBy('way').count('way as count')
    const category = await knexService('places').where('isAccepted', 1).modify(function (query) {
      if (filters) {
        query.where(filters)
      }
    }).distinct('category').groupBy('category').count('category as count')
    const type = await knexService('places').where('isAccepted', 1).modify(function (query) {
      if (filters) {
        query.where(filters)
      }
    }).distinct('type').groupBy('type').count('type as count')
    const isAccepted = await knexService('places').where('isAccepted', 1).modify(function (query) {
      if (filters) {
        query.where(filters)
      }
    }).distinct('isAccepted').groupBy('isAccepted').count('isAccepted as count')
    const price = await knexService('routes').where('isAccepted', 1).modify(function (query) {
      if (filters) {
        query.where(filters)
      }
    }).distinct('price').groupBy('price').count('price as count')
    const timeElapsed = Date.now()
    const today = new Date(timeElapsed)
    const date = await knexService('routes').where('isAccepted', 1).andWhere('date', '>', today.toISOString()).modify(function (query) {
      if (filters) {
        query.where(filters)
      }
    }).distinct('date').groupBy('date').count('date as count')

    return { city, region, way, category, type, isAccepted, price, date }
  }
}