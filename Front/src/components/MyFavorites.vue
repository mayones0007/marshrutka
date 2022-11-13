<template>
  <div class="page" :class="{'page-mobile': !isDesktop}">
    <MasonryWall :items="myFavoriteRoutes" :columnWidth="350" type="route" header="Маршруты"/>
    <MasonryWall :items="myFavorites" :columnWidth="350" type="place" header="Места"/>
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
    isDesktop(){
      return this.$store.state.appModule.isDesktop
    },
  },
  created(){
    this.$store.dispatch("getFavoriteRoutes")
  },
}
</script>

<style lang="scss" scoped>
.page {
  padding: 2% 10%;
  &-mobile {
    padding: 2%;
  }
}
</style>
