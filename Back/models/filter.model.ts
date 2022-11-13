import { knexService } from '../db/index'

export class FilterModel {

  async getFilters() {
    const cities = await knexService('places').distinct('city').groupBy('city').count('city as count')
    const regions = await knexService('places').distinct('region').groupBy('region').count('region as count')
    const ways = await knexService('places').distinct('way').groupBy('way').count('way as count')
    const categories = await knexService('places').distinct('category').groupBy('category').count('category as count')
    const types = await knexService('places').distinct('type').groupBy('type').count('type as count')
    return {cities, regions, ways, categories, types}
  }
}