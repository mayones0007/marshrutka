<template>
  <div class="page" :class="{'page-mobile': !isDesktop}">
    <MasonryWall :items="routes" :columnWidth="300" type="route" header="Популярные маршруты"/>
  </div>
</template>

<script>
import MasonryWall from './CustomComponents/MasonryWall.vue'
export default {
  components: {
    MasonryWall,
  },
  computed: {
    routes() {
      return this.$store.state.placesModule.routes
    },
    isDesktop(){
      return this.$store.state.appModule.isDesktop
    },
  },
  created(){
    this.$store.dispatch("getRoutes")
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
