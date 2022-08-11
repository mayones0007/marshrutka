<template>
  <div 
    class="route-point"
    :class="{'route-point--full-size': isFullSize}"
    @click.self="toggleSize"
  >
    <div class="route-point__name">{{routePoint.name}}</div>
    <div class="route-point__time">{{routePoint.time}}</div>
    <MyButton title="Убрать из маршрута" @click="removeInMyRoute(routePoint.eng)"/>
    <div class="gallery__item" @click="openModal(routePoint.eng)">
      <div class="gallery__item-container">
        <img class="item__image" :src="`http://localhost:3000/img/`+routePoint.eng+`.jpeg`" alt="avt">
      </div>
    </div>
    <div class="item__description">{{routePoint.description}}</div>
    <img class="save-panel__hert" :class="{'save-panel__hert--false': isFavorite(routePoint.eng)}" src="http://localhost:3000/icons/heart.png" alt="heart" @click="addInMyFavorites(routePoint.eng)">
  </div>
</template>

<script>
import {router} from '../router'
import MyButton from './CustomComponents/MyButton.vue'
export default {
  components: {
    MyButton,
  },
props: ['routePoint'],
data(){
  return {
    isFullSize: false,
  }
},
  methods: {
    toggleSize() {
      this.isFullSize = !this.isFullSize;
    },
    openModal(eng){
      router.push({name: "Description",params:{eng}})
    },
    isFavorite(placeName) {
      return !!this.$store.state.myFavorites.find(el => el.eng === placeName)
    },
    async removeInMyRoute(placeName){
      await this.$store.dispatch('newPointInRoute', placeName)
      await this.$store.dispatch("getRoute")
    },
    async addInMyFavorites(placeName){
      await this.$store.dispatch('newFavorite', placeName)
      await this.$store.dispatch("getFavorites")
    },
  },
  created(){
    this.$store.dispatch("getRoute")
    this.$store.dispatch("getFavorites")
  },
}
</script>

<style scoped>
.route-point {
  font-family: Museo Sans Cyrl,Arial,Helvetica Neue,sans-serif;
  text-align: start;
  font-weight: 100;
  font-size: 18px;
  margin: 20px 0;
  padding: 20px;
  border-radius: 20px;
  background-color:aliceblue;
  display: grid;
  height: 50px;
  overflow: hidden;
  grid-template-columns: 300px 1fr 100px;
  grid-template-rows: 50px 180px;
  gap: 20px;
  border: solid 1px rgba(0, 0, 0, 0.076);
  transition: 500ms;
}

.route-point__name {
  margin: auto 0;
  font-weight: 500;
}

.route-point__time {
  margin: auto 0;
}

.route-point--full-size {
  height: 250px;
}

.save-panel__hert {
  width: 25px;
  border: solid red 1px;
  border-radius: 50%;
  padding: 8px;
  fill: white;
  cursor: pointer;
  margin: auto;
  filter: grayscale(1)
}

.save-panel__hert--false{
  filter: grayscale(0);
}

.item__container-panel {
  display: grid;
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