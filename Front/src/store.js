import { createStore } from 'vuex'
import { axiosInstance } from './httpClient'
import { router } from './router'

export const store = createStore({
  state () {
    return {
      selectedRegion: 'Все',
      showLoginPopup: false,
      showGalleryPopup: false,
      myRoute:[],
      myFavorites:[],
      places: [],
      place: {},
      reviews: [],
      pictures: [],
      user: {},
      isDesktop: true,
    }
  },
  actions: {
    logOut(){
      localStorage.removeItem('userData')
      this.state.user = {}
      this.state.myRoute = []
      this.state.myFavorites = []
      router.push({ name: "MyPlaces" })
    },
    async getPlaces(){
      try {
        const response = await axiosInstance.get('places')
        this.commit("setPlaces", response.data)
      } catch(e) {
        console.log("Ошибка HTTP: " + e)
      }
    },

    async getPlace({commit, dispatch}, place) {
      try {
        const response = await axiosInstance.get(`place?id=${place}`)
        dispatch("getPictures", response.data.id)
        dispatch("getReviews", response.data.id)
        commit("setPlace", response.data)
      } catch (e) {
        console.log("Ошибка HTTP: " + e)
      }
    },

    async getReviews({commit}, placeId) {
      try {
        const response = await axiosInstance.get('review', {params: {id: placeId}})
        commit('setReviews', response.data)
      } catch (e) {
        console.log("Ошибка HTTP: " + e)
      }
    },

    async getPictures(_context, id) {
      try {
        const response = await axiosInstance.get('pictures', {params: { id }})
        this.commit('setPictures', response.data)
      } catch (e) {
        console.log("Ошибка HTTP: " + e)
      }
    },

    async getFavorites() {
      try {
        const response = await axiosInstance.get('favorite', {params: {id: this.state.user.id}})
        this.commit('setmyFavorites', response.data)
      } catch (e) {
        console.log("Ошибка HTTP: " + e)
      }
    },

    async getRoute() {
      try {
        const response = await axiosInstance.get('route', {params: {id: this.state.user.id}})
        this.commit('setmyRoute', response.data)
      } catch (e) {
        console.log("Ошибка HTTP: " + e)
      }
    },

    async getUser() {
      try {
        const response = await axiosInstance.get('user')
        this.commit('setUser', response.data.user)
        this.dispatch('getFavorites')
        this.dispatch('getRoute')
      } catch (e) {
        console.log("Ошибка HTTP: " + e)
      }
    },

    async newReview(_context, inputs) {
      try {
        await axiosInstance.post('review', {
          text: inputs.text,
          raiting: inputs.raiting,
          userId: this.state.user.id,
          placeId: this.state.place.id
        })
        this.dispatch("getReviews", this.state.place.id)
      } catch (e) {
        console.log("Ошибка HTTP: " + e)
      }
    },

    async deleteReview(_context, id) {
      try {
        await axiosInstance.delete('review', {params: {id}})
        this.dispatch("getReviews", this.state.place.id)
      } catch (e) {
        console.log("Ошибка HTTP: " + e)
      }
    },

    async newFavorite(_context, placeId) {
      try {
        const response = await axiosInstance.post('favorite', { userId: this.state.user.id, placeId })
        if (response) {await this.dispatch('getFavorites')}
      } catch (e) {
        console.log("Ошибка HTTP: " + e)
      }
    },

    async newPointInRoute(_context, placeId) {
      try {
        const response = await axiosInstance.post('route', { userId: this.state.user.id, placeId })
        if (response) {await this.dispatch('getRoute')}
      } catch (e) {
        console.log("Ошибка HTTP: " + e)
      }
    },

    async login({commit}, inputs) {
      try {
        const response = await axiosInstance.post('login', {
          name: inputs.name,
          password: inputs.password
        })
        localStorage.setItem('userData', JSON.stringify({ token: response.data.token, refreshToken: response.data.refreshToken }))
        commit('setUser', response.data.user)
        this.dispatch('getFavorites')
        this.dispatch('getRoute')
        commit('setLoginPopup')
      } catch (e) {
        console.log("Ошибка HTTP: " + e)
      }
    },

    async registration(_context, inputs) {
      try {
        const response = await axiosInstance.post('registration', {
          name: inputs.name,
          password: inputs.password,
          email: inputs.email
        })
        localStorage.setItem('userData', JSON.stringify({ token: response.data.token, refreshToken: response.data.refreshToken }))
        this.commit('setUser', response.data.user)
        router.push({ name: "MyPlaces" })
      } catch (e) {
        console.log("Ошибка HTTP: " + e)
      }
    },
    async addNewPlace(_context, place) {
      try {
        await axiosInstance.post('place', { place })
      } catch(e) {
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
    async deletePlaceImage(_context, image) {
      try {
        await axiosInstance.delete('pictures', { params: { image } })
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
  },

  mutations: {
    setselectedRegion (state, payload) {
      state.selectedRegion = payload
    },
    setLoginPopup (state) {
      state.showLoginPopup = !state.showLoginPopup
    },
    setGalleryPopup (state) {
      state.showGalleryPopup = !state.showGalleryPopup
    },
    setCurrentPicture (state, payload) {
      state.currentPicture = payload
    },
    setmyRoute (state, payload) {
      state.myRoute = payload
    },
    setMyOptimalRoute (state, payload) {
      state.myOptimalRoute = payload
    },
    setmyFavorites (state, payload) {
      state.myFavorites = payload
    },
    setPlaces (state, places) {
      state.places = places
    },
    setPlace (state, place) {
      state.place = place
    },
    setUser (state, user) {
      state.user = user
    },
    setReviews (state, reviews) {
      state.reviews = reviews
      state.place.raiting = Math.round(reviews.reduce((acc, num) => acc + num.raiting, 0) / reviews.length)
    },
    setPictures(state, pictures) {
      state.pictures = pictures
    },
    setIsDesktop(state, payload) {
      state.isDesktop = payload
    },
  }
})

