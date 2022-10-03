<template>
  <div>
    <Title
      :text="`Отзывы: ${reviews.length}`"
    />
    <div class="rewiew-messages">
      <div class="rewiew-message" v-for='review in reviews' :key="review">
        <Avatar
          :userName="review.name"
          :userImg="`${$baseUrl}/avatars/`+ review.avatar"
        />
        <div class="review-date"  :class="{'review-date-horizontal': horizontal}">
          {{review.createdAt}}
          <div>
            <img
              v-for='star in review.raiting' :key="'star'+star"
              :src="`${$baseUrl}/icons/star.png`"
              alt="star"
              class="icon-star"
            >
          </div>
        </div>
        <div class="rewiew-text" :class="{'rewiew-text-horizontal': horizontal}" >{{review.text}}</div>
        <div v-if="isAdmin" class="gallery-window__button-close" @click="deleteReview(review.id)"/>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar.vue'
import Title from './Title.vue'
export default {
  name: 'ReviewMessages',
  props: ['reviews','horizontal','isAdmin'],
  components: {
    Avatar,
    Title
  },
  computed: {
    currentPlace() {
      return this.$store.state.place
    },
  },
  methods: {
    async deleteReview(id) {
      await this.$store.dispatch("deleteReview", id)
      await this.$store.dispatch("getReviews", this.currentPlace.id)
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
  font-size: 16px;
  padding: 15px;
  background-color:aliceblue;
  border-radius: 20px 20px 20px 0;
  border: solid rgb(240, 240, 240) 1px;
}

.rewiew-text {
  grid-row: 1 / span 2;
  grid-column: 2;
  white-space: pre-line;
  text-align: start;
  padding: 20px;
  border-radius: 15px 15px 15px 0;
  border: solid rgb(240, 240, 240) 1px;
  background-color: rgb(255, 255, 255);
  height: 100%;
  box-sizing: border-box;
  justify-items: stretch;
}
.rewiew-text-horizontal {
  grid-column: 1 / span 2;
  grid-row: 2;
}

.review-date {
  font-size: 14px;
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
  background: url("https://marshrutka.su/api/icons/close-btn.png") center/100%;
  width: 20px;
  height: 20px;
  right: 25px;
  top: 25px;
  cursor: pointer;
}
</style>