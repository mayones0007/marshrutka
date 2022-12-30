<template>
  <div v-if="currentPlace" class="page" :class="{'page-mobile': !isDesktop}">
    <div>
      <Gallery :pictures="this.currentPictures"/>  
      <SavePanel v-if="!isDesktop"/>
      <p class="description-text">
        {{currentPlace.description}}
      </p>
      <div class="review">
        <textarea 
          class="review__input"
          type="text"
          placeholder="Ваш отзыв"
          v-model="inputValue"
        />
        <div class="review__buttons" :class="{'review__buttons-mobile': !isDesktop}">
          <div class="raiting">Ваша оценка
            <img
              v-for='star in 5' :key="'star'+star"
              :src="`${$baseUrl}/icons/star.svg`"
              alt="star"
              class="review__buttons-star"
              :class="{'review__buttons-star--hovered': star <= starHovered}"
              @click="onStarHover(star)"
            >
          </div>
          <MyButton
            title="Отправить отзыв"
            :isDisabled="!this.inputValue || !this.starHovered"
            :icon="'send.svg'"
            @click="saveRewiew"
          />
        </div>
      </div>
      <ReviewMessages/>
    </div>
    <SavePanel v-if="isDesktop"/>
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
      return router.currentRoute.value.params.id
    },
    currentPlace() {
      return this.$store.state.placesModule.place
    },
    currentReviews() {
      return this.$store.state.placesModule.reviews
    },
    currentPictures() {
      return this.$store.state.placesModule.pictures
    },
    isDesktop(){
      return this.$store.state.appModule.isDesktop
    },
  },
  methods: {
    onStarHover(star) {
      this.starHovered = star
    },
    saveRewiew(){
      this.$store.dispatch('newReview', {'text':this.inputValue, 'raiting':this.starHovered})
      this.starHovered = this.inputValue = ''
    },
  },
  created(){
    this.$store.dispatch("getPlace", this.currentRoute)
  },
}
</script>

<style scoped lang="scss">

.page {
  display: grid;
  grid-template-columns: 1fr 350px;
  align-items: start;
  gap: 20px;
  &-mobile {
    padding-top: 0;
    grid-template-columns: 1fr;
  }
}

.description-text {
  margin: 20px 0;
  font-size: 1.2em;
  text-align: justify;
  font-weight: 300;
  user-select: text;
  white-space: pre-line;
}

.review {
  display: grid;
  background-color:rgb(249, 249, 249);
  border-radius: 5px;
  border: solid rgb(240, 240, 240) 1px;
  margin-bottom: 15px;
}

.review__input {
  @include input;
  box-sizing: border-box;
  border-radius: 5px 5px 0 0;
  height: 60px;
  padding: 15px;
  width: 100%;
  height: 100px;
  resize: vertical;
  };

.review__buttons-star {
  height: 23px;
  padding-left: 8px;
  filter: grayscale(1) brightness(1.7);
  &--hovered {
    filter: grayscale(0);
  }
}

.raiting {
  display: flex;
  font-size: 0.9em;
  font-weight: 300;
  align-items: center;
  margin-left: 15px;
}

.review__buttons {
  display: flex;
  gap: 15px;
  justify-content: space-between;
  padding: 15px 15px 15px 0;
  &-mobile {
    flex-direction: column;
    padding: 15px 0px 0 0px;
  }
}
</style>
