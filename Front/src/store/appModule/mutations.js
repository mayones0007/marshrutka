
export const mutations = {
  setLoginPopup(state) {
    state.showLoginPopup = !state.showLoginPopup
  },
  
  setGalleryPopup(state) {
    state.showGalleryPopup = !state.showGalleryPopup
  },
  
  setIsDesktop(state, payload) {
    state.isDesktop = payload
  },
}