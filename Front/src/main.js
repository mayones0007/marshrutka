import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { store } from './store/index'
import YmapPlugin from 'vue-yandex-maps'
import vueClickOutsideElement from 'vue-click-outside-element'
import './interceptor'

export const settings = {
  apiKey: '378194c2-3ccf-497c-8950-da741a79edd2',
  lang: 'ru_RU',
  coordorder: 'latlong',
  enterprise: false,
  version: '2.1'
}

const app = createApp(App).use(router).use(store).use(YmapPlugin, settings).use(vueClickOutsideElement)
app.config.globalProperties.$baseUrl = process.env.VUE_APP_BASE_URL

app.mount('#app')