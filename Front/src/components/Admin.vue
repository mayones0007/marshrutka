<template>
  <div class="form">
    <h2>Изменить обьекты</h2>
    <select class="form__input" name="places" id="places" v-model="place" @change="getPictures">
      <option v-for="place in this.places" :key="place.id" :value="place">{{place.name}}</option>
    </select>
    <input class="form__input" v-model="place.eng" type="text" placeholder="название объекта на английском">
    <input class="form__input" v-model="place.name" type="text" placeholder="название объекта на русском">
    <input class="form__input" type="text" list="tags" placeholder="тип" v-model="place.tag">
    <datalist id="tags">
      <option value="Все" selected>Все</option>
      <option value="Водопады">Водопады</option>
      <option value="Озера">Озера</option>
      <option value="Горы">Горы</option>
      <option value="Заброшки">Заброшки</option>
    </datalist>
    <input class="form__input" type="text" list="region" placeholder="регион" v-model="place.region">
    <datalist id="region">
      <option value="Абхазия">Abkhazia</option>
      <option value="Сочи">Sochi</option>
      <option value="Красная Поляна">Krasnaia Polyana</option>
    </datalist>
    <input class="form__input" type="text" placeholder="город" v-model="place.city">
    <input class="form__input" type="text" list="difficulty" placeholder="сложность" v-model="place.difficulty">
    <datalist id="difficulty">
      <option value=1>Легкий</option>
      <option value="2">Средний</option>
      <option value="3">Сложный</option>
    </datalist>
    <input class="form__input" type="text" placeholder="доступность" v-model="place.availability">
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
      <label v-if="place.id" for="file" class="gallery-container__item">Добавить фото</label>
    </div>
    <div class="form__buttons">
      <MyButton v-if="place.id" title="Сохранить" @click="editPlace"/>
      <MyButton v-if="place.id" title="Удалить" isRed="true" @click="deletePlace"/>
      <MyButton v-else title="Добавить" @click="addNewPlace"/>
    </div>
  </div>
</template>

<script>
import MyButton from './CustomComponents/MyButton.vue'

export default {
  components: {
    MyButton,
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
    addNewPlace(){
      this.$store.dispatch('addNewPlace', this.place)
    },
    editPlace(){
      delete this.place.picture
      this.$store.dispatch('editPlace', this.place)
    },
    deletePlace(){
      this.$store.dispatch('deletePlace', this.place.id)
    },
    getPictures() {
      this.$store.dispatch('getPictures', this.place.id)
    },
    addPlaceImage(){
      this.$store.dispatch("addPlaceImage", [this.place.id, this.$refs.file.files[0]])
      this.$store.dispatch("getPictures", this.place.id)
    },
    deletePlaceImage(image) {
      this.$store.dispatch("deletePlaceImage", image)
      this.$store.dispatch("getPictures", this.place.id)
    },

  },
  created() {
    this.$store.dispatch("getPlaces")
    this.$store.state.pictures = []
  }
}

</script>

<style lang="scss" scoped>
.form {
  @include grid-g20;
  padding: 2%;
}

.form__input {
  @include input;
}


.input-rewiew__input {
  @include input;
  height: 50px;
  padding: 15px;
}

.form__input--month {
  @include flex-between-center-g15;
}

.gallery-container__item {
  position: relative;
  height: 200px;
  width: 300px;
  line-height: 200px;
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
  justify-content: center;
  gap: 10px;
}
.new-picture {
  display: none;
}

.form__buttons {
  display: grid;
  grid-auto-flow: column;
  gap: 20px;
}
</style>