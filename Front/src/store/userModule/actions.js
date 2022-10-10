import { axiosInstance } from '../../httpClient'
import { router, routeNames } from '../../router'

export const actions = {
  async getUser({commit, dispatch}) {
    try {
      const response = await axiosInstance.get('user')
      commit('setUser', response.data.user)
      dispatch('getFavorites')
      dispatch('getRoute')
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async login({ commit, dispatch }, inputs) {
    try {
      const response = await axiosInstance.post('login', inputs)
      localStorage.setItem('userData', JSON.stringify({ token: response.data.token, refreshToken: response.data.refreshToken }))
      commit('setUser', response.data.user)
      dispatch('getFavorites')
      dispatch('getRoute')
      commit('setLoginPopup')
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async registration({ commit }, inputs) {
    try {
      const response = await axiosInstance.post('registration', inputs)
      localStorage.setItem('userData', JSON.stringify({ token: response.data.token, refreshToken: response.data.refreshToken }))
      commit('setUser', response.data.user)
      router.push({ name: routeNames.places })
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async replaceUserAvatar(_context, user) {
    const formData = new FormData()
    formData.append('name', user.name)
    formData.append('image', user.image)
    try {
      await axiosInstance.post('settings', formData)
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async replaceUserEmail(_context, user) {
    try {
      await axiosInstance.post('settings', { name: user.name, oldEmail: user.oldEmail, email: user.email })
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async replaceUserPassword(_context, user) {
    try {
      await axiosInstance.post('settings', { name: user.name, oldPassword: user.oldPassword, password: user.password })
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async newFavorite({ state, dispatch }, placeId) {
    try {
      const response = await axiosInstance.post('favorite', { userId: state.user.id, placeId })
      if (response) {
        dispatch('getFavorites')
      }
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async newPointInRoute({ state, dispatch }, placeId) {
    try {
      const response = await axiosInstance.post('route', { userId: state.user.id, placeId })
      if (response) {
        dispatch('getRoute')
      }
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async getRoute({ state, commit }) {
    try {
      const response = await axiosInstance.get('route', { params: { id: state.user.id } })
      commit('setmyRoute', response.data)
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async getFavorites({ state, commit }) {
    try {
      const response = await axiosInstance.get('favorite', { params: { id: state.user.id } })
      commit('setmyFavorites', response.data)
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  logOut({state}) {
    localStorage.removeItem('userData')
    state.user = {}
    state.myRoute = []
    state.myFavorites = []
    router.push({ name: routeNames.places })
  },
}