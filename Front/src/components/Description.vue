<template>
  <div class="description-page" :class="{'description-page-mobile': !isDesktop}" v-if="currentPlace">
    <Gallery/>  
    <SavePanel/>
    <p class="description-text">
      {{currentPlace.description}}
    </p>
      <div class="input-rewiew" :class="{'input-rewiew-mobile': !isDesktop}">
        <div class="input-rewiew-text">
          <textarea 
            class="input-rewiew__input"
            type="text"
            placeholder="Ваш отзыв"
            v-model="inputValue"
            v-on:keydown.ctrl.enter="saveRewiew"
          />
          <div class="raiting">Ваша оценка:
            <img
              v-for='star in 5' :key="'star'+star"
              :src="`${$baseUrl}/icons/star.svg`"
              alt="star"
              class="icon-star"
              :class="{'icon-star--hovered': star <= starHovered}"
              @click="onStarHover(star)"
            >
          </div>
        </div>
      <MyButton
        title="Отправить отзыв"
        :noLeftRadius="isDesktop"
        :isDisabled="!this.inputValue || !this.starHovered"
        @click="saveRewiew"
      />
    </div>
    <ReviewMessages/>
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
    isAdmin() {
      return this.$store.state.user.name === "Admin"
    },
    isDesktop(){
      return this.$store.state.isDesktop
    },
  },
  methods: {
    onStarHover(star) {
      this.starHovered = star;
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

.description-page {
  padding: 2% 320px 2% 2%;
}

.description-page-mobile {
  padding: 2%;
}

.description-text {
  margin: 20px 0;
  font-size: 1.2em;
  text-align: justify;
  font-weight: 300;
  text-indent: 40px;
}

.input-rewiew {
  display: flex;
  background-color:rgb(249, 249, 249);
  border-radius: 5px;
  border: solid rgb(240, 240, 240) 1px;
}

.input-rewiew-mobile {
  flex-direction: column;
}

.input-rewiew__input {
  @include input;
  box-sizing: border-box;
  border-radius: 5px 0 0 0;
  height: 60px;
  padding: 15px;
  width: 100%;
  height: 100px;
  font-weight: 300;
  font-size: 0.9em;
  font-family: 'Roboto', Arial, sans-serif;
  resize: vertical;
  };

.icon-star {
  height: 23px;
  padding-left: 8px;
  filter:grayscale(1);
  &--hovered {
    filter:grayscale(0);
  }
}

.raiting {
  display: flex;
  font-size: 0.9em;
  font-weight: 300;
  align-items: center;
  padding: 10px 15px;
}

.input-rewiew-text {
  width: 100%;
  display: grid;
}
</style>
