<template>
  <div v-if="currentPlace" class="description-page" :class="{'description-page-mobile': !isDesktop}">
    <Gallery/>  
    <SavePanel/>
    <p class="description-text">
      {{currentPlace.description}}
    </p>
    <div class="input-rewiew">
      <textarea 
        class="input-rewiew__input"
        type="text"
        placeholder="Ваш отзыв"
        v-model="inputValue"
      />
      <div class="input-rewiew__buttons" :class="{'input-rewiew__buttons-mobile': !isDesktop}">
        <div class="raiting">Ваша оценка
          <img
            v-for='star in 5' :key="'star'+star"
            :src="`${$baseUrl}/icons/star.svg`"
            alt="star"
            class="icon-star"
            :class="{'icon-star--hovered': star <= starHovered}"
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
      return this.$store.state.placesModule.place
    },
    currentReviews() {
      return this.$store.state.placesModule.reviews
    },
    currentPictures() {
      return this.$store.state.placesModule.pictures
    },
    isAdmin() {
      return this.$store.state.userModule.user.name === "Admin"
    },
    isDesktop(){
      return this.$store.state.appModule.isDesktop
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
  padding: 20px 380px 20px 40px;
}

.description-page-mobile {
  padding: 3%;
}

.description-text {
  margin: 20px 0;
  font-size: 1.2em;
  text-align: justify;
  font-weight: 300;
  text-indent: 40px;
  user-select: text;
}

.input-rewiew {
  display: grid;
  background-color:rgb(249, 249, 249);
  border-radius: 5px;
  border: solid rgb(240, 240, 240) 1px;
}

.input-rewiew__input {
  @include input;
  box-sizing: border-box;
  border-radius: 5px 0 0 0;
  height: 60px;
  padding: 15px;
  width: 100%;
  height: 100px;
  resize: vertical;
  };

.icon-star {
  height: 23px;
  padding-left: 8px;
  filter: grayscale(1) brightness(1.7);
  &--hovered {
    filter:grayscale(0);
  }
}

.raiting {
  display: flex;
  font-size: 0.9em;
  font-weight: 300;
  align-items: center;
  margin-left: 15px;
}

.input-rewiew__buttons {
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
