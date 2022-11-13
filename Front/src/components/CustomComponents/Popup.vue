<template>
  <div class="background" @click.self="setPopup">
    <div class="popup" :class="{'popup-mobile': !isDesktop}" ref="popup" @keyup.esc.stop="setPopup">
      <img :src="`${$baseUrl}/icons/close-btn.png`" class="popup__button-close" @click="setPopup">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name'],
  computed: {
    isDesktop(){
      return this.$store.state.appModule.isDesktop
    },
  },
  methods: {
    setPopup(){
      this.$store.commit('setPopup', '')
    },
  },
}
</script>

<style lang="scss" scoped> 
.background {
  @include background_popup;
}

.popup {
  position: fixed;
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  transform:translate(-50%,-50%);
  text-align: center;
  min-width: 340px;
}

.popup__button-close {
  position: absolute;
  width: 25px;
  height: 25px;
  right: 20px;
  top: 20px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.5);
  }
}
</style>