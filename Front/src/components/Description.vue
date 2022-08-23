<template>
  <div class="description-page" v-if="currentPlace">
    <Gallery
      :images="currentPictures"
      v-if="currentPictures.length"
    />  
    <SavePanel
      :hide="false"
    />  
  <div class="description-text">
    {{currentPlace.description}}
    {{currentPlace.id}}
  </div>
    <div class="input-rewiew">
      <textarea 
        class="input-rewiew__input"
        type="text"
        placeholder="Введите отзыв"
        v-model="inputValue"
        v-on:keydown.ctrl.enter="saveRewiew"
      />
      <MyButton
        title="Отправить отзыв"
        :noLeftRadius="true"
        @click="saveRewiew"
      />
    </div>
    <div class="rewiew-rating">Ваша оценка:
      <img
        v-for='star in 5' :key="'star'+star"
        src="http://localhost:3000/icons/star.png"
        alt="star"
        class="icon-star"
        :class="{'icon-star--hovered': star <= starHovered}"
        @click="onStarHover(star)"
      >
    </div>
  <ReviewMessages
  :horizontal="true"
  />
</div>
</template>

<script>
import {router} from '../router'
import MyButton from './CustomComponents/MyButton.vue'
import ReviewMessages from './CustomComponents/ReviewMessages.vue'
import SavePanel from './CustomComponents/SavePanel.vue'
import Gallery from './CustomComponents/Gallery.vue'

export default {
  components: {
    MyButton,
    Gallery,
    SavePanel,
    ReviewMessages,
  },
  data() {
    return {
      inputValue: '',
      starHovered: '',
    }
  },
  computed: {
    currentRoute() {
      return router.currentRoute.value.params.eng
    },
    currentPlace() {
      return this.$store.state.place
    },
    currentReviews() {
      return this.$store.state.reviews
    },
    currentPictures() {
      return this.$store.state.pictures
    },
  },
  methods: {
    onStarHover(star) {
      this.starHovered = star;
    },
    async saveRewiew(){
      if (this.inputValue !== '' && this.starHovered !== ''){
        if (await this.$store.dispatch('newReview', {'text':this.inputValue, 'raiting':this.starHovered})) {
          await this.$store.dispatch("getReviews", this.currentPlace.id)
          this.starHovered = this.inputValue = ''} else {
            alert('Для отправки комментария авторизуйтесь')
          }
        }
    },
  },
  async created(){
    await this.$store.dispatch("getPlace", this.currentRoute)
    this.$store.dispatch("getPictures", this.currentRoute)
    this.$store.dispatch("getReviews", this.currentPlace.id)
  },
}
</script>

<style scoped lang="scss">

.description-page {
  padding: 2% 200px 2% 2%;
}

.description-text {
  margin: 20px 0;
  text-align: start;
  font-size: 20px;
  font-weight: 300;
}

.input-rewiew {
  display: flex;
  width: 100%;
  margin-top: 20px;
}

.input-rewiew__input {
  @include input;
  border-radius: 5px 0 0 5px;
  height: 60px;
  padding: 15px;
  width: 100%;
  font-family: 'Roboto', Arial, sans-serif;
  font-size: 16px;
  font-weight: 300;
  };

.icon-star {
  height: 25px;
  padding: 2px;
  filter:grayscale(1);

  &--hovered {
    filter:grayscale(0);
  }
}

.rewiew-rating {
  display: flex;
  line-height: 30px;
  margin-top: 10px;
  font-size: 16px;
}
</style>
