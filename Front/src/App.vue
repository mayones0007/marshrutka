<template>
  <div>
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
import { isDesktop } from './services/screenSize.service'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    LoginPopup
  },
  mounted(){
    if(localStorage.getItem('userData')){
      this.$store.dispatch('getUser')
    } else {
      this.$store.dispatch('logOut')
    }
    this.$store.commit('setIsDesktop', isDesktop())
    window.addEventListener('resize', () => {this.$store.commit('setIsDesktop', isDesktop())})
  },
}
</script>

<style lang="scss"> 
  @import "./styles/main.scss";
</style>
