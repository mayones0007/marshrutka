<template>
  <div class="description-page" :class="{'description-page-mobile': !isDesktop}" v-if="currentPlace">
    <Gallery
      :images="currentPictures"
      :vertical="!isDesktop"
    />  
    <SavePanel/>
    <div class="description-text">
      {{currentPlace.description}}
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
        :src="`${$baseUrl}/icons/star.png`"
        alt="star"
        class="icon-star"
        :class="{'icon-star--hovered': star <= starHovered}"
        @click="onStarHover(star)"
      >
    </div>
    <ReviewMessages
      :reviews="currentReviews"
      :horizontal="!isDesktop"
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
    isDesktop(){
      return this.$store.state.isDesktop
    },
    currentRaiting() {
      return Math.round(this.$store.state.reviews.reduce((acc, num) => acc + num.raiting,0)/this.$store.state.reviews.length)
    },
  },
  methods: {
    onStarHover(star) {
      this.starHovered = star;
    },
    async saveRewiew(){
      if (this.inputValue !== '' && this.starHovered !== ''){
        await this.$store.dispatch('newReview', {'text':this.inputValue, 'raiting':this.starHovered})
        await this.$store.dispatch("getReviews", this.currentPlace.id)
        this.starHovered = this.inputValue = ''
      }
    },
  },
  async created(){
    await this.$store.dispatch("getPlace", this.currentRoute)
    await this.$store.dispatch("getPictures", this.currentRoute)
    await this.$store.dispatch("getReviews", this.currentPlace.id)
  },
}
</script>

<style scoped lang="scss">
.save-panel__info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 30px;
  background-color: rgb(241, 241, 241);
  border-radius: 0 0 20px 20px;
}

.description-page {
  padding: 3% 220px 3% 3%;
}

.description-page-mobile {
  padding: 3%;
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

.raiting {
  display: flex;
}
.save-panel__difficalty {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
}

.difficalty {
  color: rgb(215, 0, 0);
}

.availability {
  text-align: end;
} 

.save-panel__availability {
  display: flex;
  align-items: center;
  gap: 5px;
}

.raiting__star {
  height: 19px;
  margin-right: 4px;
}
</style>
