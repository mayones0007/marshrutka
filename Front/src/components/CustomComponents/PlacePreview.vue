<template>
  <router-link
    :to="{name: 'place', params: {id: routePoint.id}}" 
    class="gallery__item"
  >
    <div class="gallery__item-container">
      <img
        class="item__image"
        :src="`${$baseUrl}/min/${routePoint.picture}`"
        alt="avt"
      />
      <div v-if="ShowText" class="item__name">{{ routePoint.name }}</div>
    </div>
  </router-link>
</template>

<script>
  export default {
    name: 'PlacePreview',
    props: ['routePoint', 'ShowText'],
  }
</script>

<style scoped>

  .item__image {
    width: 300px;
    height: 200px;
    vertical-align: middle;
    object-fit: cover;
  }

  .gallery__item-container:hover{
    transform: scale(1.1);
  }

  .item__name {
    position: absolute;
    text-align: center;
    width: 100%;
    height: 100%;
    bottom: 0;
    line-height: 330px;
    font-size: 1.1em;
    color: white;
    font-weight: 700;
    background: linear-gradient(to left bottom, transparent, rgba(0, 0, 0, 0.589));
  }

  .gallery__item {
    overflow: hidden;
    width: 300px;
    height: 200px;
    border-radius: 15px;
    cursor: pointer;
  }

  .gallery__item-container {
    position: relative;
    transition: 300ms;
  }
</style>