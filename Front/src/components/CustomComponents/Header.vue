<template>
  <div class="header">
    <router-link to="/" class="logo">
      <img class="logo__icon" src="http://localhost:3000/icons/logo.svg" alt="Маршрутка">
      <div class="logo__name">Маршрутка</div>
    </router-link>
      <div class="search-form">
        <input class="search-form__input-text" type="text" list="region" placeholder="Куда вы собираетесь?" v-model="selectedCity">
        <datalist id="region">
          <option value="Абхазия">Abkhazia</option>
          <option value="Сочи">Sochi</option>
          <option value="Красная Поляна">Krasnaia Polyana</option>
          <option value="Все">All</option>
        </datalist>
        <MyButton title="Поиск" :noLeftRadius="true" @click="setSelectedCity"/>
      </div>
      <div class="user-menu">
        <Avatar
          :userName="userInfo.name"
          :userImg="userInfo.avatar"
        />
        <div class="user-menu__arrow" v-if="!isLogIn"></div>
        <div class="user-menu__dropdown-content" v-if="!isLogIn">
          <router-link to="/myroute" class="dropdown-content__link">Мой маршрут</router-link>
          <router-link to="/myfavorites" class="dropdown-content__link">Избранное</router-link>
          <router-link to="/settings" class="dropdown-content__link">Настройки</router-link>
          <router-link to="/admin" class="dropdown-content__link" v-if="isAdmin">Добавить место</router-link>
          <div class="dropdown-content__link" @click="setLoginPopup">Выйти</div>
        </div>
        <div class="login-panel__button-login" @click="setLoginPopup" v-if="isLogIn">Войти</div>
      </div>
  </div>
</template>

<script>
import { router } from '../../router'
import MyButton from './MyButton.vue'
import Avatar from './Avatar.vue'
export default {
  name: 'Header',
  components: {
    MyButton,
    Avatar
  },
  data: () => ({
    selectedCity: '',
  }),

  computed:{
    user() {
      return this.$store.state.user
    },
    isLogIn(){
      if (Object.keys(this.user).length){
        return false
      } else {
        return true
      }
    },
    userInfo() {
      return {
        name: this.user.name ? this.user.name : 'Неопознанный турист',
        avatar: this.user.avatar ? this.user.avatar : 'tourist.png'
      }
    },
    isAdmin(){
      if(this.user.name === "Admin"){
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    setLoginPopup(){
      if (this.isLogIn){
        this.$store.commit('setLoginPopup')
      } else {
        this.$store.dispatch('logOut')
        router.push({ name: "MyPlaces" })
      }
    },
    setSelectedCity () {
      this.$store.commit('setSelectedCity', this.selectedCity);
      this.selectedCity = "";
    },
  },
}
</script>

<style lang="scss" scoped> 

.header {
  @include panel(to bottom);
}

.logo {
  @include flex-between-center-g15;
  text-decoration: none;
  color: black;
  font-size: 20px;
  height: 80px;
}

.logo__icon {
  height: 50px;
}

.search-form {
  display: flex;
}

.search-form__input-text {
  @include input;
  border-radius: 5px 0 0 5px;
  width: 250px;
}

.user-menu__name {
  cursor: default;
  font-weight: 500;
}

.user-menu__arrow {
  border-bottom: solid 2px black;
  border-left: solid 2px black;
  width: 10px;
  height: 10px;
  transform: rotate(135deg);
  margin-top: 5px;
  transition-duration: 400ms;
}

.login-panel__button-login {
  border-left: solid rgba(100, 100, 100, 0.5) 2px;
  cursor: pointer;
  padding: 10px;
}

.login-panel__button-login:hover {
  color: green;
}

.user-menu {
  @include flex-between-center-g15;
  position: relative;
  z-index: 1;
  height: 80px;
}

.user-menu__dropdown-content {
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
  cursor: pointer;
}

.user-menu:hover .user-menu__arrow {
  transform: rotate(-45deg);
  margin-bottom: 10px;
}

.user-menu:hover .dropdown-content__link {
  line-height: 300%;
  color: black;
}
</style>
