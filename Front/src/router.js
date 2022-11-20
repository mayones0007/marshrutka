
import MyPlaces from "./components/MyPlaces.vue";
import Place from "./components/Place.vue";
import Registration from "./components/Registration.vue";
import MyRoute from "./components/MyRoute.vue";
import MyFavorites from "./components/MyFavorites.vue";
import Settings from "./components/Settings.vue";
import NewPlace from "./components/NewPlace.vue";
import Booking from "./components/Booking.vue";
import Route from "./components/Route.vue";
import { createRouter, createWebHistory } from "vue-router";

export const routeNames = {
  places: 'places',
  place: 'place',
  registration: 'registration',
  myRoute: 'myRoute',
  myFavorites: 'myFavorites',
  settings: 'settings',
  newPlace: 'newPlace',
  booking: 'Booking',
  route: 'route'
}

const routes = [
  { path: '/', name: routeNames.places, component: MyPlaces, meta: {title: "Marshrutka - создай свой маршрут"}},
  { path: '/registration', name: routeNames.registration, component: Registration, meta: { title: "Marshrutka - создай свой маршрут" } },
  { path: '/myroute', name: routeNames.myRoute, component: MyRoute, meta: { title: "Marshrutka - создай свой маршрут" } },
  { path: '/booking', name: routeNames.booking, component: Booking, meta: { title: "Marshrutka - создай свой маршрут" } },
  { path: '/myfavorites', name: routeNames.myFavorites, component: MyFavorites, meta: { title: "Marshrutka - создай свой маршрут" } },
  { path: '/settings', name: routeNames.settings, component: Settings, meta: { title: "Marshrutka - создай свой маршрут" } },
  { path: '/:id', name: routeNames.place, component: Place, meta: { title: "Marshrutka - создай свой маршрут" } },
  { path: '/newplace', name: routeNames.newPlace, component: NewPlace, meta: { title: "Marshrutka - создай свой маршрут" } },
  { path: '/route:id', name: routeNames.route, component: Route, meta: { title: "Marshrutka - создай свой маршрут" } },
]
export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) =>{
  window.scroll(0, 0)
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next()
})