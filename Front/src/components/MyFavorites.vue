<template>
  <div class="favorite-page">
    <Title
      :text="titleText"
    />
    <RoutePoint
      v-for='favorite in myFavorites'
      :key="favorite"
      :routePoint="favorite"
      :FullSize="false"
      :ButtonsReverse="true"
    />
  </div>
</template>

<script>
import RoutePoint from './CustomComponents/RoutePoint.vue'
import Title from './CustomComponents/Title.vue'
export default {
  components: {
    RoutePoint,
    Title,
  },
  computed: {
    myFavorites () {
      return this.$store.state.myFavorites
    },
    titleText () {
      if (this.myFavorites.length === 0) {
        return "Пока здесь пусто"
      } else {
      return "Избранное: "+this.myFavorites.length
      }
    }
  },
}
</script>

<style scoped>
.favorite-page {
  padding: 2%;
}
</style>