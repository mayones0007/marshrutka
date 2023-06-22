export const mutations = {
  setSelectedRegion(state, region) {
    state.selectedRegion = region
    state.appliedFilters = {}
  },

  setSelectedCategory(state, category) {
    state.selectedCategory = category
  },

  setPlaces(state, places) {
    state.places = [...state.places, ...places]
  },

  resetPlaces(state, places) {
    state.places = places
  },

  setPlace(state, place) {
    state.place = place
  },

  setReviews(state, reviews) {
    state.reviews = reviews
    state.raiting = Math.round(reviews.reduce((acc, num) => acc + num.raiting, 0) / reviews.length)
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

  resetAppliedFilters(state) {
    state.appliedFilters = {}
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

  setRoutes(state, routes) {
    state.routes = [...state.routes, ...routes]
  },

  resetRoutes(state, routes) {
    state.routes = routes
  },

  setBookings(state, payload) {
    state.bookings = payload
  },

  setBooking(state, payload) {
    state.booking = payload
  },

  setPagination(state, payload) {
    state.pagination.offset = state.pagination.limit * payload
    state.page++
  },

  resetPagination(state) {
    state.pagination = { limit: 6, offset: 0 }
    state.page = 1
  },

  setIsLastPage(state, payload) {
    state.isLastPage = payload
  },

  setIsLastRoutesPage(state, payload) {
    state.isLastRoutesPage = payload
  },
}