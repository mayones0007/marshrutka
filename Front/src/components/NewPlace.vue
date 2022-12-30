<template>
  <div class="page">
    <h1>Новое место</h1>
      <div class="form">
        <div v-for="field in this.placeFields" :key="field.name">
          <div v-if="isCategoryField(field.category)">
            <textarea v-if="field.type === 'textarea'" class="form__textarea" type="text" :placeholder="field.placeholder" v-model="place[field.fieldName]"></textarea>
            <div v-else-if="!field.admin || field.admin === isAdmin" class="form__item">
              <label :for="field.fieldName">{{field.name}}{{field.required ? '*' : ''}}</label>
              <div>
                <input 
                  class="form__input"
                  :id="field.fieldName"
                  v-model="place[field.fieldName]" 
                  :placeholder="field.placeholder"
                  :type="field.type"
                  :list="field.name"
                  @blur="validate(field, this.place)"
                >
                <datalist v-if="field.autofull" :id="field.name">
                  <option v-for="option in options(field.fieldName)" :key="option">{{option[field.fieldName]}}</option>
                </datalist>
                <div v-if="this.validation[field.fieldName]" class="input-text-wrong">{{this.validation[field.fieldName]}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <label>Фото (минимум 4)</label>
    <div class="gallery">
      <div v-for="picture in currentPictures" :key="picture" class="gallery__item">
        <img :src="`${$baseUrl}/min/${picture}`" class="gallery__item-image">
        <img :src="`${$baseUrl}/icons/trash.svg`" class="gallery__item-button" @click="deletePlacePicture(picture)">
      </div>
      <div v-for="(picture, index) in addedPictures" :key="picture" class="gallery__item">
        <img :src="picture" class="gallery__item-image">
        <img :src="`${$baseUrl}/icons/trash.svg`" class="gallery__item-button" @click="deletePicture(index)">
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
    <LoadingSpinner v-if="isLoading"/>
  </div>
</template>

<script>
import MyButton from './CustomComponents/MyButton.vue'
import LoadingSpinner from './CustomComponents/LoadingSpinner.vue'
import { router, routeNames } from '../router'
import { placeFields } from '../data/place.fields'
import { validation } from '../services/validation.service'

export default {
  components: {
    MyButton,
    LoadingSpinner
  },
  data: () => ({
    place: {},
    validation: {},
    hiddenOnly: false,
    addedPictures: [],
    files: [],
    placeFields,
    isLoading: false,
  }),
  computed: {
    currentPictures() {
      return this.$store.state.placesModule.pictures
    },
    isAdmin(){
      return this.$store.state.userModule.user.role === "admin"
    },
    buttonTitle() {
      return this.isAdmin ? "Добавить место" : "Отправить на проверку"
    },
    isFilledForm() {
      return !Object.values(this.validation).reduce((a, b) => a + b, '')
      && placeFields.reduce((acc, field) => field.required === true ? acc && !!this.place[field.fieldName] : acc, true)
    },
    isFilledPictures() {
      return (this.currentPictures.length + this.addedPictures.length) > 3
    },
    currentRoute() {
      return router.currentRoute.value.params.id
    },
  },
  methods: {
    validate(field, model){
      this.validation[field.fieldName] = validation(model[field.fieldName], field.fieldName)
    },
    async addNewPlace(){
      this.isLoading = true
      const status = await this.$store.dispatch('addNewPlace', {info: this.place, pictures: this.files})
      if (status === 200) {
        router.push({ name: routeNames.places })
      }
      this.isLoading = false
    },
    async editPlace(){
      this.isLoading = true
      delete this.place.picture
      const status = await this.$store.dispatch('editPlace', {info: this.place, pictures: this.files})
      if (status === 200) {
        router.push({ name: routeNames.place, params: {id: this.place.id} })
      }
      this.isLoading = false
    },
    async deletePlace(){
      this.$store.dispatch('deletePlace', this.place.id)
      router.push({ name: routeNames.places })
    },
    getPictures() {
      this.$store.dispatch('getPictures', this.place.id)

    },
    addPlacePicture(){
      this.files = [...this.files, ...this.$refs.file.files]
      Array.from(this.$refs.file.files).forEach(file => {
          const reader = new FileReader()
          reader.onload = () => {
          this.addedPictures.push(reader.result)
        }
        reader.readAsDataURL(file)
      })
    },
    deletePicture(index) {
      this.files.splice(index,1)
      this.addedPictures.splice(index,1)
    },
    async deletePlacePicture(picture) {
      await this.$store.dispatch("deletePlacePicture", picture)
      this.$store.dispatch("getPictures", this.place.id)
    },
    options(fieldName) {
      return this.$store.state.placesModule.filters[fieldName]
    },
    isCategoryField(category) {
      return category ? category.includes(this.place.category) : true
    }
  },
  created() {
    this.currentRoute ? this.place = this.$store.state.placesModule.place : this.$store.commit('setPictures', [])
  }
}

</script>

<style lang="scss" scoped>
.page {
  width: 100%;
}
.form {
  display: grid;
}
.input-text-wrong {
  color: red;
  font-size: 0.6em;
  text-align: start;
}
.form__item {
  display: grid;
  margin: 10px 0;
  grid-template-columns: 130px 1fr;
  text-align: start;
  align-items: center;
}

.form__input {
  @include input;
  box-sizing: border-box;
  width: 100%;
}

.form__textarea {
  @include input;
  box-sizing: border-box;
  margin: 10px 0;
  padding: 15px;
  width: 100%;
  height: 200px;
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