import { models } from "../models/index"
import { Request } from "express"
import { AppResponse } from "./response.model"

export class FilterController {
  async getFilters(req: Request): Promise<AppResponse<any>> {
    const query = req.query
    const filters = await models.filter.getFilters()
    return {
      status: 200,
      body: filters
    }
  }
}