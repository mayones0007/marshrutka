<template>
  <div class="page" :class="{'page-mobile': !isDesktop}">
    <table class="table">
      <tr>
        <th v-for="field in this.bookingFields" :key="field.fieldName">{{field.name}}</th>
      </tr>
      <tr v-for="booking in currentBookings" :key="booking.id">
        <td v-for="field in this.bookingFields" :key="field.fieldName">
          <div v-if="field.fieldName === 'date'">{{prepareDate(booking.date)}}</div>
          <div v-else>{{booking[field.fieldName]}}</div>
        </td>
        <div class="table__buttons">
          <router-link :to="booking.ref">Смотреть маршрут</router-link>
          <MyButton :isRed="booking.guideId === this.user.id" :title="buttonTitle(booking.guideId)" @click="setBooking(booking.id)"/>
        </div>
      </tr>
    </table>
  </div>
</template>

<script>
import { bookingFields } from '../data/booking.fields'
import MyButton from './CustomComponents/MyButton.vue'
import moment from 'moment'

export default {
  components:{
    MyButton,
  },
  data: () => ({
    bookingFields
  }),
  computed: {
    currentBookings() {
      return this.$store.state.placesModule.booking
    },
    user() {
      return this.$store.state.userModule.user
    },
    isDesktop(){
      return this.$store.state.appModule.isDesktop
    },
  },
  methods: {
    prepareDate(date) {
      return moment(date).locale('ru').format('ll')
    },
    buttonTitle(guideId){
      return guideId !== this.user.id ? "Взять заявку" : "Отказаться"
    },
    setBooking(id){
      this.$store.dispatch("setBooking", id)
    }
  },
  created(){
    this.$store.dispatch("getAllBooking")
  },
}
</script>

<style lang="scss" scoped>
.page {
  padding: 3% 20%;
  &-mobile {
    padding: 3%;
  }
}
.table{
  width: 100%;
}
.table__buttons {
  display: grid;
  align-items: center;
  gap: 20px;
  grid-template-columns: 145px 120px;
}
</style>
