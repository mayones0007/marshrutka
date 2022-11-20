import { axiosInstance } from '../../httpClient'
import { compressAndRenamePicture } from "../../services/file.service"

export const actions = {

  async getPlaces({ state, commit }, page) {
    page ? commit('setPagination', page) : commit('resetPagination')
    try {
      const response = await axiosInstance.get('places', { params: {...state.appliedFilters, ...state.pagination }})
      page ? commit("setPlaces", response.data) : commit("resetPlaces", response.data)
      commit("setIsLastPage", response.data.length < state.pagination.limit)
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async getPlace({ commit, dispatch }, id) {
    try {
      const response = await axiosInstance.get(`place?id=${id}`)
      dispatch("getPictures", id)
      dispatch("getReviews", id)
      commit("setPlace", response.data)
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async getReviews({ commit }, id) {
    try {
      const response = await axiosInstance.get('review', { params: { id } })
      commit('setReviews', response.data)
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async getPictures({ commit }, id) {
    try {
      const response = await axiosInstance.get('pictures', { params: { id } })
      commit('setPictures', response.data)
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async newReview({ state, dispatch, rootState }, inputs) {
    try {
      await axiosInstance.post('review', {
        text: inputs.text,
        raiting: inputs.raiting,
        userId: rootState.userModule.user.id,
        placeId: state.place.id,
        createdAt: new Date()
      })
      dispatch("getReviews", state.place.id)
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async deleteReview({ state, dispatch }, id) {
    try {
      await axiosInstance.delete('review', { params: { id, placeId: state.place.id } })
      dispatch("getReviews", state.place.id)
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async addNewPlace(_context, place) {
    try {
      const formData = new FormData()
      formData.append('place', JSON.stringify(place.info))
      const files = []
      Object.values(place.pictures).forEach(file => {
        files.push(compressAndRenamePicture(file))
      })
      return Promise.all(files).then(async (list) => {
        list.forEach(file => formData.append('images', file))
        const response = await axiosInstance.post('place', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        return response.status
      })
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async editPlace(_context, place) {
    try {
      const formData = new FormData()
      formData.append('place', JSON.stringify(place.info))
      const files = []
        if(place.pictures) {
          Object.values(place.pictures).forEach((file) => {
          files.push(compressAndRenamePicture(file))
        })
      }
      return Promise.all(files).then(async(list) => {
        list.forEach(file => formData.append('images', file))
        const response = await axiosInstance.patch('place', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        return response.status
      })
    }
     catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async deletePlace(_context, id) {
    try {
      await axiosInstance.delete('place', { params: { id } })
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async addPlacePicture(_context, inputs) {
    const formData = new FormData()
    formData.append('id', inputs[0])
    Object.values(inputs[1]).forEach(file => {
      formData.append('images', file)
    })
    try {
      await axiosInstance.post('pictures', formData, {headers:{'Content-Type': 'multipart/form-data'}})
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },
  
  async deletePlacePicture(_context, fileName) {
    try {
      await axiosInstance.delete('pictures', { params: { fileName } })
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async getRoute({ commit }, id) {
    try {
      const response = await axiosInstance.get(`routelink?id=${id}`)
      commit('setRoute', response.data)
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async getGuideRoute({ commit }, id) {
    try {
      const response = await axiosInstance.get(`route?id=${id}`)
      commit('setRouteInfo', response.data)
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async getRoutes({ state, commit }, page) {
    page ? commit('setPagination', page) : commit('resetPagination')
    try {
      const response = await axiosInstance.get('routes', { params: { ...state.appliedFilters, ...state.pagination } })
      page ? commit("setRoutes", response.data) : commit("resetRoutes", response.data)
      commit("setIsLastPage", response.data.length < state.pagination.limit)
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async addBooking(_context, booking) {
    try {
      await axiosInstance.post('booking', booking)
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async getAllBooking({ commit }) {
    try {
      const response = await axiosInstance.get('booking')
      commit('setBooking', response.data)
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async getFilters({ state, commit }) {
    try {
      const response = await axiosInstance.get('filters', { params: state.appliedFilters })
      commit('setFilters', response.data)
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async setBooking({ dispatch }, id) {
    try {
      await axiosInstance.patch('booking',{ id })
      dispatch("getAllBooking")
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async routeSave({ commit }, route) {
    const formData = new FormData()
    formData.append('route', JSON.stringify(route.info))
    formData.append('picture', await compressAndRenamePicture(route.picture))
    try {
      await axiosInstance.post('routes', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      commit('setPopup')
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },
  async deleteRoute({ dispatch }, id) {
    try {
      await axiosInstance.delete('route', { params: { id } })
      dispatch("getRoutes")
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },
}