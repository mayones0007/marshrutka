<template>
  <div class="save-panel" :class="{'save-panel-hide': hide}" >
    <div>Доступность:<br>{{currentPlace.availability}}</div>
    <div :class="`save-panel__difficalty save-panel__difficalty--${currentPlace.difficulty}`">
      Сложность:<br>{{currentPlace.difficulty}}
    </div>
    <div class="save-panel__time">Время:<br>{{currentPlace.time}}</div>
    <AddInRouteButton
      :placeId="currentPlace.id"
    />
    <ButtonHeart
      :placeId="currentPlace.id"
    />
    <div class="raiting">
      {{currentRaiting}}
      <img
        src="http://localhost:3000/icons/star.png"
        alt="star"
        class="icon-star"
      >
    </div>
  </div> 
</template>

<script>
import AddInRouteButton from './AddInRouteButton.vue'
import ButtonHeart from './ButtonHeart.vue'

export default {
  name: 'SavePanel',
  props: ['hide'],
  components: {
    AddInRouteButton,
    ButtonHeart,
  },
  computed: {
    currentPlace() {
      return this.$store.state.place
    },
    currentRaiting() {
      return Math.round(this.$store.state.reviews.map((review) => review.raiting).reduce((acc, num) => acc + num, 0) / this.$store.state.reviews.length)
    },
  }
}
</script>

<style lang='scss' scoped>

.save-panel {
  @include grid-g20;
  justify-items: center;
  padding: 20px;
  border-radius: 20px 0 0 20px;
  position: fixed;
  width: 140px;
  top: 100px;
  right: 0px;
  background-color: rgb(241, 241, 241);
}

.save-panel-hide {
  width: 0px;
  padding-right: 0px;
  transition: 500ms;
  &:hover {
    width: 140px;
    padding: 20px;
  }
}

.save-panel__difficalty {
  padding: 20px;
  color: white;
  border-radius: 5px;
  box-shadow: inset 0px 0px 5px rgba(193, 193, 193, 0.691);
  font-size: 15px;
}

.save-panel__difficalty--hard {
  background-color: rgb(242, 97, 0);
}

.save-panel__difficalty--medium {
  background-color: rgb(242, 202, 0);
}

.save-panel__difficalty--light {
  background-color: rgb(63, 180, 0);
}

.icon-star {
  height: 30px;
}

.raiting {
  font-size: 30px;
  gap: 5px;
  display: flex;
}
</style>