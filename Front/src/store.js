import axios from 'axios';
import { createStore } from 'vuex'

export const store = createStore({
  state () {
    return {
      selectedCity: 'Все',
      showLoginPopup: false,
      showGalleryPopup: false,
      myRoute:[],
      myFavorites:[],
      places: [],
      place: {},
      reviews: [],
      pictures: [],
      user: {},
    }
  },
  actions:{
    logOut(){
      localStorage.removeItem('userData')
      this.state.user = {}
      this.state.myRoute = []
      this.state.myFavorites = []
    },

    async getPlaces(){
      try {
        const response = await axios.get('http://localhost:3000/')
        this.commit("setPlaces", response.data)
      } catch(e) {
        alert("Ошибка HTTP: " + e.response.data.message)
      }
    },

    async getPlace(_context, place) {
      try {
        const response = await axios.get(`http://localhost:3000/place?id=${place}`)
        this.commit("setPlace", response.data)
      } catch (e) {
        alert("Ошибка HTTP: " + e.response.data.message)
      }
    },

    async getReviews(_context, placeId) {
      try {
        const response = await axios.get(`http://localhost:3000/reviews?id=${placeId}`)
        this.commit('setReviews', response.data)
      } catch (e) {
        alert("Ошибка HTTP: " + e.response.data.message)
      }
    },

    async getPictures(_context, place) {
      try {
        const response = await axios.get(`http://localhost:3000/pictures?id=${place}`)
        this.commit('setPictures', response.data)
      } catch (e) {
        alert("Ошибка HTTP: " + e.response.data.message)
      }
    },

    async getFavorites() {
      try {
        const response = await axios.get(`http://localhost:3000/favorites?id=${this.state.user.id}`)
        this.commit('setmyFavorites', response.data)
      } catch (e) {
        alert("Ошибка HTTP: " + e.response.data.message)
      }
    },

    async getRoute() {
      try {
        const response = await axios.get(`http://localhost:3000/routes?id=${this.state.user.id}`)
        this.commit('setmyRoute', response.data)
      } catch (e) {
        alert("Ошибка HTTP: " + e.response.data.message)
      }
    },

    async getUser() {
      try {
        const response = await axios.get('http://localhost:3000/auth', {
          headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userData')).token
          },
        })
        this.commit('setUser', response.data.user)
        if (response.data.refreshToken) {
          localStorage.setItem('userData', JSON.stringify({ token: response.data.refreshToken }))
        }
        this.dispatch('getFavorites')
        this.dispatch('getRoute')
      } catch (e) {
        //alert("Ошибка HTTP: " + e.response.data.message)
      }
    },

    async newReview(_context, inputs) {
      try {
        await axios.post('http://localhost:3000/review', {
          text: inputs.text,
          raiting: inputs.raiting,
          userId: this.state.user.id,
          placeId: this.state.place.id
        },
        {
          headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userData')).token
          },
        })
        return true
      } catch (e) {
        this.commit('setLoginPopup')
        return false
      }
    },

    async newFavorite(_context, placeId) {
      try {
        await axios.post('http://localhost:3000/favorite', {
          userId: this.state.user.id,
          placeId: placeId
        },
        {
          headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userData')).token
          },
        })
        return true
      } catch (e) {
        this.commit('setLoginPopup')
        return false
      }
    },

    async newPointInRoute(_context, placeId) {
      try {
        await axios.post('http://localhost:3000/route', {
          userId: this.state.user.id,
          placeId: placeId
        },
        {
          headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userData')).token
          },
        })
        return true
      } catch (e) {
        this.commit('setLoginPopup')
        return false
      }
    },

    async login(_context, inputs) {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          name: inputs.name,
          password: inputs.password
        })
        localStorage.setItem('userData', JSON.stringify({ token: response.data.token }))
        this.commit('setUser', response.data.user)
        this.commit('setLoginPopup')
      } catch (e) {
        alert("Ошибка HTTP: " + e.response.data.message)
      }
    },

    async registration(_context, inputs) {
      try {
        const response = await axios.post('http://localhost:3000/registration', {
          name: inputs.name,
          password: inputs.password,
          email: inputs.email
        })
        localStorage.setItem('userData', JSON.stringify({ token: response.data.token }))
        this.commit('setUser', response.data.user)
        return true
      } catch (e) {
        alert("Ошибка HTTP: " + e.response.data.message)
        return false
      }
    },
  },

  mutations: {
    setSelectedCity (state, payload) {
      state.selectedCity = payload
    },
    setLoginPopup (state) {
      state.showLoginPopup = !state.showLoginPopup
    },
    setGalleryPopup (state, payload) {
      state.showGalleryPopup = payload
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
    removeFavorite (state, payload) {
      state.myFavorites = state.myFavorites.filter(item => item.id !== payload.id);
    },
    removePoint (state, payload) {
      state.myRoute = state.myRoute.filter(item => item.id !== payload.id);
    },
    changeRouteMap (state, km) {
      state.routeMap = [...state.routeMap, km]
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
  }
})

