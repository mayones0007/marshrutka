
import MyPlaces from "./components/MyPlaces.vue";
import Description from "./components/Description.vue";
import Registration from "./components/Registration.vue";
import MyRoute from "./components/MyRoute.vue";
import MyFavorites from "./components/MyFavorites.vue";
import Settings from "./components/Settings.vue";
import NewPlace from "./components/NewPlace.vue";
import { createRouter, createWebHistory } from "vue-router";

export const routeNames = {
  places: 'places',
  description: 'description',
  registration: 'registration',
  myRoute: 'myRoute',
  myFavorites: 'myFavorites',
  settings: 'settings',
  newPlace: 'newPlace',
}

const routes = [
  { path: '/', name: routeNames.places, component: MyPlaces, meta: {title: "Marshrutka - создай свой маршрут"}},
  { path: '/registration', name: routeNames.registration, component: Registration, meta: { title: "Marshrutka - создай свой маршрут" } },
  { path: '/myroute', name: routeNames.myRoute, component: MyRoute, meta: { title: "Marshrutka - создай свой маршрут" } },
  { path: '/myfavorites', name: routeNames.myFavorites, component: MyFavorites, meta: { title: "Marshrutka - создай свой маршрут" } },
  { path: '/settings', name: routeNames.settings, component: Settings, meta: { title: "Marshrutka - создай свой маршрут" } },
  { path: '/:id', name: routeNames.description, component: Description, meta: { title: "Marshrutka - создай свой маршрут" } },
  { path: '/newplace', name: routeNames.newPlace, component: NewPlace, meta: { title: "Marshrutka - создай свой маршрут" } },
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