import { UserModel } from "./user.model"
import { PlaceModel } from "./place.model"
import { PictureModel } from "./picture.model"
import { ReviewModel } from "./review.model"
import { FavoriteModel } from "./favorite.model"
import { RouteModel } from "./route.model"
import { BookingModel } from "./booking.model"
import { FilterModel } from "./filter.model"

export const models = {
  user: new UserModel,
  place: new PlaceModel,
  picture: new PictureModel,
  review: new ReviewModel,
  favorite: new FavoriteModel,
  route: new RouteModel,
  booking: new BookingModel,
  filter: new FilterModel
}