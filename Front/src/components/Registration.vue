<template>
  <div>
    <div v-if="!step" class="registration__form">
      <h2>Регистрация</h2>
      <div v-for="field in userFields" :key="field.name">
        <div v-if="isRoleField(field.role)">
          <div class="form__input">
            <input
              class="form__input-text"
              v-model="user[field.name]"
              :type="field.currentType || field.type"
              :placeholder="field.placeholder + (field.required ? '*' : '')"
              @blur="validate(field.name)"
            >
            <img
              v-if="field.type === 'password'"
              class="form__input-password"
              :src="`${$baseUrl}/icons/eye-${!!field.show}.png`"
              @click="togglePasswordVisibility(field.name)"
            >
          </div>
          <div v-if="this.validation[field.name]" class="input-text-wrong">{{this.validation[field.name]}}</div>
        </div>
      </div>
      <div class="form__item">
        <input type="checkbox" id="role" v-model="user.role" true-value='guide' false-value='user'>
        <label for="role">Зарегистрироваться как гид</label>
      </div>
      <MyButton 
        title="Следующий шаг"
        :isDisabled="!inputIsCorrect"
        @click="sendEmail"
      />
    </div>
    <div v-if="step" class="registration__form">
      <h2>Подтвердите Ваш адрес e-mail</h2>
      <input
        class="form__input-text"
        v-model="enterCode"
        type="text"
        placeholder="Введите код из письма"
      >
      <MyButton 
        title="Закончить регистрацию"
        :isDisabled="!codeIsCorrect"
        @click="registration"
      />
    </div>
  </div>
</template>

<script>
import MyButton from './CustomComponents/MyButton.vue'
import { validation } from '../services/validation.service'
import { userFields } from '../data/user.fields'

export default {
  components: {
    MyButton,
  },
  data: () => ({
    userFields,
    user: {},
    validation: {},
    code: null,
    enterCode: null,
    step: 0,
  }),
  computed: {
    inputIsCorrect(){
      return !Object.values(this.validation).reduce((a, b) => a + b, '') && Object.keys(this.user).length >= userFields.map(field => field.required).length && !Object.values(this.user).includes('')
    },
    codeIsCorrect(){
      return this.code === this.enterCode
    },
  },
  methods: {
    validate(fieldName){
      this.validation[fieldName] = validation(this.user[fieldName], fieldName)
    },
    registration(){
      this.$store.dispatch('registration', this.user)
    },
    async sendEmail(){
      this.code = this.user.email.substr(this.user.email.length - 1, 1) + this.user.phone.substr(6, 1) + this.user.phone.substr(1, 2) + this.user.phone.substr(8, 2)
      const status = await this.$store.dispatch('sendEmail', {to: this.user.email, phone: this.user.phone})
      status === 200 ? this.step = 1 : this.user.email = ''
    },
    isRoleField(role) {
      return role ? role.includes(this.user.role) : true
    },
    togglePasswordVisibility(fieldName){
      const field = this.userFields.find(field => field.name === fieldName)
      if(field.currentType === 'text') {
        field.currentType = 'password'
        field.show = false
      } else {
        field.currentType = 'text'
        field.show = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.registration__form {
  display: grid;
  width: 350px;
  gap: 20px;
  text-align: center;
}

.registration__link {
  color: green;
  cursor: pointer;
  text-decoration: underline;
}

.form__input-text {
  @include input;
}

.input-text-wrong {
  color: red;
  font-size: 0.6em;
  text-align: start;
}

.form__input {
  display: grid;
  grid-template-columns: 1fr 0;
}

.form__input-password {
  width: 20px;
  height: 20px;
  margin: auto 0;
  margin-left: -30px;
  cursor: pointer;
}

.form__item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
</style>