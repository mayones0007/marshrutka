<template>
  <div class="page" :class="{'page-mobile': !isDesktop}">
    <h2>Добавить место</h2>
      <div v-if="isAdmin" class="form" :class="{'form-mobile': !isDesktop}">
          <label for="places">Места</label>
          <select class="form__input" id="places" v-model="place" @change="getPictures">
            <option v-for="place in this.places" :key="place.id" :value="place">{{place.name}}</option>
          </select>
          <label for="hiddenOnly">Только скрытые</label>
          <input type="checkbox" id="hiddenOnly" :checked="hiddenOnly" v-model="hiddenOnly">
        </div>
      <div class="form" :class="{'form-mobile': !isDesktop}">
        <label for="name">Название</label>
        <input class="form__input" id="name" v-model="place.name" type="text">
        <label for="category">Категория</label>
        <input class="form__input" id="category" type="text" list="categories" v-model="place.category">
        <datalist id="categories">
          <option v-for="option in options('category')" :key="option">{{option}}</option>
        </datalist>
        <label for="region">Регион</label>
        <input class="form__input" id="region" type="text" list="regions" v-model="place.region">
        <datalist id="regions">
          <option v-for="option in options('region')" :key="option">{{option}}</option>
        </datalist>
        <label for="city">Город</label>
        <input class="form__input" id="city" type="text" list="cities" v-model="place.city">
        <datalist id="cities">
          <option v-for="option in options('city')" :key="option">{{option}}</option>
        </datalist>
        <label for="difficulty">Сложность</label>
        <select class="form__input" id="difficulty" v-model="place.difficulty">
          <option>Легкий</option>
          <option>Средний</option>
          <option>Сложный</option>
        </select>
        <label for="availability">Доступность</label>
        <input class="form__input" id="availability" type="text" list="availabilities" placeholder="по месяцам" v-model="place.availability">
        <datalist id="availabilities">
          <option>Круглый год</option>
        </datalist>
        <label for="way">Способ</label>
        <input class="form__input" id="way" type="text" list="ways" v-model="place.way">
        <datalist id="ways">
          <option v-for="option in options('way')" :key="option">{{option}}</option>
        </datalist>
        <label for="time">Время в часах</label>
        <input class="form__input" id="time" type="number" v-model="place.time">
        <label for="coords">Координаты</label>
        <input class="form__input" id="coords" type="text" placeholder="43.434954,40.442885" v-model="place.coords">
        <label v-if="isAdmin" for="isAccepted">Показывать</label>
        <input v-if="isAdmin" type="checkbox" id="isAccepted" :checked="place.isAccepted" v-model="place.isAccepted">
      </div>
    <textarea class="form__textarea" type="text" placeholder="Описание" v-model="place.description"></textarea>
    <label>Фото (минимум 4)</label>
    <div class="gallery">
      <div v-for="picture in currentPictures" :key="picture" class="gallery__item">
        <img :src="`${$baseUrl}/img/${picture}`" class="gallery__item-image">
        <img :src="`${$baseUrl}/icons/trash.svg`" class="gallery__item-button" @click="deletePlacePicture(picture)">
      </div>
      <div v-for="picture in addedPictures" :key="picture" class="gallery__item">
        <img :src="picture" class="gallery__item-image">
        <img :src="`${$baseUrl}/icons/trash.svg`" class="gallery__item-button" @click="deletePicture(picture)">
      </div>
      <input class="form__picture" type="file" id="file" ref="file" multiple accept="image/*" @change="addPlacePicture()">
      <label for="file" class="gallery__item">
        <img :src="`${$baseUrl}/icons/plus.svg`">
        <div>ФОТО</div>
      </label>
    </div>
    <div class="form__buttons">
      <MyButton v-if="place.id && isAdmin" title="Сохранить" @click="editPlace"/>
      <MyButton v-if="place.id && isAdmin" title="Удалить" isRed="true" @click="deletePlace"/>
      <MyButton v-else :title="buttonTitle" :isDisabled="!isFilledPictures || !isFilledForm || isLoading" @click="addNewPlace"/>
    </div>
  </div>
</template>

<script>
import MyButton from './CustomComponents/MyButton.vue'
import { router, routeNames } from '../router'
import { mounths } from '../data/mounths.data'

export default {
  components: {
    MyButton,
  },
  data: () => ({
    place: {},
    hiddenOnly: false,
    addedPictures: [],
    mounths,
    isLoading: false,
  }),
  computed: {
    places() {
      return this.hiddenOnly ? this.$store.state.placesModule.places.filter((item) => item.isAccepted !== 1) : this.$store.state.placesModule.places
    },
    isDesktop(){
      return this.$store.state.appModule.isDesktop
    },
    currentPictures() {
      return this.$store.state.placesModule.pictures
    },
    isAdmin(){
      return this.$store.state.userModule.user.name === "Admin"
    },
    buttonTitle() {
      return this.isAdmin ? "Добавить место" : "Отправить на проверку"
    },
    isFilledForm() {
      return Object.values(this.place).filter((item) => item !== "").length > 8
    },
    isFilledPictures() {
      return (this.currentPictures.length + this.addedPictures.length) > 3
    },
  },
  methods: {
    async addNewPlace(){
      this.isLoading = true
      await this.$store.dispatch('addNewPlace', [this.place, this.$refs.file.files])
      this.isLoading = true
      router.push({ name: routeNames.places })
    },
    editPlace(){
      this.isLoading = true
      delete this.place.picture
      const pictures = this.$refs.file.files
      if (this.addedPictures.length){
        this.$store.dispatch('editPlace', [this.place, pictures])
      } else {
      this.$store.dispatch('editPlace', [this.place])
      }
      this.isLoading = false
    },
    async deletePlace(){
      this.$store.dispatch('deletePlace', this.place.id)
      await this.$store.dispatch("getPlaces")
      this.$store.commit('setPictures', [])
      this.place = {}
    },
    getPictures() {
      this.$store.dispatch('getPictures', this.place.id)
    },
    addPlacePicture(){
      const files = this.$refs.file.files
      Array.from(files).forEach(file => {
          const reader = new FileReader()
          reader.onload = () => {
          this.addedPictures.push(reader.result)
        }
        reader.readAsDataURL(file)
      })
    },
    deletePicture(picture) {
      this.addedPictures.splice(this.addedPictures.indexOf(picture),1)
    },
    async deletePlacePicture(picture) {
      await this.$store.dispatch("deletePlacePicture", picture)
      this.$store.dispatch("getPictures", this.place.id)
    },
    options(fieldName) {
      return new Set(this.places.map((place) => place[fieldName]))
    },
  },
  created() {
    this.$store.dispatch("getPlaces")
    this.$store.commit('setPictures', [])
  }
}

</script>

<style lang="scss" scoped>
.page {
  padding: 3% 20%;
  &-mobile {
    padding: 3%;
  }
}

.form {
  @include grid-g20;
  grid-template-columns: auto 1fr;
  align-items: center;
  justify-items: start;
  margin: 20px 0;
}

.form-mobile {
  grid-template-columns: 1fr;
  gap: 10px;
}

.form__input {
  @include input;
  box-sizing: border-box;
  width: 100%;
}

.form__textarea {
  @include input;
  box-sizing: border-box;
  height: 60px;
  padding: 15px;
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
  resize: vertical;
}

.gallery__item {
  height: 200px;
  width: 300px;
  position: relative;
  overflow: hidden;
  display: flex;
  gap: 15px;
  font-size: 1.3em;
  font-weight: 400;
  color: rgb(0, 201, 134);
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: solid rgb(190, 190, 190) 1px;
  z-index: 2;
}

.gallery__item-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  filter: brightness(0.9);
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
}
.form__picture {
  display: none;
}

.form__buttons {
  display: grid;
  grid-auto-flow: column;
  gap: 20px;
}
.gallery__item-button{
  position: absolute;
  width: 20px;
  height: 20px;
  right: 15px;
  top: 15px;
  cursor: pointer;
}

</style>