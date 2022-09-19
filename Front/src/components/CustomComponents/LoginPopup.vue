<template>
  <div class="background" @click.self="setLoginPopup">
    <div class="login-window"  :class="{'login-window-mobile': !isDesktop}" @keyup.esc.stop="setLoginPopup" @keyup.enter.stop="login">
      <Title
        text="Вход"
      />
      <div class="button-close" @click="setLoginPopup"/>
      <div class="form">
        <input class="form__input-text" ref="name" type="text" placeholder="Логин" tabindex="-1">
        <input class="form__input-text" ref="password" type="password" placeholder="Пароль">
        <MyButton @click="login" title="Войти"/>
        <div>Впервые у нас? <router-link to="/registration" @click="setLoginPopup">Зарегистрируйтесь</router-link></div>
      </div>
    </div>
  </div>
</template>

<script>
import MyButton from './MyButton.vue'
import Title from './Title.vue'
export default {
  name: 'LoginPopup',
  components: {
    MyButton,
    Title,
  },
  computed: {
    isDesktop(){
      return this.$store.state.isDesktop
    },
  },
  methods: {
    setLoginPopup(){
      this.$store.commit('setLoginPopup')
    },
    login(){
      const inputs = {name:this.$refs.name.value, password:this.$refs.password.value}
      this.$store.dispatch('login', inputs)
    },
  },
  mounted() {
    this.$refs.name.focus();
  }
}
</script>

<style lang="scss" scoped> 
.background {
  @include background_popup;
}

.login-window {
  position: fixed;
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  transform:translate(-50%,-50%);
  text-align: center;
}

.login-window-mobile {
  width: 80%;
}

.form {
  display: grid;
  gap: 20px;
}

.button-close {
  position: absolute;
  background: url("http://134.0.116.25:3000/icons/close-btn.png") center/100% no-repeat;
  width: 25px;
  height: 25px;
  right: 20px;
  top: 20px;
  cursor: pointer;
}

.button-close:hover {
  filter: brightness(0.5);
}

.form__link {
  color: rgb(0, 212, 141);
}

.form__link:hover {
  filter: brightness(0.5);
}

.form__input-text {
  @include input;
}
</style>