import { UserController } from "./user.controller"
import { PlaceController } from "./place.controller"
import { PictureController } from "./picture.controller"
import { ReviewController } from "./review.controller"
import { FavoriteController } from "./favorite.controller"
import { RouteController } from "./route.controller"
import { BookingController } from "./booking.controller"
import { FilterController } from "./filter.controller"

export const controllers = {
  user: new UserController,
  place: new PlaceController,
  picture: new PictureController,
  review: new ReviewController,
  favorite: new FavoriteController,
  route: new RouteController,
  booking: new BookingController,
  filter: new FilterController
}