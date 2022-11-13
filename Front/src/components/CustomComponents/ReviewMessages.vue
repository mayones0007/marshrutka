<template>
  <div>
    <h2>{{titleText}}</h2>
    <div class="rewiew-messages">
      <div class="rewiew-message" v-for='review in currentReviews' :key="review">
        <Avatar
          :userName="review.name"
          :userImg="`${$baseUrl}/avatars/`+ review.avatar"
        />
        <div class="review-date"  :class="{'review-date-horizontal': horizontal}">
          {{prepareDate(review.createdAt)}}
          <div>
            <img
              v-for='star in review.raiting' :key="'star'+star"
              :src="`${$baseUrl}/icons/star.svg`"
              alt="star"
              class="icon-star"
            >
          </div>
        </div>
        <div class="rewiew-text" :class="{'rewiew-text-horizontal': !isDesktop}" >{{review.text}}</div>
        <img v-if="isAdmin" :src="`${$baseUrl}/icons/close-btn.png`" class="gallery-window__button-close" @click="deleteReview(review.id)">
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar.vue'
import { numWord } from '../../services/numerals.service'
import moment from 'moment'
export default {
  props: ['horizontal'],
  components: {
    Avatar,
  },
  computed: {
    currentPlace() {
      return this.$store.state.placesModule.place
    },
    currentReviews() {
      return this.$store.state.placesModule.reviews
    },
    isAdmin() {
      return this.$store.state.userModule.user.role === "admin"
    },
    isDesktop(){
      return this.$store.state.appModule.isDesktop
    },
    titleText () {
      if (this.currentReviews.length === 0) {
        return "Оставьте первый отзыв"
      } else {
        return numWord(this.currentReviews.length, ['отзыв', 'отзыва', 'отзывов'])
      }
    },
  },
  methods: {
    deleteReview(id) {
      this.$store.dispatch("deleteReview", id)
    },
    prepareDate(date) {
      return moment(date).locale('ru').format('lll')
    }
  }
}
</script>

<style lang='scss' scoped>
.rewiew-messages {
  display: flex;
  flex-direction: column-reverse;
  gap: 20px;
}

.rewiew-message {
  @include grid-g20;
  position: relative;
  gap: 10px;
  grid-template-columns: 150px 1fr;
  grid-template-rows: 50px 1fr;
  text-align: start;
  font-weight: 100;
  padding: 10px 10px 10px 15px;
  background-color:aliceblue;
  border-radius: 5px;
  border: solid rgb(240, 240, 240) 1px;
}

.rewiew-text {
  grid-row: 1 / span 2;
  grid-column: 2;
  white-space: pre-line;
  text-align: start;
  padding: 10px;
  border-radius: 5px;
  border: solid rgb(240, 240, 240) 1px;
  background-color: rgb(255, 255, 255);
  height: 100%;
  box-sizing: border-box;
  user-select: text;
}
.rewiew-text-horizontal {
  grid-column: 1 / span 2;
  grid-row: 2;
}

.review-date {
  font-size: 0.9em;
  line-height: 30px;
}

.review-date-horizontal {
  align-self: center;
}

.icon-star {
  height: 15px;
  margin-right: 4px;
}

.icon-stars {
  margin: auto 0;  
}

.gallery-window__button-close{
  position: absolute;
  width: 20px;
  height: 20px;
  right: 25px;
  top: 25px;
  cursor: pointer;
}
</style>