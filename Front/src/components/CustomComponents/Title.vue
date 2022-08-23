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
    text-align: center;
    color: #2c3e50;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
}
</style>