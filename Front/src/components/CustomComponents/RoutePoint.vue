<template>
  <div 
    class="route-point"
    :class="{'route-point--full-size': isFullSize}"
  >
    <div class="route-point__info" @click="toggleSize">
      <div class="route-point__name">{{routePoint.name}}
        <div class="user-menu__arrow" :class="{'user-menu__arrow-down': isFullSize}"/>
      </div>
      <div class="route-point__time">{{routePoint.time}}</div>
      <PlacePreview
        :routePoint="routePoint"
      />
      <div class="item__description">{{routePoint.description}}</div>
    </div>
    <div class="route-point__buttons" :class="{'route-point__buttons-reverse': ButtonsReverse}">
    <AddInRouteButton
      :placeId="routePoint.id"
    />
    <ButtonHeart
      :placeId="routePoint.id"
    />
  </div>
  </div>
</template>

<script>
import AddInRouteButton from './AddInRouteButton.vue'
import PlacePreview from './PlacePreview.vue'
import ButtonHeart from './ButtonHeart.vue'
export default {
  components: {
    AddInRouteButton,
    PlacePreview,
    ButtonHeart
  },
props: ['routePoint', 'FullSize', 'ButtonsReverse'],
data(){
  return {
    isFullSize: this.FullSize,
  }
},
  methods: {
    toggleSize() {
      this.isFullSize = !this.isFullSize;
    },
  },
}
</script>

<style scoped lang="scss">

.route-point {
  margin-top: 20px;
  padding: 20px;
  border-radius: 20px;
  background-color:aliceblue;
  display: grid;
  height: 50px;
  overflow: hidden;
  grid-template-columns: 1fr 100px;
  gap: 20px;
  border: solid 1px rgba(0, 0, 0, 0.076);
  transition: 500ms;
  &:hover {
    background-color:rgb(228, 243, 255);
  }
}

.route-point__info {
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 50px 180px;
  gap: 20px;
  text-align: start;
  font-weight: 100;
  font-size: 18px;
}

.route-point__buttons {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
}

.route-point__buttons-reverse {
  flex-direction: column-reverse;
  justify-content: flex-end;
}

.route-point__name {
  margin: auto 0;
  font-weight: 500;
  cursor: default;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  gap: 20px;
}

.route-point__time {
  margin: auto 0;
  cursor: default;
}

.route-point--full-size {
  height: 250px;
}

.item__container-panel {
  display: grid;
}

.item__description {
  overflow: hidden;
  height: 195px;
}

.user-menu__arrow {
  border-bottom: solid 2px black;
  border-left: solid 2px black;
  width: 10px;
  height: 10px;
  transform: rotate(135deg);
  transition-duration: 400ms;
  margin-top: 6px;
}

.user-menu__arrow-down {
  transform: rotate(-45deg);
  margin-top: 3px;
}

</style>