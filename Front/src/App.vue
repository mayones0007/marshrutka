<template>
  <div class="app-container">
  <div class="header panel">
    <router-link to="/" class="logo">
      <img class="logo__icon--header" src="http://localhost:3000/icons/logo.svg" alt="Маршрутка">
      <p class="logo__name logo__name--header">Маршрутка</p>
    </router-link>
      <div class="search-form">
        <input class="search-form__input form__input--text" type="text" list="region" placeholder="Куда вы собираетесь?" v-model="selectedCity">
        <datalist id="region">
          <option value="Абхазия">Abkhazia</option>
          <option value="Сочи">Sochi</option>
          <option value="Красная Поляна">Krasnaia Polyana</option>
        </datalist>
        <MyButton title="Поиск" :noLeftRadius="true" @click="changeFilter"/>
      </div>
        <div class="login-panel__dropdown">
          <img class="login-panel__avatar" :src="`http://localhost:3000/avatars/${user[0].avatar}`" alt="avt">
          <div class="login-panel__name">{{user[0].name}}</div>
          <div class="login-panel__arrow" v-if="isLogIn"></div>
          <div class="dropdown-content" v-if="isLogIn">
            <router-link to="/myroute" class="dropdown-content__link">Мой маршрут</router-link>
            <router-link to="/myfavorites" class="dropdown-content__link">Избранное</router-link>
            <router-link to="/settings" class="dropdown-content__link">Настройки</router-link>
            <router-link to="/admin" class="dropdown-content__link" v-if="isAdmin">Добавить место</router-link>
            <div class="dropdown-content__link" @click="setLoginPopup">Выйти</div>
          </div>
        <div class="login-panel__enter--btn" @click="setLoginPopup" v-if="!isLogIn">Войти</div>
      </div>
  </div>

  <router-view></router-view>

  <div class="login--background" v-if="this.$store.state.showLoginPopup" @click.self="setLoginPopup">
    <section class="login--window">
      <div class="login--window__title title">Вход</div>
      <button class="login--window__close--btn" @click="setLoginPopup"/>
      <div class="login--window__form form">
        <input class="form__input--text" v-model="name" type="text" placeholder="Логин">
        <input class="form__input--text" v-model="password" type="password" placeholder="Пароль">
        <MyButton @click="login" title="Войти"/>
        <p>Впервые у нас? <router-link to="/registration" @click="setLoginPopup">Зарегистрируйтесь</router-link></p>
      </div>
    </section>
  </div>

  <div class="footer panel">
    <div class="contacts__typical">
      <a href="tel:+79014534841" class="contacts__typical-item"><img src="http://localhost:3000/icons/russia-flag.png" alt="rf"> +79014534841</a>
      <a href="mailto:macs0007@mail.ru" class="contacts__typical-item"><img src="http://localhost:3000/icons/mail.png" alt="mail"> macs0007@mail.ru</a>
    </div>
    <div class="contacts__social">
      <a href="https://vk.com"><img src="http://localhost:3000/icons/vk.png" alt="vk" class="contacts__social-item"></a>
      <a href="https://www.instagram.com"><img src="http://localhost:3000/icons/instagram.png" alt="inst" class="contacts__social-item"></a>
      <a href="https://tlgg.ru/likhachev_maxim"><img src="http://localhost:3000/icons/telegram.png" alt="tele" class="contacts__social-item"></a>
      <a href="https://wa.me/+79014534841"><img src="http://localhost:3000/icons/whatsapp.png" alt="wa" class="contacts__social-item"></a>
    </div>
    <router-link to="/" class="footer_logo logo">
      <p class="logo__name logo__name--footer">© 2022, Marshrutka Limited Sochifornia</p>
    </router-link>
  </div>
</div>
</template>

<script>
import MyButton from './components/CustomComponents/MyButton.vue'
export default {
  name: 'App',
  components: {
    MyButton,
  },
  data: () => ({
    name: '',
    email: '',
    password: '',
    selectedCity: '',
  }),

  computed:{
    user() {
      return this.$store.state.user
    },
    isLogIn(){
      if (this.$store.state.user[0].name === "Неопознанный турист"){
        return false
      } else {
        return true
      }
    },
    isAdmin(){
      if(this.$store.state.user[0].name === "Admin"){
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    setLoginPopup(){
      if (this.$store.state.user[0].name === "Неопознанный турист"){
      this.$store.commit('setLoginPopup')
      } else {
        this.$store.state.user = [{name:'Неопознанный турист', avatar:'tourist.png'}]
      }
    },
    changeFilter(){
      this.$store.commit('setSelectedCity', this.selectedCity);
      this.selectedCity = "";
    },
    async login(){
      const response = await fetch('http://localhost:3000/login',{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({name:this.name, password:this.password})
        })
        const data = await response.json();
      if (data.success) {
        this.$store.commit('setUser', data.users);
        this.name = this.password = "";
        this.$store.commit('setLoginPopup')
      }
      alert(data.message);
      this.name = this.password = "";
    },
  },
}
</script>

<style> 
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}


.panel {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  min-height: 80px;
}

.header {
  background: linear-gradient(to bottom, rgb(255, 255, 255), rgb(242, 242, 242));
}

.footer {
  background: linear-gradient(to top, rgb(255, 255, 255), rgb(242, 242, 242));
}

.logo {
  display: flex;
  height: 80px;
  text-decoration: none;
  cursor: pointer;
  margin: auto 0;
}

.logo__icon--header {
  padding: 20px 10px 20px 0;
}

.logo__name {
  display: flex;
  margin: auto 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.logo__name--header {
  font-size: 25px;
  color: #2c3e50;
}

.search-form {
  margin: auto 0;
  display: flex;
}

.form__input--text {
  min-width: 230px;
  height: 35px;
  padding: 0 10px;
  border-color: #e4e4e4;
  border: 2px;
  border-radius: 5px;
  box-shadow: inset 0px 0px 5px rgba(193, 193, 193, 0.691);
}

.search-form__input {
  border-radius: 5px 0 0 5px;
}

.search-form__input:active, :hover, :focus {
    outline: 0;
    outline-offset: 0;
}

.login-panel__avatar {
  height: 45px;
  width: 45px;
  border-radius: 50%;
  margin: auto;
}

.login-panel__name {
  cursor: default;
  font-weight: 500;
  display: flex;
  align-items: center; 
}

.login-panel__arrow {
  border-bottom: solid 2px black;
  border-left: solid 2px black;
  width: 10px;
  height: 10px;
  transform: rotate(135deg);
  margin-top: 35px;
  transition-duration: 400ms;
}

.login-panel__enter--btn {
  border-left: solid rgba(100, 100, 100, 0.5) 2px;
  cursor: pointer;
  padding: 10px;
  margin: auto;
}

.login-panel__enter--btn:hover {
  color: green;
}

.login--background {
  position: fixed;
  background-color: rgba(49, 49, 49, 0.65);
  width:100%;
  height:100%;
  top:0;
  z-index: 1;
}

.login--window {
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  transform:translate(-50%,-50%);
}

.title {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
}

.form {
  display: grid;
  gap: 20px;
}

.login--window__close--btn {
  position: absolute;
  border: none;
  background: url("http://localhost:3000/icons/close-btn.png") center/100% no-repeat;
  width: 25px;
  height: 25px;
  right: 20px;
  top: 20px;
}

.login--window__close--btn:hover {
  filter: brightness(0.5);
}

.form__link {
  color: rgb(0, 212, 141);
}

.form__link:hover {
  filter: brightness(0.5);
}

.logo__icon--footer {
  height: 40px;
}

.logo__name--footer{
  font-size: 15px;
  width: 200px;
  color: #a0a0a0;
  text-align: end;
}

.contacts {
  display: flex;
}

.contacts__typical {
  display: grid;
  text-align: start;
  height: 50px;
  margin: auto 0;
}

.contacts__typical-item {
  text-decoration: none;
  color: #000000;
}

.contacts__typical-item:hover {
  filter: brightness(1.1);
}


.contacts__social {
  display: flex;
  gap: 20px;
  margin: auto 0;
}
.contacts__social-item {
  height: 30px;
  border-radius: 50%;
  padding: 8px;
  background-color: #c7c7c7;
}

.contacts__social-item:hover {
  background-color: #a0a0a0;
  transition: 500ms;
}

.logo__name--footer {
  width: 190px;
}

.login-panel__dropdown {
    position: relative;
    display: flex;
    gap: 15px;
    z-index: 1;
    height: 80px;
}

.dropdown-content {
    line-height: 0%;
    position: absolute;
    top: 80px;
    right: -10px;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 8px 0px rgba(0,0,0,0.1);
    border-radius: 0 0 5px 5px;
}

.dropdown-content__link {
  display: grid;
  text-decoration: none;
  color: transparent;
  cursor: pointer;
  transition-duration: 300ms;
  text-align: end;
  padding: 0 15px;
}

.dropdown-content__link:hover {
  background-color: #ddd;
}

.dropdown-content__link:last-child:hover {
  border-radius: 0 0 5px 5px;
  color: red !important;
}

.login-panel__dropdown:hover .login-panel__arrow {
  transform: rotate(-45deg);
  margin-top: 30px;
}

.login-panel__dropdown:hover .dropdown-content__link {
  line-height: 300%;
  color: black;
}

</style>
