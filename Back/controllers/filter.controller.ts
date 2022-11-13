import { models } from "../models/index"
import { AppResponse } from "./response.model"

export class FilterController {
  async getFilters(): Promise<AppResponse<any>> {
    const filters = await models.filter.getFilters()
    return {
      status: 200,
      body: filters
    }
  }
}