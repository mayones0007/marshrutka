<template>
  <div>
    <Header/>
    <router-view></router-view>
    <LoginPopup v-if="this.$store.state.appModule.showLoginPopup"/>
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
  data: () => ({
    timeout: null
  }),
  computed: {
    getUser() {
      return this.$store.state.userModule.user
    }
  },
  mounted(){
    if(localStorage.getItem('userData')){
      this.$store.dispatch('getUser')
    } else {
      this.$store.dispatch('logOut')
    }
    this.$store.commit('setIsDesktop', isDesktop())
    window.addEventListener('resize', () => {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => this.$store.commit('setIsDesktop', isDesktop()), 100);
    })    
  },
}
</script>

<style lang="scss"> 
  @import "./styles/main.scss";
</style>
