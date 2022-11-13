<template>
  <MyButton
    :title="buttonTitle"
    :isRed="isAddedInRoute"
    :icon="'geo-alt.svg'"
    @click="changeMyRoute"
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
      return !!this.$store.state.userModule.myRoute.find(el => el.id === this.placeId)
    },
    buttonTitle(){
      return this.isAddedInRoute ? "Убрать из маршрута" : "Добавить в маршрут"
    },
  },
  methods: {
    changeMyRoute(){
      this.isAddedInRoute ? this.$store.dispatch('deleteInMyRoute', this.placeId) : this.$store.dispatch('addInMyRoute', this.placeId)
    },
  },
}
</script>
