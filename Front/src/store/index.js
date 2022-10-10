import { createStore } from 'vuex';
import { userModule } from './userModule';
import { placesModule } from './placesModule';
import { appModule } from './appModule'

export const store = createStore({
  modules: {
    userModule,
    placesModule,
    appModule,
  }
})