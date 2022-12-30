<template>
  <button
    class="button"
    :class="{'button-disabled': isDisabled, 'button-no-left-radius': noLeftRadius,'button-red': isRed}"
    :disabled="isDisabled">
    <div class="button__content" :class="{'button__content-vertical': vertical}">
      <img v-if="icon" :src="`${$baseUrl}/icons/${icon}`" alt="icon">
      {{ title }}
    </div>
  </button>
</template>

<script>
export default {
  name: 'MyButton',
  props: ['title', 'icon', 'isDisabled', 'noLeftRadius', 'isRed', 'vertical'],
}
</script>

<style lang="scss" scoped>
.button {
  padding: 10px;
  background-color: rgb(0, 201, 134);
  color: white;
  border: none;
  -webkit-appearance: none;
  box-sizing: border-box;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Roboto', Arial, sans-serif;
  font-size: 0.9em;
  &:hover {
    filter: grayscale(0.2);
    border: none;
  }
  &:focus {
    border: none;
  }
  &-disabled {
    background-color: rgb(172, 172, 172);
    cursor: default;
  }
  &-red {
    background-color: rgb(255, 108, 108);
  }

  &-no-left-radius {
    border-radius: 0 5px 5px 0;
  }

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
      &-vertical {
        flex-direction: column;
      }
  }
}
</style>