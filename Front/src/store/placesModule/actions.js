import { axiosInstance } from '../../httpClient'
import { compressAndRenamePicture } from "../../services/file.service"

export const actions = {

  async getPlaces({ commit }) {
    try {
      const response = await (await axiosInstance.get('places'))
      const places = response.data
      commit("setPlaces", response.data)
      const regions = [...places.map((place) => place.region), ...places.map((place) => place.city)]
        .reduce((acc, el) => {
          acc[el] = (acc[el] || 0) + 1
          return acc
        }, {})
      commit("setRegions", regions)
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

  async addNewPlace(_context, inputs) {
    try {
      const formData = new FormData()
      formData.append('place', JSON.stringify(inputs[0]))
      Object.values(inputs[1]).forEach(file => {
        formData.append('images', compressAndRenamePicture(file))
      })
      await axiosInstance.post('place', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async editPlace(_context, inputs) {
    try {
      const formData = new FormData()
      formData.append('place', JSON.stringify(inputs[0]))
        if(inputs.length > 1) {
        Object.values(inputs[1]).forEach(file => {
          formData.append('images', compressAndRenamePicture(file))
        })
      }
      await axiosInstance.patch('place', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    } catch (e) {
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
}