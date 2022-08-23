<template>
    <img 
        class="heart"
        :class="{'heart-grey': isFavorite}"
        src="http://localhost:3000/icons/heart.png"
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
      if (await this.$store.dispatch('newFavorite', this.placeId)) {
        await this.$store.dispatch("getFavorites")
      } else {
        alert('Для добавления в избранное авторизуйтесь')
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.heart {
  width: 25px;
  border: solid red 1px;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  filter: grayscale(1);
  margin: 0 auto;
}

.heart-grey{
  filter: grayscale(0);
}
</style>