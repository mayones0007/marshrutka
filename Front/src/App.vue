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
  async created(){
    if(JSON.parse(localStorage.getItem('userData'))){
      await this.$store.dispatch('getUser')
    } else {
      this.$store.dispatch('logOut')
    }
  },
}
</script>

<style lang="scss"> 

@import "./styles/main.scss";

</style>
