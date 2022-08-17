<template>
<div class="app-container">
  <div class="description-page" v-if="currentPlace">
      <div v-if="currentPictures.length" class="gallery__container">
        <img v-for='picture in 3' :key="picture" 
          :src="`http://localhost:3000/img/${currentPictures[picture-1]}`" 
          class="gallery__item" 
          @click="openGalleryPopup(picture-1)">
        <div class="gallery__item-last" @click="openGalleryPopup(3)">
          <img
            :src="`http://localhost:3000/img/${currentPictures[3]}`" 
            class="gallery__item image-gallery__item" 
          >
          <div class="gallery__item-last-text">+{{currentPictures.length-4}}</div>
        </div>
      </div>
    <div class="save-panel">
      <div>Доступность: {{currentPlace.availability}}</div>
      <div :class="`save-panel__difficalty save-panel__difficalty--${currentPlace.difficulty}`">
        Сложность: {{currentPlace.difficulty}}
      </div>
      <div class="save-panel__time">Время:<br>{{currentPlace.time}}</div>
      <MyButton
        :title="isAddedInRouteTextButton"
        :isDisabled="isAddedInRoute"
        @click="addInMyRoute(currentPlace.eng)"
      />
      <img 
        :class="`save-panel__hert save-panel__hert--${isFavorite}`"
        src="http://localhost:3000/icons/heart.png"
        alt="heart"
        @click="addInMyFavorites(currentPlace.eng)"
      >
    </div>   
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
        class="icon-star" 
        :class="{'icon-star--hovered': star <= starHovered}" 
        @mouseover="onStarHover(star)"
        @mouseleave="onStarHover(null)"
        src="http://localhost:3000/icons/star.png" 
        alt="star"
      >
    </div>
  <Title
    :text="`Отзывы: ${currentReviews.length}`"
  />
  <div class="rewiew-messages">
    <div class="rewiew-message" v-for='note in currentReviews' :key="note">
      <Avatar
        :user="note.userName"
      />
      <div class="rewiew-text">{{note.text}}</div>
    </div>
  </div>
</div>
<Gallery
  v-if="showGallery"
  :images="currentPictures"
  :openedPicture="currentPicture"
/>
</div>
</template>

<script>
import {router} from '../router'
import MyButton from './CustomComponents/MyButton.vue'
import Avatar from './CustomComponents/Avatar.vue'
import Title from './CustomComponents/Title.vue'
import Gallery from './CustomComponents/Gallery.vue'

export default {
  components: {
    MyButton,
    Title,
    Avatar,
    Gallery,
  },
  data() {
    return {
      inputValue: '',
      starHovered: null,
    }
  },
  computed: {
    showGallery() {
      return this.$store.state.showGalleryPopup
    },
    currentRoute() {
      return router.currentRoute.value.params.eng
    },
    currentPlace() {
      return this.$store.state.place[0]
    },
    currentReviews() {
      return this.$store.state.reviews
    },
    currentPictures() {
      return this.$store.state.pictures
    },
    isFavorite(){
      return !!this.$store.state.myFavorites.find(el => el.eng === this.currentRoute)
    },
    isAddedInRoute(){
      return !!this.$store.state.myRoute.find(el => el.eng === this.currentRoute)
    },
    picturesCount() {
      return this.currentPlace.pictures - 4;
    },
    isAddedInRouteTextButton(){
      if (this.isAddedInRoute){
        return "Добавлено в маршрут"
      } else {
        return "Добавить в маршрут"
      }
    },
  },
  methods: {
    onStarHover(star) {
      this.starHovered = star;
    },
    async saveRewiew(){
      if (this.inputValue !== ''){
        await this.$store.dispatch('newReview', this.inputValue)
        await this.$store.dispatch("getReviews", this.currentRoute)
        this.inputValue=''}
    },
    openGalleryPopup(i){
      this.currentPicture = i;
      this.$store.commit('setGalleryPopup', true);
    },
    async addInMyRoute(placeName){
      await this.$store.dispatch('newPointInRoute', placeName)
      await this.$store.dispatch("getRoute")
    },
    async addInMyFavorites(placeName){
      await this.$store.dispatch('newFavorite', placeName)
      await this.$store.dispatch("getFavorites")
    },
  },
  created(){
    this.$store.dispatch("getPlace", this.currentRoute)
    this.$store.dispatch("getReviews", this.currentRoute)
    this.$store.dispatch("getPictures", this.currentRoute)
    this.$store.dispatch("getFavorites")
    this.$store.dispatch("getRoute")
  },
}
</script>

<style scoped lang="scss">
.description-page {
  padding: 20px 190px 20px 80px;
}

.gallery__container {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 3fr 1fr;
  gap: 10px;
}

.gallery__item {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;

  &:hover {
    filter:brightness(0.9);
  }

  &:first-child {
    grid-row: 1 / span 3;

    &:hover {
      filter:none;
    }
  }
}

.gallery__item-last {
  position: relative;
  cursor: pointer;
  &:hover .image-gallery__item{
    filter:brightness(0.3);
  }
}

.image-gallery__item {
  filter:brightness(0.4);
}

.gallery__item-last-text {
  position: absolute;
  top: 50%;
  width: 100%;
  color: white;
  font-weight: 500;
  font-size: 40px;
  line-height: 0;
  text-align: center;
}

.save-panel {
  @include grid-g20;
  padding: 20px;
  border-radius: 20px 0 0 20px;
  position: fixed;
  top: 100px;
  right: 0px;
  width: 125px;
  background-color: rgb(241, 241, 241);
}

.save-panel__hert {
  width: 20px;
  border: solid red 1px;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  margin: auto;
  filter: grayscale(1);
}

.save-panel__hert--true{
  filter: grayscale(0);
}


.save-panel__difficalty {
  padding: 20px;
  color: white;
  border-radius: 5px;
  box-shadow: inset 0px 0px 5px rgba(193, 193, 193, 0.691);
  font-size: 15px;
}

.save-panel__difficalty--hard {
  background-color: rgb(242, 97, 0);
}

.save-panel__difficalty--medium {
  background-color: rgb(242, 202, 0);
}

.save-panel__difficalty--light {
  background-color: rgb(63, 180, 0);
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
  margin: 20px 0;
}

.input-rewiew__input {
  @include input;
  height: 50px;
  padding: 15px;
  width: 100%;
  };

.rewiew-count {
  text-align: start;
  font-weight: 500;
  font-size: 18px;
  margin: 20px 0;
}

.rewiew-messages {
  display: flex;
  flex-direction: column-reverse;
  gap: 20px;
}

.rewiew-message {
  @include grid-g20;
  grid-template-columns: 150px 1fr;
  text-align: start;
  align-items: start;
  font-weight: 100;
  font-size: 16px;
  padding: 20px;
  background-color:aliceblue;
  border-radius: 20px 20px 20px 0;
}

.rewiew-text {
  white-space: pre-line;
  padding-left: 20px;
  border-left: solid rgb(140, 140, 140) 2px;
}

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
}
</style>
