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
      if (await this.$store.dispatch('newPointInRoute', this.placeId)) {
        await this.$store.dispatch("getRoute")
      } else {
        alert('Для добавления в маршрут авторизуйтесь')
      }
    },
  },
}
</script>
