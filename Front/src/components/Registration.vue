<template>
    <section class="registration--window">
      <div class="registration--window__title title">Регистрация</div>
      <div class="registration--window__form form">
        <input
          class="form__input--text"
          v-model="name" type="text"
          placeholder="Логин"
        >
        <input
          v-model="email"
          class="form__input--text"
          type="email"
          placeholder="E-mail"
          @input="clearEmailValidation"
          @blur="validateEmail"
        >
        <div
          v-if="emailValidated && !isValidEmail"
          class="input-text-wrong"
        >Введите корректный email
        </div>
        <div class="form__password">
          <input
            class="form__input--password"
            v-model="password"
            @input="clearPasswordValidation"
            @blur="validatePassword"
            :type="typePassword"
            placeholder="Пароль"
          >
          <img
            class="password-eye"
            :src="`http://localhost:3000/icons/${eyeIconPassword}.png`"
            @click="togglePasswordVisibility"
          >
        </div>
        <div
          v-if="passwordValidated && !isValidPassword"
          class="input-text-wrong"
        >
          Пароль должен быть больше 6 символов и включать латниские буквы и цифры
        </div>
        <div class="form__password">
          <input
            v-model="rePassword"
            class="form__input--password" 
            :type="typePassword"
            placeholder="Повторно введите пароль"
          >
          <img
            class="password-eye"
            @click="togglePasswordVisibility"
            :src="`http://localhost:3000/icons/${eyeIconPassword}.png`"
          >
        </div>
         <div
          v-if="password !== rePassword && rePassword.length > 6"
          class="input-text-wrong" >
          Пароли не совпадают
         </div>
         <MyButton 
          title="Зарегистрироваться"
          :isDisabled="!inputIsCorrect"
          @click="registration"
         />
        <p>Уже зарегистрированы? 
          <a class="registration--window__link" @click="openLoginPopup">Войти</a>
        </p>
      </div>
    </section>
</template>

<script>
import {router} from '../router'
import MyButton from './CustomComponents/MyButton.vue'
export default {
  components: {
    MyButton,
  },
  data: () => ({
    name: '',
    email: '',
    password: '',
    rePassword: '',
    typePassword: 'password',
    eyeIconPassword: 'hide',
    emailValidationText: 'Введите корректный email',
    emailValidated: false,
    passwordValidated: false,
  }),
  computed: {
    isValidEmail(){
      return this.email.includes('@') && this.email.includes('.')
    },
    isValidPassword(){
      const numbers = /[0-9]/
      const letters = /[A-z]/
      return this.password.length > 6 && this.password.match(numbers) && this.password.match(letters) || this.password.length < 1;
    },
    inputIsCorrect(){
      return this.password !== "" && this.password === this.rePassword && this.isValidEmail && this.isValidPassword && this.name !== ""
    }
  },
  methods: {
    validatePassword() {
      this.passwordValidated = true;
      return this.isValidPassword ? '' : this.passwordValidationText;
    },
    validateEmail() {
      this.emailValidated = true;
      return this.isValidEmail ? '' : this.emailValidationText;
    },
    clearPasswordValidation() {
      this.passwordValidated = false;
    },
    clearEmailValidation() {
      this.emailValidated = false;
    },
    openLoginPopup(){
      this.$store.commit('setLoginPopup', true);
    },
    closeLoginPopup(){
      this.$store.commit('setLoginPopup', false);
    },
    togglePasswordVisibility(){
      if (this.typePassword === "text") {
        this.typePassword = "password"
        this.eyeIconPassword = "hide"
      } else {
        this.typePassword = "text"
        this.eyeIconPassword = "show"
      }
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
}

.form__password {
  display: flex;
}

.form__input--password {
  width: 330px;
  height: 35px;
  padding: 0 10px;
  border-color: #e4e4e4;
  border: 2px;
  border-radius: 5px;
  box-shadow: inset 0px 0px 5px rgba(193, 193, 193, 0.691);
}

.password-eye {
  width: 20px;
  height: 20px;
  margin: auto 0;
  margin-left: -30px;
  cursor: pointer;
}
</style>