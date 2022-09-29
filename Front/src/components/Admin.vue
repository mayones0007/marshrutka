<template>
  <div class="registration--window">
    <div class="form">
      <Title 
      text="Изменить обьекты"
      />
      <select class="form__input" name="places" id="places" v-model="place" @change="getPictures">
        <option v-for="place in this.places" :key="place.id" :value="place">{{place.name}}</option>
      </select>
      <input class="form__input" v-model="place.eng" type="text" placeholder="Название объекта на английском">
      <input class="form__input" v-model="place.name" type="text" placeholder="Название объекта на русском">
      <input class="form__input" type="text" list="tags" placeholder="tag" v-model="place.tag">
      <datalist id="tags">
        <option value="waterfall">Водопады</option>
        <option value="lake">Озера</option>
        <option value="mountain">Горы</option>
        <option value="abonded">Заброшки</option>
      </datalist>
      <input class="form__input" type="text" list="region" placeholder="region" v-model="place.region">
      <datalist id="region">
        <option value="Абхазия">Abkhazia</option>
        <option value="Сочи">Sochi</option>
        <option value="Красная Поляна">Krasnaia Polyana</option>
      </datalist>
      <input class="form__input" type="text" placeholder="city" v-model="place.city">
      <input class="form__input" type="text" list="difficulty" placeholder="сложность" v-model="place.difficulty">
      <datalist id="difficulty">
        <option value=1>Легкий</option>
        <option value="2">Средний</option>
        <option value="3">Сложный</option>
      </datalist>
      <div class="form__input--month">
      <div>Доступность</div>
        <input class="form__input" type="text" v-model="place.availability">
      </div>
      <input class="form__input" type="text" placeholder="время" v-model="place.time">
      <textarea class="input-rewiew__input" type="text" placeholder="Описание" v-model="place.description"></textarea>
      <input class="form__input" type="text" placeholder="43.434954,40.442885" v-model="place.coords">
      <div class="gallery">
        <img
          v-for="picture in currentPictures"
          :key="picture"
          :src="`${$baseUrl}/img/${picture}`" 
          class="gallery-container__item"
          @click="deletePlaceImage(picture)"
        >
        <input class="new-picture" type="file" id="file" ref="file" accept="image/jpeg" @change="addPlaceImage()">
        <label v-if="place.eng" for="file" class="gallery-container__item">Добавить фото</label>
      </div>
      <MyButton title="Добавить Обьект" @click="addNewPlace"/>
      <MyButton title="Сохранить Обьект" @click="editPlace"/>
      <MyButton title="Удалить Обьект" @click="deletePlace"/>
    </div>
  </div>
</template>

<script>
import MyButton from './CustomComponents/MyButton.vue'
import Title from './CustomComponents/Title.vue'
import { axiosInstance } from '../httpClient'

export default {
  components: {
    MyButton,
    Title
  },
  data: () => ({
    place: {},
  }),
  computed: {
    places() {
      return this.$store.state.places
    },
    currentPictures() {
      return this.$store.state.pictures
    },
  },
  methods: {
    async addNewPlace(){
      await axiosInstance.post('place', { place: this.place })
    },
    async editPlace(){
      await axiosInstance.patch('place', { place: this.place })
    },
    async deletePlace(){
      await axiosInstance.delete('place', {params: {id: this.place.id}})
    },
    async getPictures() {
      await this.$store.dispatch("getPictures", this.place.eng)
    },
    async addPlaceImage(){
      const formData = new FormData()
      formData.append('eng', this.place.eng)
      formData.append('image', this.$refs.file.files[0])
      await axiosInstance.post('pictures', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      await this.$store.dispatch("getPictures", this.place.eng)
    },
    async deletePlaceImage(image) {
      try {
        await axiosInstance.delete('pictures', {params: {image}})
        await this.$store.dispatch("getPictures", this.place.eng)
      } catch (e) {
        console.log("Ошибка HTTP: " + e)
      }
    },

  },
  created() {
    this.$store.dispatch("getPlaces")
    this.$store.state.pictures = []
  }
}

</script>

<style lang="scss" scoped>
.registration--window {
  padding: 20px 80px;
}

.form {
  @include grid-g20;
}

.form__input {
  @include input;
}


.input-rewiew__input {
  @include input;
  height: 50px;
  padding: 15px;
  font-size: 15px;
}

.form__input--month {
  @include flex-between-center-g15;
}

.gallery-container__item {
  position: relative;
  height: 200px;
  width: 300px;
  object-fit: cover;
  border-radius: 10px;
  border: solid rgb(190, 190, 190) 1px;
  &:hover {
    filter: brightness(0.3);
  }
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.new-picture {
  display: none;
}
</style>