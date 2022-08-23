<template>
  <div :class="{'avatar': !hideName, 'avatar-vertical': vertical}" v-if="userImg">
    <img 
      class='avatar__image'
      :class="{'avatar__image-big': big}" 
      :src="`http://localhost:3000/avatars/`+ userImg"
      alt="avt">
    <div v-if="!hideName" class="avatar__name">{{userName}}</div>
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  props: ['userName', 'userImg', 'hideName','vertical','big'],
}
</script>

<style lang="scss" scoped>
.avatar{
  @include flex-between-center-g15;
}

.avatar-vertical {
  @include flex-between-center-g15;
  flex-direction: column;
}

.avatar__image{
  height: 50px;
  width: 50px;
  border-radius: 50%;
}

.avatar__image-big{
  height: 100px;
  width: 100px;
}

.avatar__name {
  cursor: default;
  font-size: 18px;
  font-weight: 400;
}
</style>