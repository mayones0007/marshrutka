<template>
  <div class="app-container">
    <Header/>
    <router-view></router-view>
    <LoginPopup v-if="this.$store.state.showLoginPopup"/>
    <Footer/>
</div>
</template>

<script>
import Header from './components/CustomComponents/Header.vue'
import Footer from './components/CustomComponents/Footer.vue'
import LoginPopup from './components/CustomComponents/LoginPopup.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    LoginPopup
  },
    created(){
      if(JSON.parse(localStorage.getItem('userData'))){
        this.$store.commit('setUser', JSON.parse(localStorage.getItem('userData')))
      } else {
        this.$store.state.user.user = [{name:'Неопознанный турист', avatar:'tourist.png'}]
      }
  },
}
</script>

<style lang="scss"> 
@import "./styles/main.scss";

</style>
