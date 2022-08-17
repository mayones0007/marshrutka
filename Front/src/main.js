import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { store } from './store'
import YmapPlugin from 'vue-yandex-maps'
import { jwt } from 'jsonwebtoken'

export const settings = {
  apiKey: '378194c2-3ccf-497c-8950-da741a79edd2',
  lang: 'ru_RU',
  coordorder: 'latlong',
  enterprise: false,
  version: '2.1'
}

createApp(App).use(router).use(store).use(YmapPlugin, settings).use(jwt).mount('#app')