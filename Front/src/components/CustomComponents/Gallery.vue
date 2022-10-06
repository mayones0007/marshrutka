<template>
  <div v-if="currentPictures.length">
    <div class="gallery-container" :class="{'gallery-container-vertical': !isDesktop}">
      <img
        v-for="(n, i) in 3"
        :key="i"
        :src="`${$baseUrl}/img/${this.currentPictures[i]}`" 
        class="gallery-container__item"
        @click="openGalleryPopup(i)"
      >
      <div class="gallery-container__item" @click="openGalleryPopup(3)">
        <img
          :src="`${$baseUrl}/img/${this.currentPictures[3]}`" 
          class="gallery-container__item gallery-container__item-last-image" 
        >
        <div class="gallery-container__item-last-text">{{ picturesCount }}</div>
      </div>
    </div>
    <div class="background"  @click.self="closeGalleryPopup" v-if="showGallery">
      <div
        class="gallery-window"
        :class="{'gallery-window-mobile': !isDesktop}"
        tabindex="-1"
        @keyup.right.stop="switchGallaryPicture(1)"
        @keyup.left.stop="switchGallaryPicture(-1)"
        @keyup.esc.stop="closeGalleryPopup"
        ref="gallary"
      >
        <div class="gallery-window__button-close" @click="closeGalleryPopup"/>
        <div class="gallery-window__slider slider-left" @click="switchGallaryPicture(-1)">
          <div class="slider-btn-icon slider-btn-icon-left"/>
        </div>
        <img class="gallery-window__image" :src="$baseUrl+imageSrc">
        <div class="gallery-window__slider slider-right" @click="switchGallaryPicture(1)">
          <div class="slider-btn-icon slider-btn-icon-right"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick } from '@vue/runtime-core'
export default {
  name: 'Gallery',
  data() {
    return {
      currentPicture: 0,
    }
  },
  computed: {
    showGallery() {
      return this.$store.state.showGalleryPopup
    },
    currentPictures() {
      return this.$store.state.pictures
    },
    imageSrc(){
      return `/img/${this.currentPictures[this.currentPicture]}`
    },
    picturesCount() {
      return `+${this.currentPictures.length - 4}`
    },
    isDesktop(){
      return this.$store.state.isDesktop
    }
  },
  methods: {
    closeGalleryPopup() {
      this.$store.commit('setGalleryPopup')
    },
    switchGallaryPicture(i) {
      this.currentPicture = this.currentPicture + i
      if (this.currentPicture >= this.currentPictures.length) {
        this.currentPicture = 0
      }
      if (this.currentPicture < 0) {
        this.currentPicture = this.currentPictures.length -1
      }
    },
    openGalleryPopup(i){
      this.currentPicture = i;
      this.$store.commit('setGalleryPopup')
      nextTick(() => {
        this.$refs.gallary.focus()
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.gallery-container {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 3fr 1fr;
  gap: 10px;
}

.gallery-container-vertical {
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 3fr 1fr;
}

.gallery-container-vertical .gallery-container__item:first-child{
  grid-column: 1 / span 3;
}

.gallery-container__item {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;

  &:hover {
    filter:brightness(0.9);
  }

  &:first-child {
    grid-row: 1 / span 3;

    &:hover {
      filter:none;
    }
  }

  &:last-child {
    position: relative;

    &:hover .gallery-container__item-last-image{
    filter:brightness(0.3);
    }
  }
}

.gallery-container__item-last-image {
  filter:brightness(0.4);
}

.gallery-container__item-last-text {
  position: absolute;
  top: 50%;
  width: 100%;
  color: white;
  font-weight: 400;
  font-size: 3em;
  line-height: 0;
  text-align: center;
}

.background {
  @include background_popup;
  z-index: 2;
}

.gallery-window {
  position: fixed;
  display:flex;
  width: 70%;
  height: 80%;
  top: 10%;
  left: 15%;
  outline: none;
}

.gallery-window-mobile {
  width: 100%;
  height: 40%;
  top: 30%;
  left: 0;
}

.gallery-window__slider {
  width: 40%;
  z-index: 2;
  cursor: pointer;
}

.slider-right {
  margin-left: -40%;
  background: linear-gradient(90deg,transparent,rgba(0, 0, 0, 0.1));
}

.slider-left {
  margin-right: -40%;
  background: linear-gradient(-90deg,transparent,rgba(0, 0, 0, 0.1));
}

.slider-btn-icon{
  position: absolute;
  height: 20px;
  width: 20px;
  border-left: solid rgba(255, 255, 255, 0.7) 5px;
  border-top: solid rgba(255, 255, 255, 0.7) 5px;
  top: 50%;
}

.slider-btn:hover .slider-btn-icon{
  border-left: solid rgba(255, 255, 255, 0.9) 5px;
  border-top: solid rgba(255, 255, 255, 0.9) 5px;
}

.slider-btn-icon-left {
  left: 3%;
  transform: rotate(-45deg);
}

.slider-btn-icon-right {
  right: 3%;
  transform: rotate(135deg);
}

.slider-right:hover {
  background: linear-gradient(90deg,transparent,rgba(0, 0, 0, 0.3));
}

.slider-left:hover {
  background: linear-gradient(-90deg,transparent,rgba(0, 0, 0, 0.3));
}

.gallery-window__image {
  object-fit: cover;
  width: 100%;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
}

.gallery-window__button-close{
  position: absolute;
  background: url("https://marshrutka.su/api/icons/close-btn.png") center/100%;
  width: 25px;
  height: 25px;
  right: 20px;
  top: 20px;
  cursor: pointer;
  z-index: 3;
}

.gallery-window__button-close:hover {
  filter: brightness(0.2);
}
</style>