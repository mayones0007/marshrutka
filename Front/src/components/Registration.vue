<template>
  <div class="registration--window">
    <div class="form">
    <Title
      text="Регистрация"
    />
    <div class="registration--window__form form">
      <input
        class="form__input"
        v-model="name" type="text"
        placeholder="Логин"
      >
      <input
        v-model="email"
        class="form__input"
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
          class="form__input"
          v-model="password"
          @input="clearPasswordValidation"
          @blur="validatePassword"
          :type="typePassword"
          placeholder="Пароль"
        >
        <img
          class="password-eye"
          :src="`${$baseUrl}/icons/${eyeIconPassword}.png`"
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
          class="form__input" 
          :type="typePassword"
          placeholder="Повторно введите пароль"
        >
        <img
          class="password-eye"
          @click="togglePasswordVisibility"
          :src="`${$baseUrl}/icons/${eyeIconPassword}.png`"
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
        <a class="registration--window__link" @click="setLoginPopup">Войти</a>
      </p>
    </div>
    </div>  
  </div>
</template>

<script>
import MyButton from './CustomComponents/MyButton.vue'
import Title from './CustomComponents/Title.vue'
export default {
  components: {
    MyButton,
    Title,
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
    setLoginPopup(){
      this.$store.commit('setLoginPopup')
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
      const inputs = {name:this.name, email:this.email, password:this.password}
      await this.$store.dispatch('registration', inputs)
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  display: grid;
  gap: 20px;
  text-align: center;
}

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
  font-size: 0.6em;
  text-align: start;
}

.form__password {
  display: grid;
  grid-template-columns: 1fr 0;
}

.password-eye {
  width: 20px;
  height: 20px;
  margin: auto 0;
  margin-left: -30px;
  cursor: pointer;
}

.form__input {
  @include input;
}
</style>