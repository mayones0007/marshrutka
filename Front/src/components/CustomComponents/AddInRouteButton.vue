<template>
  <MyButton
    :title="buttonTitle"
    :isRed="isAddedInRoute"
    :icon="'geo-alt.svg'"
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
    buttonTitle(){
      if (this.isAddedInRoute){
        return "Убрать из маршрута"
      } else {
        return "Добавить в маршрут"
      }
    },
  },
  methods: {
    addInMyRoute(){
      this.$store.dispatch('newPointInRoute', this.placeId)
    },
  },
}
</script>
