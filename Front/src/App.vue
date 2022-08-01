<template>
  <div class="app-container">
  <div class="header panel">
    <router-link to="/" class="header__logo logo">
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
        <button class="search-form__btn btn" @click="changeFilter">Поиск</button>
      </div>
      <div class="login-panel">
        <img class="login-panel__avatar" :src="`http://localhost:3000/avatars/${user[0].avatar}`" alt="avt">
        <div class="login-panel__dropdown">
          <button class="dropbtn">{{user[0].name}}</button>
          <div class="dropdown-content">
            <p><router-link to="/myroute" class="dropdown-content__link">Мой маршрут</router-link></p>
            <p><router-link to="/myfavorites" class="dropdown-content__link">Избранное</router-link></p>
            <p><router-link to="/settings" class="dropdown-content__link">Настройки</router-link></p>
            <p v-if="isAdmin"><router-link to="/admin" class="dropdown-content__link">Добавить место</router-link></p>
           </div>
        </div>
        <button class="login-panel__enter--btn" @click="openLoginPopup">{{isLogIn}}</button>
      </div>
  </div>

  <router-view></router-view>

  <div class="login--background" v-if="this.$store.state.showLoginPopup" @click.self="closeLoginPopup">
    <section class="login--window">
      <div class="login--window__title title">Вход</div>
      <button class="login--window__close--btn" @click="closeLoginPopup"> </button>
      <div class="login--window__form form">
        <input class="form__input--text" v-model="name" type="text" placeholder="Логин">
        <input class="form__input--text" v-model="password" type="password" placeholder="Пароль">
        <button class="btn" @click="login">Войти</button>
        <p>Впервые у нас? <router-link to="/registration" @click="closeLoginPopup">Зарегистрируйтесь</router-link></p>
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
export default {
  name: 'App',
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
        return "Войти"
      } else {
        return "Выйти"
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
    openLoginPopup(){
      if (this.$store.state.user[0].name === "Неопознанный турист"){
      this.$store.commit('setLoginPopup', true)
      } else {
        this.$store.state.user = [{name:'Неопознанный турист', avatar:'tourist.png'}]
      }
    },
    closeLoginPopup(){
      this.$store.commit('setLoginPopup', false);
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
        this.closeLoginPopup()
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

.app-container{
  height: 100%;
  position: relative;
}

body {
  margin:0;
  padding:0;
}

.panel {
  display: flex;
  justify-content: space-between;
  padding: 0 80px;
  height: 80px;
}

.header {
  background: linear-gradient(to bottom, rgb(255, 255, 255), rgb(242, 242, 242));
}

.footer {
  background: linear-gradient(to top, rgb(255, 255, 255), rgb(242, 242, 242));
}

.logo {
  display: flex;
  text-decoration: none;
  cursor: pointer;
  margin: auto 0;
}

.logo__icon--header {
  height: 40px;
  margin-right: 10px;
}

.logo__name {
  margin: auto 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.logo__name--header {
  font-size: 25px;
  color: #2c3e50;
}

.search-form {
  width: 50%;
  margin: auto;
}

.form__input--text {
  height: 35px;
  padding: 0 10px;
  border-color: #e4e4e4;
  border: 2px;
  border-radius: 5px;
  box-shadow: inset 0px 0px 5px rgba(193, 193, 193, 0.691);
}

.search-form__input {
  width: 50%;
  border-radius: 5px 0 0 5px;
}

.search-form__input:active, :hover, :focus {
    outline: 0;
    outline-offset: 0;
}

.btn {
  padding: 10px;
  background-color: rgb(0, 212, 141);
  color: white;
  border: 0px;
  border-radius: 5px;
  box-shadow: inset 0px 0px 5px rgba(193, 193, 193, 0.691);
  cursor: pointer;
}

.btn:hover {
  background-color: rgb(0, 201, 134);
}

.btn--disabled {
  padding: 10px;
  background-color: rgb(147, 147, 147);
  color: white;
  border: 0px;
  border-radius: 5px;
  box-shadow: inset 0px 0px 5px rgba(193, 193, 193, 0.691);
}
.btn--disabled:hover {
  cursor: auto;
  background-color: rgb(147, 147, 147);
}

.search-form__btn {
  border-radius: 0 5px 5px 0;
}

.login-panel {
  display: flex;
  text-align: end;
}

.login-panel__avatar {
  margin: auto;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  border: solid rgb(0, 0, 0) 1px;
}

.login-panel__enter--btn {
  border: 0;
  padding: 10px;
  font-size: 15px;
  background-color: transparent;
  cursor: pointer;
}

.login-panel__enter--btn:hover {
  color: red;
}

.login--background {
  position:absolute;
  background-color: rgba(49, 49, 49, 0.65);
  width:100%;
  height:100%;
  top:0;
  min-height: 100vh;
}

.login--window {
  position: fixed;
  top: 25%;
  left: 34%;
  width: 350px;
  background-color: white;
  padding: 25px 50px;
  border-radius: 10px;
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
  width: auto;
  gap: 20px;
}

.login--window__close--btn {
  position: absolute;
  border: none;
  background: url("http://localhost:3000/icons/close-btn.png") center/100% no-repeat;
  width: 25px;
  height: 25px;
  padding: 0;
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
  width: 190px;
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
  margin: auto;
}
.contacts__social-item {
  height: 30px;
  border-radius: 50%;
  padding: 8px;
  background-color: #c7c7c7;
}

.contacts__social-item:hover {
  background-color: #a0a0a0;
}

.logo__name--footer {
  width: 190px;
}

.dropbtn {
    background-color: transparent;
    padding: 15px;
    font-size: 18px;
    border: none;
    border-right: solid rgb(140, 140, 140) 2px;
}

.login-panel__dropdown {
    position: relative;
    display: inline-block;
    margin: auto;
}

.dropdown-content {
    display: none;
    position: absolute;
    right: 2px;
    top: 50px;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
}

.dropdown-content p {
    padding: 20px 16px;
    display: block;
    margin:0;
}

.dropdown-content__link {
  text-decoration: none;
  color: black;
}

.dropdown-content p:hover {background-color: #ddd;}

.login-panel__dropdown:hover .dropdown-content {display: block;}

.login-panel__dropdown:hover .dropbtn {
  color: green;
}
</style>
