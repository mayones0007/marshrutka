import { axiosInstance } from '../../httpClient'

export const actions = {
  async getPlaces({ commit }) {
    try {
      const response = await axiosInstance.get('places')
      commit("setPlaces", response.data)
      const regions = [...response.data.map((place) => place.region), ...response.data.map((place) => place.city)]
        .reduce((acc, el) => {
          acc[el] = (acc[el] || 0) + 1
          return acc
        }, {})
      commit("setRegions", regions)
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async getPlace({ commit, dispatch }, place) {
    try {
      const response = await axiosInstance.get(`place?id=${place}`)
      dispatch("getPictures", response.data.id)
      dispatch("getReviews", response.data.id)
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
        placeId: state.place.id
      })
      dispatch("getReviews", state.place.id)
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async deleteReview({ state, dispatch }, id) {
    try {
      await axiosInstance.delete('review', { params: { id } })
      dispatch("getReviews", state.place.id)
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async addNewPlace(_context, place) {
    try {
      await axiosInstance.post('place', { place })
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },

  async editPlace(_context, place) {
    try {
      await axiosInstance.patch('place', { place })
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

  async addPlaceImage(_context, inputs) {
    const formData = new FormData()
    formData.append('id', inputs[0])
    formData.append('image', inputs[1])
    try {
      await axiosInstance.post('pictures', formData)
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },
  
  async deletePlaceImage(_context, id) {
    try {
      await axiosInstance.delete('pictures', { params: { id } })
    } catch (e) {
      console.log("Ошибка HTTP: " + e)
    }
  },
}