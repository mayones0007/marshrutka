<template>
  <Popup name="login" v-if="this.$store.state.appModule.popup === 'login'">
    <h2>Вход</h2>
    <div class="form">
      <input class="form__input-text" ref="email" v-model="inputs.email" type="text" placeholder="E-mail" tabindex="-1">
      <input class="form__input-text" v-model="inputs.password" type="password" placeholder="Пароль">
      <MyButton @click="login" title="Войти"/>
      <div>Впервые у нас? <router-link :to="{name: $options.routeNames.registration}" @click="setPopup">Зарегистрируйтесь</router-link></div>
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
    inputs: {}
  }),
  methods: {
    login(){
      this.$store.dispatch('login', this.inputs)
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
  &__link {
    color: rgb(0, 212, 141);
    &:hover {
      filter: brightness(0.5);
    }
  }
  &__input-text {
    @include input;
  }
}
</style>