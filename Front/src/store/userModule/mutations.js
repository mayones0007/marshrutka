
export const mutations = {
  setmyRoute(state, payload) {
    state.myRoute = payload
  },

  setmyFavorites(state, payload) {
    state.myFavorites = payload
  },

  setmyFavoriteRoutes(state, payload) {
    state.myFavoriteRoutes = payload
  },

  setUser(state, user) {
    state.user = user
  },
}