<template>
  <div class="registration--window">
    <div class="form">
      <Title 
      text="Добавь новый обьект"
      />
      <input class="form__input" v-model="eng" type="text" placeholder="Название объекта на английском">
      <input class="form__input" v-model="name" type="text" placeholder="Название объекта на русском">
      <input class="form__input" type="text" list="tags" placeholder="tag" v-model="tag">
      <datalist id="tags">
        <option value="waterfall">Водопады</option>
        <option value="lake">Озера</option>
        <option value="mountain">Горы</option>
        <option value="abonded">Заброшки</option>
      </datalist>
      <input class="form__input" type="text" list="region" placeholder="region" v-model="region">
      <datalist id="region">
        <option value="Абхазия">Abkhazia</option>
        <option value="Сочи">Sochi</option>
        <option value="Красная Поляна">Krasnaia Polyana</option>
      </datalist>
      <input class="form__input" type="text" placeholder="city" v-model="city">
      <input class="form__input" type="text" list="difficulty" placeholder="сложность" v-model="difficulty">
      <datalist id="difficulty">
        <option value="light">Легкий</option>
        <option value="medium">Средний</option>
        <option value="hard">Сложный</option>
      </datalist>
      <div class="form__input--month">
      <div>Доступность</div>
      <input class="form__input" type="text" list="month" v-model="availability1">
      <datalist id="month">
        <option value="январь"></option>
        <option value="февраль"></option>
        <option value="март"></option>
        <option value="апрель"></option>
        <option value="май"></option>
        <option value="июнь"></option>
        <option value="июль"></option>
        <option value="август"></option>
        <option value="сентябрь"></option>
        <option value="октябрь"></option>
        <option value="ноябрь"></option>
        <option value="декабрь"></option>
      </datalist>
      -
      <input class="form__input" type="text" list="month" v-model="availability2">
      </div>
      <input class="form__input" type="text" placeholder="время" v-model="time">
      <textarea class="input-rewiew__input" type="text" placeholder="Описание" v-model="description"></textarea>
      <input class="form__input" type="text" placeholder="43.434954,40.442885" v-model="coords">
      <input type="file" id="files" ref="files" multiple accept="image/jpeg" @change="handleFilesUploads()">
      <MyButton title="Добавить Обьект" @click="addNewPlace"/>
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
    eng: '',
    name: '',
    tag: '',
    region: '',
    city: '',
    difficulty: '',
    availability1: '',
    availability2: '',
    time: '',
    description: '',
    coords: '',
    files: '',
  }),
  methods: {
    async addNewPlace(){
      const formData = new FormData()
      formData.append('eng', this.eng);
      formData.append('name', this.name);
      formData.append('tag', this.tag);
      formData.append('region', this.region);
      formData.append('city', this.city);
      formData.append('difficulty', this.difficulty);
      formData.append('availability', this.availability1 + ' - ' + this.availability2);
      formData.append('time', this.time);
      formData.append('description', this.description);
      formData.append('coords', this.coords);
      formData.append('pictures', this.files.length);
      Object.values(this.files).forEach(file => {
        formData.append('images', file);
      })
      await axiosInstance.post($baseUrl+'/newplace', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
    },
    handleFilesUploads(){
      this.files = this.$refs.files.files;
    }
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
</style>