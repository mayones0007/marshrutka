<template>
<div class="favorite-page">
  <Title
    :text="titleText"
  />
  <div class="favirites-item" v-for='favorite in myFavorites' :key="favorite">
        <div class="gallery__item" @click="openModal(favorite.eng)">
          <div class="gallery__item-container">
            <img class="item__image" :src="`http://localhost:3000/img/`+favorite.eng+`.jpeg`" alt="avt">
            <div class="item__name">{{favorite.name}}</div>
          </div>
        </div>
          <div class="item__description">{{favorite.description}}</div>
        <div class="item__container-panel">
          <MyButton
            :title="isAddedInRouteTextButton(favorite)"
            :isDisabled="addToRouteButtonDisabled(favorite)"
            @click="addInMyRoute(favorite.eng)"
          />
          <img 
            class="save-panel__hert"
            src="http://localhost:3000/icons/heart.png"
            alt="heart"
            @click="removeInMyFavorites(favorite.eng)"
          >
        </div>
  </div>
</div>
</template>

<script>
import {router} from '../router'
import MyButton from './CustomComponents/MyButton.vue'
import Title from './CustomComponents/Title.vue'
export default {
  components: {
    MyButton,
    Title
  },
  computed: {
    myFavorites(){
      return this.$store.state.myFavorites
    },
    titleText() {
      if(this.myFavorites.length === 0){
        return "Пока здесь пусто"
      }
      return "Избранное: "+this.myFavorites.length
    }
  },
  methods: {
    async addInMyRoute(placeName){
      await this.$store.dispatch('newPointInRoute', placeName)
      await this.$store.dispatch("getRoute")
    },
    async removeInMyFavorites(favoriteName){
      await this.$store.dispatch('newFavorite',favoriteName)
      await this.$store.dispatch("getFavorites")
    },
    openModal(eng){
      router.push({name: "Description",params:{eng}})
    },
    addToRouteButtonDisabled(item) {
      return this.$store.state.myRoute.find(el => el.eng === item.eng)
    },
    isAddedInRouteTextButton(item){
      if (this.addToRouteButtonDisabled(item)){
        return "Добавлено в маршрут"
      } else {
        return "Добавить в маршрут"
      }
    },
  },
  created(){
    this.$store.dispatch("getFavorites")
    this.$store.dispatch("getRoute")
  },
}
</script>

<style scoped>
.favorite-page{
  padding: 20px 80px;
}


.favirites-item {
  text-align: start;
  font-weight: 100;
  font-size: 18px;
  margin: 20px 0;
  padding: 20px;
  border-radius: 20px;
  background-color:aliceblue;
  height: 200px;
  display: grid;
  grid-template-columns: 300px 1fr 100px;
  gap: 20px;
  border: solid 1px rgba(0, 0, 0, 0.076);
}

.save-panel__hert {
  width: 25px;
  border: solid red 1px;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  margin: auto;
}

.item__container-panel {
  display: grid;
}

.save-panel__hert:hover {
  filter: grayscale(1);
}

.item__image {
  width: 100%;
  height: 200px;
  vertical-align: middle;
  object-fit: cover;
}

.gallery__item-container:hover{
  transform: scale(1.1);
}

.item__name {
  position: absolute;
  width: 100%;
  height: 50%;
  bottom: 0;
  padding-left: 20px;
  line-height: 150px;
  color:white;
  font-weight: 500;
  background: linear-gradient(transparent,rgba(0, 0, 0, 0.591));
  font-size: 18px;
}

.gallery__item {
  overflow: hidden;
  border-radius: 13px;
  cursor: pointer;
  border: solid 1px rgba(0, 0, 0, 0.076);
}

.gallery__item-container{
  position: relative;
  transition: 300ms;
}

.item__description {
  overflow: hidden;
  height: 195px;
}
</style>