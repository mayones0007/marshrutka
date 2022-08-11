<template>
<div class="app-container">
  <div class="description-page" v-if="currentPlace">
    <div class="image-gallery">
      <div v-if="currentPictures.length" class="image-gallery__container">
        <img v-for='picture in 4' :key="picture" 
          :src="`http://localhost:3000/img/${currentPictures[picture-1]}`" 
          class="image-gallery__item" 
          @click="openGalleryPopup(picture-1)">
      </div>
      <div class="image-gallery__item--last-text">+{{currentPictures.length-4}}</div>
    </div>
    <div class="save-panel">
      <div>Доступность: {{currentPlace.availability}}</div>
      <div :class="`save-panel__difficalty save-panel__difficalty--${currentPlace.difficulty}`">Сложность: {{currentPlace.difficulty}}</div>
      <div class="save-panel__time">Время:<br>{{currentPlace.time}}</div>
      <MyButton
        :title="isAddedInRouteTextButton"
        :isDisabled="isAddedInRoute"
        @click="addInMyRoute(currentPlace.eng)"
      />
      <img :class="`save-panel__hert save-panel__hert--${isFavorite}`" src="http://localhost:3000/icons/heart.png" alt="heart" @click="addInMyFavorites(currentPlace.eng)">
    </div>   
  <div class="description-text">
    {{currentPlace.description}}
  </div>
    <div class="input-rewiew">
      <textarea class="input-rewiew__input" type="text" placeholder="Введите отзыв" v-model="inputValue" v-on:keydown.ctrl.enter="saveRewiew"></textarea>
      <MyButton
        title="Отправить отзыв"
        :noLeftRadius="true"
        @click="saveRewiew"
      />
    </div>
    <div class="rewiew-rating">Ваша оценка:
      <img v-for='star in 5' :key="'star'+star" class="icon-star" :class="{'icon-star--hovered': star <= starHovered}" @mouseover="onStarHover(star)" @mouseleave="onStarHover(null)" src="http://localhost:3000/icons/star.png" alt="star">
    </div>

  <div class="rewiew-count"> Отзывы: {{currentReviews.length}}</div>
  <div class="rewiew-messages">
    <div class="rewiew-message" v-for='note in currentReviews' :key="note">
      <div class="rewiew-user">
        <img class="rewiew-user__avatar" src="http://localhost:3000/icons/tourist.png" alt="avt">
        <label class="rewiew-user__name">{{note.userName}}</label>
      </div>
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
import Gallery from './CustomComponents/Gallery.vue'

export default {
  components: {
    MyButton,
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
  padding: 20px 240px 20px 80px;
}

.image-gallery {
  position: relative;
}

.image-gallery__container {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 3fr 1fr;
  gap: 10px;
}

.image-gallery__item {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;

  &:first-child {
    grid-row: 1 / span 3;

    &:hover {
      filter:none;
    }
  }

  &:last-child {
    filter:brightness(0.5);

    &:hover {
      filter:brightness(0.4);
    }
  }

  &:hover {
    filter:brightness(0.9);
  }
}

.image-gallery__item--last-text {
  position: absolute;
  top: 84%;
  right: -38%;
  color: white;
  font-weight: 500;
  font-size: 40px;
  line-height: 0;
  width: 100%;
  cursor: pointer;
}

.save-panel {
  display: grid;
  gap: 20px;
  align-items: center;
  position: fixed;
  top: 105px;
  right: 80px;
  width: 125px;
}

.save-panel__hert {
  width: 20px;
  border: solid red 1px;
  border-radius: 50%;
  padding: 8px;
  fill: white;
  cursor: pointer;
  margin: auto;
  filter: grayscale(1);
}

.save-panel__hert--true{
  filter: grayscale(0);
}


.save-panel__difficalty {
  padding: 20px;
  border: 0px;
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
  font-family: Museo Sans Cyrl,Arial,Helvetica Neue,sans-serif;
  font-size: 20px;
  font-weight: 300;
}

.input-rewiew {
  display: flex;
  width: 100%;
  margin: 20px 0;
}

.input-rewiew__input {
  height: 50px;
  padding: 15px;
  border-color: #e4e4e4;
  border: 2px;
  border-radius: 5px 0 0 5px;
  box-shadow: inset 0px 0px 5px rgba(193, 193, 193, 0.691);
  width: 90%;
  font-size: 15px;
  font-family: Museo Sans Cyrl,Arial,Helvetica Neue,sans-serif;
}

.input-rewiew__btn {
  border-radius: 0 5px 5px 0;
}

.rewiew-count {
  font-family: Museo Sans Cyrl,Arial,Helvetica Neue,sans-serif;
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
  display: grid;
  grid-template-columns: 150px 1fr;
  font-family: Museo Sans Cyrl,Arial,Helvetica Neue,sans-serif;
  text-align: start;
  font-weight: 100;
  font-size: 16px;
  padding: 20px;
  background-color:aliceblue;
  border-radius: 20px 20px 20px 0;
}

.rewiew-user {
  display: grid;
  grid-template-columns: 50px 1fr;
  border-right: solid rgb(140, 140, 140) 2px;
}

.rewiew-text {
  margin-left: 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  white-space: pre-line;
}

.gallery-window {
  position: fixed;
  display:flex;
  width: 70%;
  height: 80%;
  top: 10%;
  left: 15%;
}

.gallery-window__slider {
  width: 40%;
  z-index: 2;
  cursor: pointer;
}

.slider-btn-right {
  margin-left: -40%;
  background: linear-gradient(90deg,transparent,rgba(0, 0, 0, 0.1));
}

.slider-btn-left {
  margin-right: -40%;
  background: linear-gradient(-90deg,transparent,rgba(0, 0, 0, 0.1));
}

.slider-btn-icon{
  position: absolute;
  height: 20px;
  width: 20px;
  border-left: solid rgba(255, 255, 255, 0.7) 5px;
  border-top: solid rgba(255, 255, 255, 0.7) 5px;
  top: 48%;
}

.slider-btn:hover .slider-btn-icon{
  border-left: solid rgba(255, 255, 255, 0.9) 5px;
  border-top: solid rgba(255, 255, 255, 0.9) 5px;
}

.slider-btn-icon-left {
  left: 3%;
  transform: rotate(-45deg);
}

.slider-btn-icon-right {
  right: 3%;
  transform: rotate(135deg);

}

.slider-btn-right:hover {
  background: linear-gradient(90deg,transparent,rgba(0, 0, 0, 0.3));
}

.slider-btn-left:hover {
  background: linear-gradient(-90deg,transparent,rgba(0, 0, 0, 0.3));
}

.gallery-window__image {
  object-fit: cover;
  width: 100%;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
}

.gallery-window__close-button{
  position: absolute;
  background: url("http://localhost:3000/icons/close-btn.png") center/100%;
  width: 25px;
  height: 25px;
  right: 20px;
  top: 20px;
  cursor: pointer;
  z-index: 3;
}

.gallery-window__close-button:hover {
  filter: brightness(0.2);
}

.rewiew-user__avatar {
  height: 40px;
  border-radius: 50%;
  border: solid black 1px;
}

.rewiew-user__name {
  padding: 10px;

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
