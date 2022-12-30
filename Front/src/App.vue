<template>
  <div>
    <Header/>
    <div class="view" :class="{'view-mobile': !isDesktop}"><router-view class="view-page" :class="{'view-page-mobile': !isDesktop}"></router-view></div>
    <LoginPopup/>
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
    },
    isDesktop(){
      return this.$store.state.appModule.isDesktop
    },
  },
  mounted(){
    if(localStorage.getItem('userData')){
      this.$store.dispatch('getUser')
    }
    this.$store.dispatch("getFilters")
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
  .view {
    display: flex;
    min-height: calc(100vh - 160px);
    align-items: center;
    justify-content: center;
    &-mobile {
      min-height: calc(100vh - 220px);
    }
  }
  .view-page {
    padding: 2% 10%;
    &-mobile {
      padding: 5% 2%;
    }
  }
</style>
