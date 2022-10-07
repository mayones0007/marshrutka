<template>
  <svg xmlns="http://www.w3.org/2000/svg" class="heart" :class="{'heart-red': isFavorite}" viewBox="-1 -1 18 18" @click="addInMyFavorites">
    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
  </svg>
</template>

<script>

export default {
  props: ['placeId'],
  computed: {
    isFavorite(){
      return !!this.$store.state.myFavorites.find(el => el.id === this.placeId)
    },
  },
  methods: {
    addInMyFavorites(){
      this.$store.dispatch('newFavorite', this.placeId)
    },
  }
}
</script>

<style lang="scss" scoped>
  .heart {
    fill: transparent;
    height: 25px;
    width: 25px;
    cursor: pointer;
    align-self: center;
    justify-self: center;
    stroke: rgb(255, 85, 85);
    stroke-width: 1px;
    &-red {
      fill: rgb(255, 85, 85);
    }
  }
</style>