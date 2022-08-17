<template>
<div :class="{'user': !hideName, 'user-vertical': vertical}">
  <img 
    class='user__avatar'
    :class="{'user__avatar-big': big}" 
    :src="`http://localhost:3000/avatars/avt-` + user + `.jpeg`"
    onerror="this.src = 'http://localhost:3000/avatars/tourist.png'"
    alt="avt">
  <div v-if="!hideName" class="user__name">{{user}}</div>
</div>
</template>

<script>
export default {
  name: 'Avatar',
  props: ['user','hideName','vertical','big'],
}
</script>

<style lang="scss" scoped>
.user{
  @include flex-between-center-g15;
}

.user-vertical {
  @include flex-between-center-g15;
  flex-direction: column;
}

.user__avatar{
  height: 50px;
  width: 50px;
  border-radius: 50%;
}

.user__avatar-big{
  height: 100px;
  width: 100px;
}

.user__name {
  cursor: default;
  font-size: 18px;
  font-weight: 400;
}
</style>