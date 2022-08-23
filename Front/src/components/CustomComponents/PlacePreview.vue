<template>
    <router-link
      :to="{name: 'Description', params: {eng: this.routePoint.eng}}" 
      class="gallery__item"
    >
      <div class="gallery__item-container">
        <img
          class="item__image"
          :src="`http://localhost:3000/img/` + routePoint.eng + `.jpeg`"
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
  .gallery {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    padding: 20px 0;
  }

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
    height: 50%;
    bottom: 0;
    line-height: 130px;
    color: white;
    font-weight: 900;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.591));
  }

  .gallery__item {
    overflow: hidden;
    border-radius: 10px;
    cursor: pointer;
    border: solid 1px rgba(0, 0, 0, 0.076);
  }

  .gallery__item-container {
    position: relative;
    transition: 300ms;
  }

  .welcome-image__text {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 70px;
    color: white;
    height: 450px;
    font-weight: 900;
    user-select: none;
    background: url("http://localhost:3000/img/chelovek-gora.jpeg") center -280px;
  }
</style>