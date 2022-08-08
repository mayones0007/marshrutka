<template>
    <section class="registration--window">
      <div class="registration--window__title title">Регистрация</div>
      <div class="registration--window__form form">
        <input class="form__input--text" v-model="name" type="text" placeholder="Логин">
        <input class="form__input--text" v-model="email" type="email" placeholder="E-mail">
        <div class="input-text-wrong" v-if="emailValidation">{{emailValidation}}</div>
        <input class="form__input--text" v-model="password" type="password" placeholder="Пароль">
        <div class="input-text-wrong" v-if="passwordValidation">{{passwordValidation}}</div>
        <button class="btn" @click="registration">Зарегистрироваться</button>
        <p>Уже зарегистрированы? <a class="registration--window__link" @click="openLoginPopup">Войти</a></p>
      </div>
    </section>
</template>

<script>
import {router} from '../router'
export default {
  data: () => ({
    name: '',
    email: '',
    password: '',
  }),
  computed: {
    emailValidation(){
      if(this.email.includes('@') && this.email.includes('.') || this.email.length < 10){
        return ""
      } return "Неверно указан email"
    },
    passwordValidation(){
      const numbers = /[0-9]/
      const letters = /[A-z]/
      if(this.password.length > 6 && this.password.match(numbers) && this.password.match(letters)|| this.password.length < 1){
        return ""
      } return "Пароль должен содержать латниские буквы и цифры"
    }
  },
  methods: {
    openLoginPopup(){
      this.$store.commit('setLoginPopup', true);
    },
    closeLoginPopup(){
      this.$store.commit('setLoginPopup', false);
    },
    async registration(){
      const response = await fetch('http://localhost:3000/registration',{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({name:this.name, email:this.email, password:this.password})
        });
        const data = await response.json();
      if (data.success) {
        this.$store.commit('setUser', data.user);
        router.push({name: "MyPlaces"});
      }
        alert(data.message);
    },
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
  width: 350px;
  margin: 100px auto;
}

.input-text-wrong {
  color: red;
  font-size: 10px;
  text-align: start;
  line-height: 0;
}
</style>