<template>
    <button
      class="button"
      :class="{'button_disabled': isDisabled, 'button_no-left-radius': noLeftRadius,'button_red': isRed}"
      :disabled="isDisabled">{{ title }}
    </button>
</template>

<script>
export default {
  name: 'MyButton',
  props: ['title', 'isDisabled', 'noLeftRadius', 'isRed'],
}
</script>

<style lang="scss" scoped>
.button {
  padding: 10px;
  background-color: rgb(0, 212, 141);
  color: white;
  border: 0px;
  border-radius: 5px;
  box-shadow: inset 0px 0px 5px rgba(193, 193, 193, 0.691);
  cursor: pointer;

  &:hover {
    filter: grayscale(0.2);
  }

  &_disabled {
    background-color: rgb(147, 147, 147);
    cursor: default;
  }
  &_red {
    background-color: rgb(255, 98, 98);
  }

  &_no-left-radius {
    border-radius: 0 5px 5px 0;
  }
}
</style>