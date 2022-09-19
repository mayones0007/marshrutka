<template>
  <div class="title">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'MyTitle',
  props: ['text'],
}
</script>

<style lang="scss" scoped>
  .title {
    color: #2c3e50;
    font-size: 22px;
    font-weight: 700;
    margin: 20px 0;
}
</style>