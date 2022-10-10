<template>
  <div class="share-button">
    <img :src="`${$baseUrl}/icons/share.svg`" alt="share" class="share-button__icon" @click="setShowShareLinks()">
    <div v-if="showShareLinks" class="share-button__links" :class="{'share-button__links-mobile': !isDesktop}">
      <a v-for="social in socials" :key="social.alt" :href="social.shareref + this.$route.path" target="_blank">
        <img :src="social.icon" :alt="social.alt" class="links__item">
      </a>
    </div>
  </div>
</template>

<script>
import { socials } from '../../data/socials.data'

export default {
  data() {
    return {
      socials: socials,
      showShareLinks: false,
    };
  },
  computed: {
    isDesktop(){
      return this.$store.state.appModule.isDesktop
    }
  },
  methods: {
    setShowShareLinks() {
      this.showShareLinks = !this.showShareLinks
    }
  }
}
</script>

<style lang='scss' scoped>
.share-button {
  position: relative;
  cursor: pointer;
  align-self: center;
  justify-self: center;
  height: 25px;
  width: 25px;
}

.share-button__icon {
  height: 100%;
  width: 100%;
}

.share-button__links {
  position: absolute;
  display: grid;
  bottom: -250px;
  right: 50%;
  transform: translate(50%,0);
  background-color: #f1f1f1;
  border-radius: 5px;
}

.share-button__links-mobile {
  bottom: 60px;
}

.links__item {
  width: 30px;
  height: 30px;
  padding: 10px;
  filter: invert(0.9);
  border-radius: 5px;
  &:hover {
    background-color: #040404;
  }
}
</style>