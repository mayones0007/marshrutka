import { createStore } from 'vuex'
import { axiosInstance } from './httpClient'

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
    },

    async getPlaces(){
      try {
        const response = await axiosInstance.get('')
        this.commit("setPlaces", response.data)
      } catch(e) {
        console.log("Ошибка HTTP: " + e)
      }
    },

    async getPlace(_context, place) {
      try {
        const response = await axiosInstance.get(`place?id=${place}`)
        this.commit("setPlace", response.data)
      } catch (e) {
        console.log("Ошибка HTTP: " + e)
      }
    },

    async getReviews(_context, placeId) {
      try {
        const response = await axiosInstance.get(`review?id=${placeId}`)
        this.commit('setReviews', response.data)
      } catch (e) {
        console.log("Ошибка HTTP: " + e)
      }
    },

    async getPictures(_context, place) {
      try {
        const response = await axiosInstance.get(`pictures?id=${place}`)
        this.commit('setPictures', response.data)
      } catch (e) {
        console.log("Ошибка HTTP: " + e)
      }
    },

    async getFavorites() {
      try {
        const response = await axiosInstance.get(`favorite?id=${this.state.user.id}`)
        this.commit('setmyFavorites', response.data)
      } catch (e) {
        console.log("Ошибка HTTP: " + e)
      }
    },

    async getRoute() {
      try {
        const response = await axiosInstance.get(`route?id=${this.state.user.id}`)
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
      } catch (e) {
        console.log("Ошибка HTTP: " + e)
      }
    },

    async newFavorite(_context, placeId) {
      try {
        await axiosInstance.post('favorite', { userId: this.state.user.id, placeId })
      } catch (e) {
        console.log("Ошибка HTTP: " + e)
      }
    },

    async newPointInRoute(_context, placeId) {
      try {
        await axiosInstance.post('route', { userId: this.state.user.id, placeId })
      } catch (e) {
        console.log("Ошибка HTTP: " + e)
      }
    },

    async login(_context, inputs) {
      try {
        const response = await axiosInstance.post('login', {
          name: inputs.name,
          password: inputs.password
        })
        localStorage.setItem('userData', JSON.stringify({ token: response.data.token, refreshToken: response.data.refreshToken }))
        this.commit('setUser', response.data.user)
        this.commit('setLoginPopup')
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
    },
    setPictures(state, pictures) {
      state.pictures = pictures
    },
    setIsDesktop(state, payload) {
      state.isDesktop = payload
    },
  }
})

