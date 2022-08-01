<template>
    <section class="registration--window">
      <div class="registration--window__title title">Добавь новый обьект</div>
      <div class="registration--window__form form">
        <input class="form__input--text" v-model="eng" type="text" placeholder="Название объекта на английском">
        <input class="form__input--text" v-model="name" type="text" placeholder="Название объекта на русском">
        <input class="form__input--text" type="text" list="tags" placeholder="tag" v-model="tag">
        <datalist id="tags">
          <option value="waterfall">Водопады</option>
          <option value="lake">Озера</option>
          <option value="mountain">Горы</option>
          <option value="abonded">Заброшки</option>
        </datalist>
        <input class="form__input--text" type="text" list="region" placeholder="region" v-model="region">
        <datalist id="region">
          <option value="Абхазия">Abkhazia</option>
          <option value="Сочи">Sochi</option>
          <option value="Красная Поляна">Krasnaia Polyana</option>
        </datalist>
        <input class="form__input--text" type="text" placeholder="city" v-model="city">
        <input class="form__input--text" type="text" list="difficulty" placeholder="сложность" v-model="difficulty">
        <datalist id="difficulty">
          <option value="light">Легкий</option>
          <option value="medium">Средний</option>
          <option value="hard">Сложный</option>
        </datalist>
        <div class="form__input--month">
        <div>Доступность</div>
        <input class="form__input--text" type="text" list="month" v-model="availability1">
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
        <input class="form__input--text" type="text" list="month" v-model="availability2">
        </div>
        <input class="form__input--text" type="text" placeholder="время" v-model="time">
        <textarea class="input-rewiew__input" type="text" placeholder="Описание" v-model="description"></textarea>
        <input class="form__input--text" type="text" placeholder="43.434954,40.442885" v-model="coords">
        <input type="file" id="files" ref="files" multiple accept="image/jpeg" @change="handleFilesUploads()">
        <button class="btn" @click="addNewPlace">Добавить Обьект</button>
      </div>
    </section>
</template>

<script>
import axios from 'axios'
export default {
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
      const response = await axios.post('http://localhost:3000/newplace', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
        alert(response.data);
    },
    handleFilesUploads(){
      this.files = this.$refs.files.files;
    }
  }
}

</script>

<style scoped>
.registration--window__link {
  color: green;
  cursor: pointer;
  text-decoration: underline;
}

.registration--window {
  margin: 100px 200px;
}

.input-rewiew__input {
  height: 50px;
  padding: 15px;
  border-color: #e4e4e4;
  border: 2px;
  border-radius: 5px;
  box-shadow: inset 0px 0px 5px rgba(193, 193, 193, 0.691);
  font-size: 15px;
  font-family: Museo Sans Cyrl,Arial,Helvetica Neue,sans-serif;
}

.form__input--month {
  display: flex;
  justify-content: space-between;
}
</style>