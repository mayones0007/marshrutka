<template>
  <div>
    <div class="welcome">
      <img class="welcome__image" :src="`${$baseUrl}/img/chelovek-gora.jpeg`" alt="Маршрутка">
      <div class="welcome__text">{{ welcomeText }}</div>
    </div>
    <div class="places-container">
      <div class="menu__filters">
        <Select
          :name="'Категория'"
          :fieldName="'tag'"
        />
        <Select
          :name="'Сложность'"
          :fieldName="'difficulty'"
        />
      </div>
      <div class="gallery">
        <PlacePreview
          v-for="place in filteredPlaces"
          :key="`place + ${place.id}`"
          :routePoint="place"
          :ShowText="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PlacePreview from './CustomComponents/PlacePreview.vue'
import Select from './CustomComponents/Select.vue'
export default {
  components: {
    PlacePreview,
    Select,
  },
  computed: {
    selectedRegion() {
      return this.$store.state.placesModule.selectedRegion
    },
    filteredPlaces() {
      return this.$store.state.placesModule.filteredPlaces
    },
    welcomeText() {
      if (this.selectedRegion) {
        return this.selectedRegion
      } else {
        return "Построй свой маршрут"
      }
    }
  },
  created() {
    this.$store.dispatch("getPlaces")
  }
}
</script>

<style lang="scss" scoped>

.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  padding: 20px 0;
}
.welcome {
  position:relative;
  height: 450px;
}

.welcome__image {
  width: 100%;
  height: 100%;
  object-fit: none;
  object-position: center -300px;
}

.welcome__text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 90%;
  font-size: min(max(50px, 6vw), 70px);
  color: white;
  font-weight: 900;
}

.menu__filters {
  @include panel(to bottom);
  font-weight: 500;
  color: rgb(105, 105, 105);
}

.places-filter {
  @include input;
}
</style>
