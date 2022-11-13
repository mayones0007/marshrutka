import { axiosInstance } from '../../httpClient'
import { router, routeNames } from '../../router'
import { compressAndRenamePicture } from "../../services/file.service"

export const actions = {
  async getUser({commit, dispatch}) {
    try {
      const response = await axiosInstance.get('user')
      commit('setUser', response.data.user)
      dispatch('getFavorites')
      dispatch('getFavoriteRoutes')
      dispatch('getMyRoute')
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async login({ commit, dispatch }, inputs) {
    try {
      const response = await axiosInstance.post('login', inputs)
      localStorage.setItem('userData', JSON.stringify({ accessToken: response.data.accessToken, refreshToken: response.data.refreshToken }))
      commit('setUser', response.data.user)
      dispatch('getFavorites')
      dispatch('getMyRoute')
      commit('setPopup')
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async registration({ commit }, inputs) {
    try {
      const response = await axiosInstance.post('registration', inputs)
      localStorage.setItem('userData', JSON.stringify({ accessToken: response.data.accessToken, refreshToken: response.data.refreshToken }))
      commit('setUser', response.data.user)
      router.push({ name: routeNames.places })
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async replaceUserAvatar(_context, image) {
    const formData = new FormData()
    formData.append('avatar', await compressAndRenamePicture(image))
    try {
      await axiosInstance.patch('user', formData)
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async replaceUserEmail(_context, user) {
    try {
      await axiosInstance.patch('user', user)
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async replaceUserPassword(_context, user) {
    try {
      await axiosInstance.patch('user', user)
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async addFavorite({ dispatch }, favorite) {
    try {
      const response = await axiosInstance.post('favorite', favorite)
      if (response) {
        favorite.placeId ? dispatch('getFavorites') : dispatch('getFavoriteRoutes')
      }
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async deleteFavorite({ dispatch }, favorite) {
    try {
      const response = await axiosInstance.delete('favorite', { params: favorite })
      if (response) {
        favorite.placeId ? dispatch('getFavorites') : dispatch('getFavoriteRoutes')
      }
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async addInMyRoute({ state, dispatch }, placeId) {
    try {
      const response = await axiosInstance.post('myroute', { userId: state.user.id, placeId })
      if (response) {
        dispatch('getMyRoute')
      }
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async deleteInMyRoute({ state, dispatch }, placeId) {
    try {
      const response = await axiosInstance.delete('myroute', { params: { userId: state.user.id, placeId } })
      if (response) {
        dispatch('getMyRoute')
      }
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async getMyRoute({ state, commit }) {
    try {
      const response = await axiosInstance.get('myroute', { params: { id: state.user.id } })
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

  async getFavoriteRoutes({ state, commit }) {
    try {
      const response = await axiosInstance.get('favoriteroutes', { params: { id: state.user.id } })
      commit('setmyFavoriteRoutes', response.data)
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

  async reserve({ state, dispatch }, placeId) {
    try {
      const response = await axiosInstance.post('reserve', { userId: state.user.id, placeId })
      if (response) {
        dispatch('getRoute')
      }
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },
}