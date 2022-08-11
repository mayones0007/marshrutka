<template>
  <div class="login--background"  @click.self="closeGalleryPopup">
    <div class="gallery-window">
      <div class="gallery-window__close-button" @click="closeGalleryPopup"/>
      <div class="gallery-window__slider slider-btn-left" @click="switchGallaryPicture(-1)"><div class="slider-btn-icon slider-btn-icon-left"/></div>
      <img class="gallery-window__image" :src="imageSrc" >
      <div class="gallery-window__slider slider-btn-right" @click="switchGallaryPicture(1)"><div class="slider-btn-icon slider-btn-icon-right"/></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Gallery',
  props: ['images', 'openedPicture'],
  data() {
    return {
      currentPicture: 0,
    }
  },
  computed: {
    imageSrc(){
      return `http://localhost:3000/img/${this.images[this.currentPicture]}`
    },
  },
  methods: {
    closeGalleryPopup() {
      this.$store.commit('setGalleryPopup', false);
    },
    switchGallaryPicture(i) {
      this.currentPicture = this.currentPicture + i
      if (this.currentPicture >= this.images.length) {
        this.currentPicture = 0
      }
      if (this.currentPicture < 0) {
        this.currentPicture = this.images.length -1
      }
    },
  },
  created() {
    this.currentPicture = this.openedPicture
  }
}
</script>

<style lang="scss">
.gallery-window {
  position: fixed;
  display:flex;
  width: 70%;
  height: 80%;
  top: 10%;
  left: 15%;
}

.gallery-window__slider {
  width: 40%;
  z-index: 2;
  cursor: pointer;
}

.slider-btn-right {
  margin-left: -40%;
  background: linear-gradient(90deg,transparent,rgba(0, 0, 0, 0.1));
}

.slider-btn-left {
  margin-right: -40%;
  background: linear-gradient(-90deg,transparent,rgba(0, 0, 0, 0.1));
}

.slider-btn-icon{
  position: absolute;
  height: 20px;
  width: 20px;
  border-left: solid rgba(255, 255, 255, 0.7) 5px;
  border-top: solid rgba(255, 255, 255, 0.7) 5px;
  top: 48%;
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

.slider-btn-right:hover {
  background: linear-gradient(90deg,transparent,rgba(0, 0, 0, 0.3));
}

.slider-btn-left:hover {
  background: linear-gradient(-90deg,transparent,rgba(0, 0, 0, 0.3));
}

.gallery-window__image {
  object-fit: cover;
  width: 100%;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
}

.gallery-window__close-button{
  position: absolute;
  background: url("http://localhost:3000/icons/close-btn.png") center/100%;
  width: 25px;
  height: 25px;
  right: 20px;
  top: 20px;
  cursor: pointer;
  z-index: 3;
}

.gallery-window__close-button:hover {
  filter: brightness(0.2);
}
</style>