<template>
  <div
    class="avatar"
    :class="[
      { 'avatar-vertical': isVertical },
      { 'avatar-small': isSmall },
    ]"
  >
    <img
      v-if="userImg"
      class='avatar__image'
      :class="[
        { 'avatar__image-big': isBig },
        { 'avatar__image-small': isSmall }
      ]" 
      :src="userImg"
      alt="avt">
    <div
      v-if="userName"
      class="avatar__name"
      :class="[
        { 'avatar__name-big': isBig },
      ]"
    >
      {{userName}}
    </div>
  </div>
</template>

<script>
export default {
  props: ['userName', 'userImg', 'isVertical', 'isBig', 'isSmall']
}
</script>

<style lang="scss" scoped>
.avatar{
  @include flex-between-center-g15;

  &-vertical {
    flex-direction: column;
  }

  &-small {
    gap: 5px;
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

  &-small {
    height: 30px;
    width: 30px;
  }
}

.avatar__name {
  font-weight: 300;

  &-big {
    font-size: 2rem;
  }
}
</style>