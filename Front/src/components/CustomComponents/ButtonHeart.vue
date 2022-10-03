<template>
  <img 
    class="heart"
    :class="{'heart-grey': isFavorite}"
    :src="`${$baseUrl}/icons/heart.png`"
    alt="heart"
    @click="addInMyFavorites"
  >
</template>

<script>
export default {
  name: 'ButtonHeart',
  props: ['placeId'],
  computed: {
    isFavorite(){
      return !!this.$store.state.myFavorites.find(el => el.id === this.placeId)
    },
  },
  methods: {
    async addInMyFavorites(){
      await this.$store.dispatch('newFavorite', this.placeId)
    },
  }
}
</script>

<style lang="scss" scoped>
.heart {
  width: 20px;
  height: 20px;
  border: solid red 1px;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  filter: grayscale(1);
}

.heart-grey{
  filter: grayscale(0);
}
</style>