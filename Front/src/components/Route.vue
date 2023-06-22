<template>
  <div :class="{'page': !isDesktop}">
    <div class="item" :class="{'item-mobile': !isDesktop}" :style="`background-image: url(${$baseUrl}/img/${currentRouteInfo.picture})`">
      <div class="item__card" :class="{'item__card-mobile': !isDesktop}">
        <div class="card__name">
          {{currentRouteInfo.name}}
          <div class="card__name-buttons">
            <ButtonHeart :routeId="currentRouteInfo.id"/>
            <img v-if="isAdmin || isRouteAuthor" :src="`${$baseUrl}/icons/pensil.svg`" class="item__button item__button-edit" @click="editRoute">
            <img v-if="isAdmin" :src="`${$baseUrl}/icons/close-btn.png`" class="item__button" @click="deleteRoute">
          </div>
        </div>
        <div class="card__description">{{currentRouteInfo.description}}</div>
        <div class="card__footer">
          <div class="card__info">
            <div v-if="currentRouteInfo.way" class="card__info-persons"><img :src="`${$baseUrl}/icons/${currentIcon(currentRouteInfo.way)}.svg`">{{currentRouteInfo.way}}</div>
            <div class="card__info-persons"><img :src="`${$baseUrl}/icons/person.svg`" alt="Человек">{{currentRouteInfo.persons}}</div>
            <div>{{currentTime}}</div>
            <div v-if="currentRouteInfo.price">{{currentRouteInfo.price}} &#8381;</div>
            <Avatar
              :userName="currentRouteInfo.userName"
              :userImg="`${$baseUrl}/avatars/`+ currentRouteInfo.avatar"
              :isSmall="true"
            />
            <div
              v-if="bookings.length"
              class="card__info-bookings"
            >
              Едут:
              <div 
                v-for="booking in bookings"
                :key="booking.id"
                class="card__info-booking"
              >
                <Avatar
                  :userName="booking.name"
                  :userImg="`${$baseUrl}/avatars/`+ booking.avatar"
                  :isSmall="true"
                />
                <div v-if="booking.persons-1">+{{ booking.persons-1 }}</div>
              </div>
            </div>
          </div>
          <Hits :hits="currentRouteInfo.hits" color="white"/>
        </div>
      </div>
    </div>
    <MyRoute :routeInfo="currentRouteInfo"/>
  </div>
</template>

<script>
import {router, routeNames} from '../router'
import ButtonHeart from './CustomComponents/ButtonHeart.vue'
import Hits from './CustomComponents/Hits.vue'
import MyRoute from './MyRoute.vue'
import Avatar from './CustomComponents/Avatar.vue'
import { numWord } from '../services/numerals.service'

export default {
  components: {
    ButtonHeart,
    MyRoute,
    Hits,
    Avatar,
  },
  computed: {
    currentRoute() {
      return router.currentRoute.value.params.id
    },
    isAdmin() {
      return this.$store.state.userModule.user.role === "admin"
    },
    isRouteAuthor() {
      return this.$store.state.userModule.user.id === this.currentRouteInfo.user
    },
    currentRouteInfo() {
      return this.$store.state.placesModule.routeInfo
    },
    isDesktop(){
    return this.$store.state.appModule.isDesktop
    },
    bookings(){
    return this.$store.state.placesModule.booking
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
  methods: {
    deleteRoute() {
      this.$store.dispatch("deleteRoute", this.currentRouteInfo.id)
      router.push({ name: routeNames.places })
    },
    editRoute () {
      this.$store.commit('setPopup', 'routeSave')
    },
      currentIcon(iconName) {
      switch (iconName) {
        case 'Авто':
          return 'car'
        case 'Поход':
          return 'backpack'
        default:
          return 'walk'
      }
    },
  },
  async created(){
    await this.$store.dispatch("getGuideRoute", this.currentRoute)
    this.$store.dispatch("getRoute", this.currentRouteInfo.ref)
    this.$store.dispatch('getBooking', { ref: `route${this.currentRouteInfo.id}`, bookDate: this.currentRouteInfo.date })
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding: 0;
  width: 100%;
}

.item {
  position: relative;
  background-size: cover;
  background-position: center;
  color: white;
  border-radius: 20px 20px 0 0;
  box-shadow: 2px 2px 15px 4px rgba(0, 0, 0, 0.2);
  filter: brightness(0.9);
  &-mobile {
    margin: 0;
    border-radius: 0;
  }
}

.item__card {
  background: linear-gradient(to right bottom, transparent, rgba(0, 0, 0, 0.8));
  padding: 20px;
  border-radius: 20px 20px 0 0;
  text-align: start;
  &-mobile {
    border-radius: 0;
  }
}

.card__name{
  display: grid;
  grid-template-columns: 1fr 30px;
  gap: 10px;
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

.card__footer {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  font-size: 1.5em;
  align-items: flex-end;
}

.card__info {
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
  font-size: 18px;

  &-bookings {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &-booking {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 16px;
  }
}

.card__info-persons {
  display: flex;
  gap: 5px;
  align-items: center;
}

.item__button{
  width: 20px;
  height: 20px;
  cursor: pointer;
  filter: contrast(3);
  
  &-edit {
    filter: invert(1);
  }
}

.card__name-buttons {
  display: grid;
  gap: 10px;
  justify-items: center;
}
</style>
