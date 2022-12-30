<template>
  <Popup name="login" v-if="this.$store.state.appModule.popup === 'login'" @click.self="rePass = false">
    <div v-if="!rePass">
      <h1>Вход</h1>
      <div class="form">
        <input class="form__input-text" ref="email" v-model="inputs.email" type="text" placeholder="E-mail" tabindex="-1">
        <input class="form__input-text" v-model="inputs.password" type="password" placeholder="Пароль">
        <MyButton @click="login" title="Войти"/>
        <div class="form__links">
          <div>Впервые у нас? <router-link :to="{name: $options.routeNames.registration}" class="form__link" @click="setPopup">Зарегистрируйтесь</router-link></div>
          <div>Забыли пароль? <span class="form__link" @click="rePass = true">Восстановить</span></div>
        </div>
      </div>
    </div>
    <div v-else>
      <h2>Восстановление пароля</h2>
      <div class="form">
        <input class="form__input-text" ref="email" v-model="inputs.email" type="text" placeholder="Укажите ваш e-mail" tabindex="-1">
        <MyButton @click="rePassword" title="Восстановить"/>
      </div>
    </div>
  </Popup>
</template>

<script>
import MyButton from './MyButton.vue'
import Popup from './Popup.vue'
import { routeNames } from '../../router'
export default {
  routeNames,
  components: {
    MyButton,
    Popup
  },
  data: () => ({
    inputs: {},
    rePass: false,
  }),
  methods: {
    login(){
      this.$store.dispatch('login', this.inputs)
    },
    rePassword(){
      this.$store.dispatch('rePassword', {to: this.inputs.email})
      this.rePass = false
    },
    setPopup(){
      this.$store.commit('setPopup', '')
    },
  },
}
</script>

<style lang="scss" scoped> 
.form {
  display: grid;
  gap: 20px;
  font-weight: 300;
  &__link {
    color: rgb(0, 201, 134);
    cursor: pointer;
    text-decoration: underline;
    &:hover {
      filter: brightness(0.8);
    }
  }
  &__input-text {
    @include input;
  }
}
.form__links {
  display: grid;
  gap: 10px;
}
</style>