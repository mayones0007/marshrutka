import { createStore } from 'vuex'

// Create a new store instance.
export const store = createStore({
  state () {
    return {
      selectedCity: '',
      showLoginPopup: false,
      showGalleryPopup: false,
      myRoute:[],
      myFavorites:[],
      places: [],
      place: [],
      reviews: [],
      user: [{name:'Неопознанный турист', avatar:'tourist.png'}],
      myOptimalRoute: [],
    }
  },
  actions:{
    async getPlaces(){
      const response = await fetch('http://localhost:3000/',{
        method: 'GET',
        });
        if (response.ok) {
          const places = await response.json();
          this.commit("setPlaces", places)
        } else {
          alert("Ошибка HTTP: " + response.status);
        }
    },
    async getPlace(_context, place){
      const response = await fetch(`http://localhost:3000/place?id=${place}`,{
        method: 'GET',
        })
        const data = await response.json();
      if (data.success) {
        this.commit('setPlace', data.places);
      }
    },
    async getReviews(_context, place){
      const response = await fetch(`http://localhost:3000/reviews?id=${place}`,{
        method: 'GET',
        })
        const data = await response.json();
      if (data.success) {
        this.commit('setReviews', data.reviews);
      }
    },
    async getFavorites(){
      const response = await fetch(`http://localhost:3000/favorites`,{
        method: 'GET',
        })
        const data = await response.json();
      if (data.success) {
        this.commit('setmyFavorites', data.favorites);
      }
    },
    async getRoute(){
      const response = await fetch(`http://localhost:3000/routes`,{
        method: 'GET',
        })
        const data = await response.json();
      if (data.success) {
        this.commit('setmyRoute', data.routes);
      }
    },
    async getOptimalRoute(){
      const response = await fetch(`http://localhost:3000/optimalroute`,{
        method: 'GET',
        })
        const data = await response.json();
      if (data.success) {
        this.commit('setMyOptimalRoute', data.routes);
      }
    },
    async newReview(_context, text){
      const response = await fetch('http://localhost:3000/review',{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({text:text, userName: this.state.user[0].name, eng:this.state.place[0].eng})
        });
        const data = await response.json();
        alert(data.message);
    },
    async newFavorite(_context, placeName){
      const response = await fetch('http://localhost:3000/favorite',{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({userName: this.state.user[0].name, eng: placeName})
        });
        const data = await response.json();
        alert(data.message);
    },
    async newPointInRoute(_context, placeName){
      const response = await fetch('http://localhost:3000/route',{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({userName: this.state.user[0].name, eng: placeName})
        });
        const data = await response.json();
        alert(data.message);
    },
  },
  mutations: {
    setSelectedCity (state, payload) {
      state.selectedCity = payload
    },
    setLoginPopup (state, payload) {
      state.showLoginPopup = payload
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
  }
})

