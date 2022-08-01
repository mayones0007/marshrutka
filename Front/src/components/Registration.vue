<template>
    <section class="registration--window">
      <div class="registration--window__title title">Регистрация</div>
      <div class="registration--window__form form">
        <input class="form__input--text" v-model="name" type="text" placeholder="Логин">
        <input class="form__input--text" v-model="email" type="email" placeholder="E-mail">
        <input class="form__input--text" v-model="password" type="password" placeholder="Пароль">
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
  methods: {
    openLoginPopup(){
      this.$store.commit('setLoginPopup', true);
    },
    closeLoginPopup(){
      this.$store.commit('setLoginPopup', false);
    },
    async registration(){
      const response = await fetch('http://localhost:3000/user',{
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
</style>