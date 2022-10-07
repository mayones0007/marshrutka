<template>
  <div class="footer">
    <div class="footer__contacts-typical" :class="{'footer__contacts-typical-mobile': !isDesktop}">
      <a href="mailto:macs0007@mail.ru" class="contacts-typical__item">
        <img :src="`${$baseUrl}/icons/mail.svg`" alt="mail"> macs0007@mail.ru
      </a>
      <a href="tel:+79014534841" class="contacts-typical__item">
        <img :src="`${$baseUrl}/icons/phone.svg`" alt="phone"> +79014534841
      </a>
    </div>
    <div class="footer__contacts-social">
      <a v-for="social in socials" :key="social.alt" :href="social.ref">
        <img :src="social.icon" :alt="social.alt" class="contacts-social__item">
      </a>
    </div>
    <router-link to="/" class="footer__logo-name" :class="{'footer__logo-name-mobile': !isDesktop}">© 2022, Marshrutka Limited Sochifornia</router-link>
  </div>
</template>

<script>
import { socials } from '../../data/socials.data'
export default {
  data() {
    return {
        socials: socials,
    };
  },
  computed: {
    isDesktop(){
      return this.$store.state.isDesktop
    }
  }
}
</script>

<style lang="scss" scoped> 
.footer {
  @include panel(to top);
  position: relative;
  z-index: 1;
  font-weight: 300;
  font-size: 0.9em;
}

.footer__logo-name{
  @include link-reset;
  width: 200px;
  text-align: end;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 20px;
}

.footer__logo-name-mobile{
  width: 300px;
  text-align: center;
  height: 30px;
  justify-content: flex-start;
}

.footer__contacts-typical {
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  align-items: flex-start;
  height: 80px;
}

.footer__contacts-typical-mobile {
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-evenly;
  width: 100%;
  height: 30px;
}

.contacts-typical__item {
  @include link-reset;
  display: flex;
  gap: 5px;
}

.contacts-typical__item:hover {
  filter: brightness(1.1);
}

.footer__contacts-social {
  @include flex-between-center-g15;
  height: 80px;
}
.contacts-social__item {
  height: 30px;
  border-radius: 50%;
  padding: 8px;
  background-color: #c7c7c7;
  transition: 500ms;
}

.contacts-social__item:hover {
  background-color: #a0a0a0;
}
</style>