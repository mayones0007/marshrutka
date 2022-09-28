import MyPlaces from "./components/MyPlaces.vue";
import Description from "./components/Description.vue";
import Registration from "./components/Registration.vue";
import MyRoute from "./components/MyRoute.vue";
import MyFavorites from "./components/MyFavorites.vue";
import Settings from "./components/Settings.vue";
import Admin from "./components/Admin.vue";
import { createRouter, createWebHistory } from "vue-router";
const routes = [
  { path: '/', name: "MyPlaces", component: MyPlaces },
  { path: '/:eng', name: "Description", component: Description },
  { path: '/registration', name: "Registration", component: Registration },
  { path: '/myroute', name: "MyRoute", component: MyRoute },
  { path: '/myfavorites', name: "MyFavorites", component: MyFavorites },
  { path: '/settings', name: "Settings", component: Settings },
  { path: '/admin', name: "Admin", component: Admin },
]
export const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach(() => {
  window.scroll(0,0)
})