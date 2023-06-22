<template>
  <div class="page">
    <h1>Бронирования</h1>
    <table v-if="isDesktop" class="table">
      <tr>
        <th v-for="field in this.bookingFields" :key="field.fieldName">{{field.name}}</th>
        <th class="control">Действия</th>
      </tr>
      <tr v-for="booking in currentBookings" :key="booking.id">
        <td v-for="field in this.bookingFields" :key="field.fieldName">
          <div v-if="field.fieldName === 'date'">{{prepareDate(booking.date)}}</div>
          <a v-else-if="field.fieldName === 'phone'" :href="`tel:${phone(booking)}`">{{phone(booking)}}</a>
          <div v-else>{{booking[field.fieldName]}}</div>
        </td>
        <td class="table__buttons">
          <router-link :to="booking.ref">Смотреть маршрут</router-link>
          <MyButton v-if="isGuide" :isRed="booking.guideId === this.user.id" :title="buttonTitle(booking.guideId)" @click="setBooking(booking.id)"/>
          <MyButton v-else :isRed="true" title="Отменить" @click="cancelBooking(booking.id)"/>
        </td>
      </tr>
    </table>
    <div v-else class="cards">
      <div v-for="booking in currentBookings" :key="booking.id" class="card">
        <div v-for="field in this.bookingFields" :key="field.fieldName" class="card__field">
          <div>{{field.name}}</div>
          <div v-if="field.fieldName === 'date'">{{prepareDate(booking.bookDate)}}</div>
          <a v-else-if="field.fieldName === 'phone'" :href="`tel:${phone(booking)}`">{{phone(booking)}}</a>
          <div v-else>{{booking[field.fieldName]}}</div>
        </div>
        <div class="card__buttons">
          <router-link :to="booking.ref">Смотреть маршрут</router-link>
          <MyButton v-if="isGuide" :isRed="booking.guideId === this.user.id" :title="buttonTitle(booking.guideId)" @click="setBooking(booking.id)"/>
          <MyButton v-else :isRed="true" title="Отменить" @click="cancelBooking(booking.id)"/>
        </div>
      </div>
    </div>
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
      return this.$store.state.placesModule.bookings
    },
    user() {
      return this.$store.state.userModule.user
    },
    isGuide() {
      return this.$store.state.userModule.user.role !== 'user'
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
    },
    cancelBooking(id){
      this.$store.dispatch("cancelBooking", { id })
    },
    phone(booking) {
      return this.isGuide ? booking.phone : booking.userPhone
    },
  },
  created(){
    this.$store.dispatch("getAllBooking")
  },
}
</script>

<style lang="scss" scoped>
.view-page {
  padding: 2%;
}
.page {
  width: 100%;
  align-self: flex-start;
}
.table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
}
tr:nth-child(even){background-color: #f2f2f2;}
tr:hover {background-color: #00c67d26;}
th {
  height: 40px;
  background-color: rgb(0, 180, 120);
  color: white;
}
.table__buttons {
  display: flex;
  align-items: center;
  gap: 35px;
  justify-content: flex-end;
}
.cards {
  display: grid;
  gap: 20px;
}
.card {
  display: grid;
  gap: 10px;
  padding: 15px;
  background: rgb(235, 246, 255);
  border: solid #ddd 1px;
  border-radius: 10px;

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.card__field {
  display: grid;
  grid-template-columns: 140px 1fr;
  text-align: start;
  padding-bottom: 5px;
  border-bottom: solid #ddd 1px;
}
</style>
