<template>
<div>
  <div 
    class="route-point"
    :class="{'route-point--full-size': isFullSize, 'route-point-mobile': !isDesktop}"
    @click="toggleSize"
  >
      <div class="route-point__container" :class="{'route-point__container-desktop': isDesktop}">
        <div class="route-point__preview">
          <img :src="`${$baseUrl}/icons/arrow.png`" alt="star" class="route-point__arrow" :class="{'route-point__arrow-down': isFullSize}">
          <div class="route-point__name">{{routePoint.name}}</div>
          <div v-if="isDesktop" class="route-point__info">
            <div class="route-point__time">{{routePoint.time}}</div>
            <div class="route-point__time">{{routePoint.availability}}</div>
            <div class="route-point__time">{{routePoint.difficulty}}</div>
          </div>
        </div>
        <div class="route-point__buttons">
          <AddInRouteButton
          :placeId="routePoint.id"
          />
          <ButtonHeart
            :placeId="routePoint.id"
          />
        </div>
      </div>
      <PlacePreview
        :routePoint="routePoint"
      />
      <div>
        <div class="route-point__description">{{routePoint.description}}</div>
        <div  v-if="!isDesktop" class="route-point__info">
          <div class="route-point__time">{{routePoint.time}}</div>
          <div class="route-point__time">{{routePoint.availability}}</div>
          <div class="route-point__time">{{routePoint.difficulty}}</div>
        </div>
      </div>
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
  computed: {
    isDesktop(){
      return this.$store.state.isDesktop
    },
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
  height: 50px;
  display: grid;
  overflow: hidden;
  grid-template-rows: 50px 1fr;
  grid-auto-flow: column;
  gap: 20px;
  border: solid 1px rgba(0, 0, 0, 0.076);
  transition: 500ms;
  &:hover {
    background-color:rgb(228, 243, 255);
  }
}

.route-point-mobile {
  grid-template-columns: 1fr;
  grid-auto-flow: row;
  justify-items: center;
}

.route-point__container {
  font-weight: 400;
  font-size: 14px;
  cursor: default;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 10px;
}

.route-point__container-desktop {
  grid-column: 1 / span 2;
  font-weight: 500;
  font-size: 18px;
}

.route-point__buttons {
  display: grid;
  grid-template-columns: 120px 50px;
  align-items: center;
  justify-self: end;
  gap: 10px;
}
.route-point__preview {
  display: grid;
  grid-template-columns: 40px 1fr 1fr;
  align-items: center;
  gap: 10px;
}
.route-point__time {
  cursor: default;
}

.route-point--full-size {
  height: 100%;
}

.item__container-panel {
  display: grid;
}

.route-point__description {
  overflow: hidden;
  height: 180px;
}

.route-point__arrow {
  transition-duration: 400ms;
  width: 20px;
  height: 20px;
  padding: 8px;
  border-radius: 50%;
  background-color: white;
  transform: rotate(-180deg);
  border: solid 1px rgba(0, 0, 0, 0.076);
}

.route-point__arrow-down {
  transform: rotate(0deg);
}
.route-point__info {
  display: flex;
}
</style>