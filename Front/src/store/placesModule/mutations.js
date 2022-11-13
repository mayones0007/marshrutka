export const mutations = {
  setSelectedRegion(state, region) {
    state.selectedRegion = region
    state.appliedFilters = {}
  },

  setSelectedCategory(state, category) {
    state.selectedCategory = category
  },

  setPlaces(state, places) {
    state.places = places
  },

  setPlace(state, place) {
    state.place = place
  },

  setReviews(state, reviews) {
    state.reviews = reviews
    state.place.raiting = Math.round(reviews.reduce((acc, num) => acc + num.raiting, 0) / reviews.length)
  },

  setPictures(state, pictures) {
    state.pictures = pictures
  },

  setFilters(state, filters) {
    state.filters = filters
  },

  setAppliedFilters(state, filter) {
    state.appliedFilters = { ...state.appliedFilters, ...filter }
  },

  resetAppliedFilter(state, filter) {
    delete state.appliedFilters[filter]
  },

  setRoute(state, payload) {
    state.route = payload
  },

  setRouteInfo(state, payload) {
    state.routeInfo = payload
  },

  setRoutes(state, payload) {
    state.routes = payload
  },

  setBooking(state, payload) {
    state.booking = payload
  },
}