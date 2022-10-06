<template>
  <button
    class="button"
    :class="{'button-disabled': isDisabled, 'button-no-left-radius': noLeftRadius,'button-red': isRed}"
    :disabled="isDisabled"><div class="button__content" :class="{'button__content-vertical': vertical}"><img v-if="icon" :src="`${$baseUrl}/icons/${icon}`" alt="icon">{{ title }}</div>
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
  border: 0px;
  border-radius: 5px;
  box-shadow: inset 0px 0px 5px rgba(193, 193, 193, 0.691);
  cursor: pointer;
  font-family: 'Roboto', Arial, sans-serif;
  &:hover {
    filter: grayscale(0.2);
  }

  &-disabled {
    background-color: rgb(147, 147, 147);
    cursor: default;
  }
  &-red {
    background-color: rgb(255, 117, 117);
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