<template>
  <MyButton
    :title="isAddedInRouteTextButton"
    :isRed="isAddedInRoute"
    @click="addInMyRoute"
  />
</template>

<script>
import MyButton from './MyButton.vue'

export default {
  name: 'AddInRouteButton',
  props: ['placeId'],
  components: {
    MyButton,
  },
  computed: {
    isAddedInRoute(){
      return !!this.$store.state.myRoute.find(el => el.id === this.placeId)
    },
    isAddedInRouteTextButton(){
      if (this.isAddedInRoute){
        return "Убрать из маршрута"
      } else {
        return "Добавить в маршрут"
      }
    },
  },
  methods: {
    async addInMyRoute(){
      await this.$store.dispatch('newPointInRoute', this.placeId)
    },
  },
}
</script>
