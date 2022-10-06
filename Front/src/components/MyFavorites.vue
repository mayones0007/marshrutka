<template>
  <div class="page" :class="{'page-mobile': !isDesktop}">
    <h2>{{titleText}}</h2>
    <RoutePoint
      v-for='favorite in myFavorites'
      :key="favorite"
      :FullSize="true"
      :routePoint="favorite"
    />
  </div>
</template>

<script>
import RoutePoint from './CustomComponents/RoutePoint.vue'
export default {
  components: {
    RoutePoint,
  },
  computed: {
    myFavorites () {
      return this.$store.state.myFavorites
    },
    titleText () {
      if (this.myFavorites.length) {
        return "Избранное: " + this.myFavorites.length
      } else {
        return "Пока здесь пусто"
      }
    },
    isDesktop(){
      return this.$store.state.isDesktop
    },
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