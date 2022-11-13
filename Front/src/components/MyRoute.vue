<template>
  <div class="page" :class="{'page-no-header': !description,'page-mobile': !isDesktop}">
    <div v-if="!this.mapIsShowed" class="map">
      <img class="map__picture" :src="`${$baseUrl}/img/map.jpg`" alt="Карта">
      <div class="map__button">
        <MyButton 
          title="Смотреть на карте"
          @click="setMapIsShowed"
        />
      </div>
    </div>
    <div v-else class="map">
      <yandex-map
        :coords="coords" 
        zoom="5"
        :controls="controls"
        :behaviors="behaviors"
        @map-was-initialized="mapInitialized"
      >
      <ymap-marker 
        :coords="coords" 
        marker-id="Старт" 
        hint-content=""
      />
      </yandex-map>
    </div>
    <div class="booking-form" :class="{'booking-form-mobile': !isDesktop}">
      <div class="form__header">Забронировать поездку</div>
      <Datepicker
        v-model="request.date"
        class="form__date"
        :class="{'form__date-mobile': !isDesktop}"
        format="dd MMM"
        placeholder="Дата"
      />
      <input
        class="form__input"
        v-model="request.persons"
        type="number"
        placeholder="Сколько человек"
      >
      <input
        class="form__input"
        v-model="request.phone"
        placeholder="Номер телефона"
        type="tel"
      >
      <MyButton 
        title="Забронировать"
        @click="booking"
        :isDisabled="!myRoute.length"
      />
      <div class="form__button-share">
        <div v-if="!isDesktop">Поделиться с друзьями</div>
        <ShareButton
          :routeRef="'?id=' + routeRef"
        />
      </div>
    </div>
    <RoutePoint
      v-for='routePoint in myRoute'
      :key="routePoint.id"
      :routePoint="routePoint"
      :isHideAddInRouteButton="!isNewRoute"
    />
    <MyButton
      v-if="isNewRoute"
      title="Опубликовать маршрут"
      @click="setPopup"
      :isDisabled="!myRoute.length"
      class="form__button"
    />
    <Popup name="routeSave" v-if="this.$store.state.appModule.popup === 'routeSave'">
      <h2>Опубликовать маршрут</h2>
      <div class="form">
        <input
          class="form__input"
          v-model="route.name"
          type="text"
          placeholder="Название"
        >
        <input
          class="form__input"
          v-model="route.city"
          type="text"
          placeholder="Город"
        >
        <input
          class="form__input"
          v-model="route.price"
          type="number"
          placeholder="Цена"
        >
        <input
          class="form__input"
          v-model="route.persons"
          type="number"
          placeholder="Кол-во человек"
        >
        <input
          class="form__input"
          v-model="route.time"
          type="number"
          placeholder="Время"
        >
        <textarea class="form__textarea" v-model="route.description" placeholder="Описание"/>
        <div>
          <img v-if="this.picture" :src="this.picture" class="form__picture">
          <label v-else for="file" class="form__picture">
            <img :src="`${$baseUrl}/icons/plus.svg`">
            <div>ФОТО</div>
          </label>
          <input class="form__input-picture" type="file" id="file" ref="file" accept="image/*" @change="addRoutePicture()">
        </div>
      </div>
      <MyButton @click="routeSave" title="Опубликовать маршрут"/>
    </Popup>
  </div>
</template>

<script>
import RoutePoint from './CustomComponents/RoutePoint.vue'
import MyButton from './CustomComponents/MyButton.vue'
import ShareButton from '../components/CustomComponents/ShareButton.vue'
import Popup from '../components/CustomComponents/Popup.vue'
import Datepicker from '@vuepic/vue-datepicker'
import {router} from '../router'
import '@vuepic/vue-datepicker/src/VueDatePicker/style/main.scss'

let myMap = null;
export default {
  props: ['description'],
  components: {
    RoutePoint,
    MyButton,
    ShareButton,
    Popup,
    Datepicker
  },
data(){
  return{
    coords: [
      54.828966,
      39.831893,
      ],
    behaviors: ['dblClickZoom'],
    controls: ['fullscreenControl'],
    request: {},
    route: {},
    picture: '',
    mapIsShowed: false,
    }
  },
computed: {
  myRoute(){
    return this.$store.state.placesModule.route.length ? this.$store.state.placesModule.route : this.$store.state.userModule.myRoute
  },
  isDesktop(){
    return this.$store.state.appModule.isDesktop
  },
  routeCoords(){
    return this.myRoute.map(item => item.coords)
  },
  routeRef(){
    return this.myRoute.map(item => item.id).join('.')
  },
  isGuide(){
    return this.$store.state.userModule.user.role !== "user"
  },
  isNewRoute() {
    return this.$route.name === "myRoute" && !this.$route.query.id && this.isGuide
  }
},
  methods: {
    newRoute(){
      const multiRoute = new window.ymaps.multiRouter.MultiRoute({
        referencePoints: this.routeCoords,
        }, {
        editorDrawOver: false,
        wayPointDraggable: false,
        viaPointDraggable: false,
        routeStrokeColor: "000088",
        routeActiveStrokeColor: "ff0000",
        pinIconFillColor: "ff0000",
        boundsAutoApply: true,
        zoomMargin: 30
        })
        multiRoute.model.events.add('requestsuccess', function() {
        })
        myMap.geoObjects.add(multiRoute)
    },
    mapInitialized(e){
      myMap = e
      this.newRoute()
    },
    booking(){
      this.$store.dispatch('addBooking', {...this.request, ref: router.currentRoute.value.params.id ? 'route' + router.currentRoute.value.params.id : 'myroute?id=' + this.routeRef})
      this.request = {}
    },
    routeSave(){
       this.$store.dispatch('routeSave', {info: {...this.route, ref: this.routeRef}, picture: this.$refs.file.files[0]})
       this.route = {}
    },
    setPopup(){
      this.$store.commit('setPopup', 'routeSave')
    },
    addRoutePicture(){
      const file = this.$refs.file.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        this.picture = reader.result
      }
      reader.readAsDataURL(file)
    },
    setMapIsShowed() {
      this.mapIsShowed = !this.mapIsShowed
    }
  },
  created() {
    const ids = this.$route.query.id
    if(ids) {
      this.$store.dispatch("getRoute", ids)
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding: 0 10% 2% 10%;
  &-no-header {
    padding-top: 2%;
  }
  &-mobile {
    padding: 0;
  }
}

.map {
  height: 250px;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.ymap-container {
  width: 100%;
  height: 100%;
}
.booking-form {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-evenly;
  background: linear-gradient(-45deg, #ffe3da, #ffcfe1, #bcedff, #c7fff2);
	background-size: 400% 400%;
	animation: gradient 15s ease infinite;
  padding: 30px 20px;
  &-mobile {
    flex-direction: column
  }
}
.form {
  @include grid-g20;
  margin: 20px 0;
}
.form__picture {
  height: 200px;
  width: 300px;
  border-radius: 5px;
  object-fit: cover;
}
.form__input-picture {
  display: none;
}
.form__input {
  @include input;
  box-sizing: border-box;
  width: 100%;
}
.form__textarea {
  @include input;
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  height: 100px;
  resize: vertical;
}
.form__date {
  width: 100%;
}
.form__header {
  font-weight: 500;
  font-size: 1.3em;
  color:#1d3452;
}
.form__button {
  margin: 15px;
}
.form__button-share {
  display: flex;
  align-items: center;
  gap: 20px;
}
@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
.map__picture {
  width: 100%;
  height: 100%;
  filter: blur(2px) grayscale(0.6);
  object-fit: cover;
}
.map__button {
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, 90%)
}
</style>