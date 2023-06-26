<template>
  <div>
    <div
      class="header"
      @click="showAll"
    >
      {{ isFullSize.length === route.length ? 'Свернуть все' : 'Развернуть все' }}
    </div>
    <div
      v-for='(routePoint, idx) in route'
      :key="routePoint.id"
      class="route-point"
      :class="{'route-point-full-size': isFullSize.includes(routePoint.id), 'route-point-mobile': !isDesktop}"
      @click.self="toggleSize(routePoint.id)"
    >
      <div class="route-point__name" :class="{'route-point__name-mobile': !isDesktop}" @click.self="toggleSize(routePoint.id)">
        <img :src="`${$baseUrl}/icons/arrow.png`" alt="star" class="route-point__arrow" :class="{'route-point__arrow-down': isFullSize.includes(routePoint.id)}" @click="toggleSize(routePoint.id)">
        <div @click="toggleSize(routePoint.id)">{{routePoint.name}}</div>
        <ButtonHeart
          :placeId="routePoint.id"
          v-if="!isDesktop"
        />
      </div>
      <div v-if="isDesktop" class="route-point__info route-point__info-desktop">
        <div class="tag">{{routePoint.region}}</div>
        <div class="tag">{{routePoint.city}}</div>
        <div class="tag">{{routePoint.category}}</div>
        <ButtonHeart
          :placeId="routePoint.id"
        />
      </div>
      <PlacePreview
        :routePoint="routePoint"
      />
      <div class="route-point__container">
        <div class="route-point__description">{{routePoint.description}}</div>
        <div v-if="!isDesktop" class="route-point__info">
          <div class="tag">{{routePoint.region}}</div>
          <div class="tag">{{routePoint.city}}</div>
          <div class="tag">{{routePoint.category}}</div>
        </div>
        <div
          v-if="!isHideAddInRouteButton"
          class="route-point__buttons"
        >
          <div>
            <img
              v-if="idx"
              :src="`${$baseUrl}/icons/arrow.png`"
              class="route-point__buttons-arrow route-point__buttons-arrow-up"
              @click="changeRoute(idx, -1)"
            >
            <img
              v-if="idx < route.length - 1"
              :src="`${$baseUrl}/icons/arrow.png`"
              class="route-point__buttons-arrow"
              @click="changeRoute(idx, +1)"
            >
          </div>
          <AddInRouteButton
            :placeId="routePoint.id"
          />
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
    ButtonHeart,
  },
  props: ['route', 'isHideAddInRouteButton'],
  data(){
    return {
      isFullSize: [],
    }
  },
  computed: {
    isDesktop(){
      return this.$store.state.appModule.isDesktop
    },
  },
  methods: {
    toggleSize(idx) {
      this.isFullSize.indexOf(idx) < 0 ? this.isFullSize.push(idx) : this.isFullSize.splice(this.isFullSize.indexOf(idx), 1)
    },
    showAll() {
      this.isFullSize = this.isFullSize.length === this.route.length ? [] : this.route.map(el => el.id)
    },
    changeRoute (idx, change) {
      const route = this.route
      const point = route.splice(idx, 1)
      route.splice(idx + change, 0, point[0])
      this.isHideAddInRouteButton ? this.$store.commit('setmyRoute', route) : this.$store.commit('setRoute', route)
    },
  },
}
</script>

<style scoped lang="scss">
.header {
  margin: 5px 0 5px 10px;
  font-size: 14px;
  font-weight: 300;
  cursor: pointer;

  &:hover {
    color: green;
  }
}

.route-point {
  padding: 20px;
  height: 20px;
  display: grid;
  overflow: hidden;
  grid-template-rows: 20px 1fr;
  grid-template-columns: 300px 1fr;
  gap: 20px;
  border-bottom: solid 1px rgba(0, 0, 0, 0.076);
  align-items: center;
  justify-items: center;
  cursor: default;
  &:hover {
    background-color:rgb(248, 248, 248);
  }
  &-full-size {
    height: 100%;
  }
}

.route-point-mobile {
  grid-template-columns: 1fr;
  grid-auto-flow: row;
}

.route-point__buttons {
  width: 100%;
  display: flex;
  justify-self: end;
  align-self: end;
  justify-content: space-between;
  align-items: center;

  &-arrow-up {
    transform: scale(1, -1);
  }

  &-arrow {
    margin: 5px;
    height: 25px;
    cursor: pointer;
    filter: opacity(0.3);

    &:hover {
      filter: opacity(1);
    }
  }
}
.route-point__name {
  display: flex;
  align-items: center;
  width: 100%;
  justify-self: start;
  gap: 10px;
}

.route-point__name-mobile {
  justify-content: space-between;
}

.route-point__description {
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: pre-line;
  line-height: 20px;
  text-align: justify;
  overflow: hidden;
  font-weight: 300;
  text-indent: 20px;
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
  flex-wrap: wrap;
  white-space: nowrap;
  overflow: hidden;
  gap: 10px;
  &-desktop {
    justify-self: end;
    flex-wrap: nowrap;
  }
}
.route-point__container {
  display: grid;
  gap: 20px;
  height: 100%;
}
.tag {
  font-weight: 200;
  font-size: 0.9em;
  padding: 10px;
  background-color:rgb(255, 255, 255);
  border-radius: 20px;
  border: solid rgb(240, 240, 240) 1px;
}
</style>