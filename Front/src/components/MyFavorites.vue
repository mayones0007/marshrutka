<template>
  <div>
    <MasonryWall :items="myFavoriteRoutes" :columnWidth="350" type="routes" header="Маршруты"/>
    <MasonryWall :items="myFavorites" :columnWidth="350" type="places" header="Места"/>
    <h1 v-if="!myFavoriteRoutes.length && !myFavorites.length">Добавьте места в избранное</h1>
  </div>
</template>

<script>
import MasonryWall from './CustomComponents/MasonryWall.vue'
export default {
  components: {
    MasonryWall,
  },
  computed: {
    myFavoriteRoutes() {
      return this.$store.state.userModule.myFavoriteRoutes
    },
    myFavorites () {
      return this.$store.state.userModule.myFavorites
    },
  },
  created(){
    this.$store.dispatch("getFavoriteRoutes")
  },
}
</script>
