<template>
  <router-link
    :to="{name: 'Description', params: {eng: this.routePoint.eng}}" 
    class="gallery__item"
  >
    <div class="gallery__item-container">
      <img
        class="item__image"
        :src="`${$baseUrl}/img/` + currentPicture + `.jpeg`"
        alt="avt"
      />
      <div v-if="ShowText" class="item__name">{{ routePoint.name }}</div>
    </div>
  </router-link>
</template>

<script>
  export default {
    name: 'PlacePreview',
    props: ['routePoint', 'picture', 'ShowText'],
    computed: {
      currentPicture() {
        return this.$store.state.pictures.map(item => item[this.routePoint.eng])
      },
    }
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
    height: 50%;
    bottom: 0;
    line-height: 140px;
    color: white;
    font-size: 16px;
    font-weight: 700;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.591));
  }

  .gallery__item {
    overflow: hidden;
    width: 300px;
    height: 200px;
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
    background: url("https://marshrutka.su/api/img/chelovek-gora.jpeg") center -280px;
  }
</style>