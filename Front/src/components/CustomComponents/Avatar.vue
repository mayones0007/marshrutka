<template>
  <div class="avatar" :class="{'avatar-vertical': isVertical}">
    <img
      v-if="userImg"
      class='avatar__image'
      :class="{'avatar__image-big': isBig}" 
      :src="userImg"
      alt="avt">
    <div v-if="userName" class="avatar__name" :class="{'avatar__name-big': isBig}" >{{userName}}</div>
  </div>
</template>

<script>
export default {
  props: ['userName', 'userImg', 'isVertical', 'isBig']
}
</script>

<style lang="scss" scoped>
.avatar{
  @include flex-between-center-g15;
  &-vertical {
    flex-direction: column;
  }
}

.avatar__image{
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
  &-big {
    height: 150px;
    width: 150px;
  }
}

.avatar__name {
  font-weight: 300;
  &-big {
    font-size: 2rem;
  }
}
</style>