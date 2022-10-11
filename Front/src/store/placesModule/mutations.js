export const mutations = {
  setSelectedRegion(state, region) {
    state.selectedRegion = region
    state.filteredPlaces = state.places.filter((item) => item.region === region || item.city === region)
    state.appliedFilters = {}
  },

  setSelectedCategory(state, category) {
    state.selectedCategory = category
  },

  setRegions(state, regions) {
    state.regions = regions
  },
  
  setPlaces(state, places) {
    state.places = places
    if (Object.keys(state.appliedFilters).length === 0) {
      state.filteredPlaces = places
    }
    
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

  setFilters(state, filter) {
    state.appliedFilters = { ...state.appliedFilters, ...filter }
    if (state.selectedRegion) {
      state.filteredPlaces = state.places.filter((item) => item.region === state.selectedRegion || item.city === state.selectedRegion)
    } else {
      state.filteredPlaces = state.places
    }
    for (const [key, value] of Object.entries(state.appliedFilters)) { state.filteredPlaces = state.filteredPlaces.filter((item) => item[key] === value) }
  },

  resetFilter(state, filter) {
    delete state.appliedFilters[filter]
    if (state.selectedRegion) {
      state.filteredPlaces = state.places.filter((item) => item.region === state.selectedRegion || item.city === state.selectedRegion)
    } else {
      state.filteredPlaces = state.places
    }
    for (const [key, value] of Object.entries(state.appliedFilters)) { state.filteredPlaces = state.filteredPlaces.filter((item) => item[key] === value) }
  },
}