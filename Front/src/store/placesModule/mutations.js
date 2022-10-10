
export const mutations = {
  setselectedRegion(state, region) {
    state.selectedRegion = region
  },

  setRegions(state, regions) {
    state.regions = regions
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
}