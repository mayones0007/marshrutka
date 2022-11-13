<template>
  <div>
    <div class="item" :class="{'item-mobile': !isDesktop}" :style="`background-image: url(${$baseUrl}/img/${currentRouteInfo.picture})`">
      <div class="item__card" :class="{'item__card-mobile': !isDesktop}">
        <div class="card__name">{{currentRouteInfo.name}}</div>
        <div class="card__description">{{currentRouteInfo.description}}</div>
        <div class="card__footer">
          <div class="card__info">
            <div>{{currentTime}}</div>
            <div class="card__info-persons">{{currentRouteInfo.persons}}<img :src="`${$baseUrl}/icons/person.svg`" alt="Человек"></div>
            <div v-if="currentRouteInfo.price">{{currentRouteInfo.price}} &#8381;</div>
          </div>
          <Hits :hits="currentRouteInfo.hits" color="white"/>
        </div>
      </div>
      <ButtonHeart :routeId="currentRouteInfo.id" class="item__button-heart"/>
    </div>
    <MyRoute :description="true"/>
  </div>
</template>

<script>
import {router} from '../router'
import ButtonHeart from './CustomComponents/ButtonHeart.vue'
import Hits from './CustomComponents/Hits.vue'
import MyRoute from './MyRoute.vue'
import { numWord } from '../services/numerals.service'

export default {
  components: {
    ButtonHeart,
    MyRoute,
    Hits
  },
  computed: {
    currentRoute() {
      return router.currentRoute.value.params.id
    },
    currentRouteInfo() {
      return this.$store.state.placesModule.routeInfo
    },
    isDesktop(){
    return this.$store.state.appModule.isDesktop
    },
    currentTime() {
      const time = this.currentRouteInfo.time
      if (time < 1) {
        return numWord(60 * time, ['минута', 'минуты', 'минут'])
      } else if (time >= 24) {
        return numWord(time / 24, ['день', 'дня', 'дней'])
      }
      return numWord(time, ['час', 'часа', 'часов'])
    },
  },
  async created(){
    await this.$store.dispatch("getGuideRoute", this.currentRoute)
    this.$store.dispatch("getRoute", this.currentRouteInfo.ref)
  }
}
</script>

<style lang="scss" scoped>
.item {
  position: relative;
  background-size: cover;
  background-position: center;
  color: white;
  border-radius: 20px 20px 0 0;
  margin: 2% 10% 0 10%;
  box-shadow: 2px 2px 15px 4px rgba(0, 0, 0, 0.2);
  &-mobile {
    margin: 0;
    border-radius: 0;
  }
}
.item__button-heart {
  position: absolute;
  top: 25px;
  right: 25px;
}
.item__card {
  background: linear-gradient(to left bottom, transparent, rgb(0, 0, 0));
  padding: 20px;
  border-radius: 20px 20px 0 0;
  text-align: start;
  &-mobile {
    border-radius: 0;
  }
}

.card__name{
  font-size: 3em;
  font-weight: 500;
  margin-bottom: 100px;
}

.card__description{
  font-size: 1.2em;
  font-weight: 300;
  margin-bottom: 60px;
  white-space: pre-line;
  display: -webkit-box;
  -webkit-line-clamp: 12;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  text-align: justify;
  overflow: hidden;
  line-height: 120%;
}

.card__footer{
  display: flex;
  justify-content: space-between;
  gap: 20px;
  font-size: 1.5em;
  align-items: center;
}

.card__info{
  display: flex;
  gap: 15px;
  align-items: center;
}

.card__info-persons {
  display: flex;
  gap: 5px;
  align-items: center;
}
</style>
