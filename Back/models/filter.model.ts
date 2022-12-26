import { knexService } from '../db/index'

export class FilterModel {

  async getFilters() {
    const city = await knexService('places').distinct('city').groupBy('city').count('city as count')
    const region = await knexService('places').distinct('region').groupBy('region').count('region as count')
    const way = await knexService('places').distinct('way').groupBy('way').count('way as count')
    const category = await knexService('places').distinct('category').groupBy('category').count('category as count')
    const type = await knexService('places').distinct('type').groupBy('type').count('type as count')
    const isAccepted = await knexService('places').distinct('isAccepted').groupBy('isAccepted').count('isAccepted as count')
    const price = await knexService('routes').distinct('price').groupBy('price').count('price as count')
    return { city, region, way, category, type, isAccepted, price }
  }
}