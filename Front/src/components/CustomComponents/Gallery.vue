<template>
  <div v-if="pictures.length">
    <div class="gallery-container" :class="{'gallery-container-vertical': !isDesktop}">
      <img
        :src="`${$baseUrl}/img/${this.pictures[0]}`" 
        class="gallery-container__item"
        @click="openGalleryPopup(0)"
      >
      <img
        v-for="i in picturesCount"
        :key="this.pictures[i]"
        :src="`${$baseUrl}/min/${this.pictures[i]}`" 
        class="gallery-container__item"
        @click="openGalleryPopup(i)"
      >
      <div v-if="this.pictures[picturesCount]" class="gallery-container__item" @click="openGalleryPopup(picturesCount + 1)">
        <img
          :src="`${$baseUrl}/min/${this.pictures[picturesCount + 1]}`" 
          class="gallery-container__item" 
        >
        <div v-if="this.pictures.length > 4" class="gallery-container__item-last-text">+{{gallaryCount}}</div>
      </div>
    </div>
    <div class="background"  @click.self="closeGalleryPopup" v-if="showGallery">
      <div
        ref="gallary"
        tabindex="-1"
        class="gallery-window"
        :class="{'gallery-window-mobile': !isDesktop}"
        @keyup.right.stop="switchGallaryPicture(1)"
        @keyup.left.stop="switchGallaryPicture(-1)"
        @keyup.esc.stop="closeGalleryPopup"
      >
        <img :src="`${$baseUrl}/icons/close-btn.png`" class="gallery-window__button-close" @click="closeGalleryPopup"/>
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
  props: ['pictures'],
  data() {
    return {
      currentPicture: 0,
      showGallery: false
    }
  },
  computed: {
    imageSrc(){
      return `/img/${this.pictures[this.currentPicture]}`
    },
    gallaryCount() {
      return this.pictures.length-4
    },
    picturesCount() {
      return this.pictures.length < 4 ? this.pictures.length : 2
    },
    isDesktop(){
      return this.$store.state.appModule.isDesktop
    },
  },
  methods: {
    closeGalleryPopup() {
      this.showGallery = false
    },
    switchGallaryPicture(i) {
      this.currentPicture = this.currentPicture + i
      if (this.currentPicture >= this.pictures.length) {
        this.currentPicture = 0
      }
      if (this.currentPicture < 0) {
        this.currentPicture = this.pictures.length -1
      }
    },
    openGalleryPopup(i){
      this.currentPicture = i;
      this.showGallery = true
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
  gap: 5px;
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

.gallery-container__item-last-text {
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-weight: 400;
  font-size: min(max(30px, 4vw));
}

.background {
  @include background_popup;
  z-index: 2;
}

.gallery-window {
  position: fixed;
  display:flex;
  width: 80%;
  min-height: 80vh;
  max-height: 80vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  outline: none;
}

.gallery-window-mobile {
  width: 100%;
  min-height: 40vh;
  max-height: 100vh;
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
}

.gallery-window__button-close{
  position: absolute;
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