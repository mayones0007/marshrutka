<template>
  <div>
    <div class="welcome" :class="{'welcome-mobile': !isDesktop}">
      <img class="welcome__picture" :src="`${$baseUrl}/img/${welcomeImage.image}`" alt="Маршрутка">
      <div class="welcome__text">{{ welcomeImage.text }}</div>
    </div>
    <MyButton
      v-if="!isDesktop"
      title="Фильтры"
      :icon="'filter.svg'"
      class="places__filters-button"
      @click="toggleFiltersSize"
    />
    <div v-if="isFullSizeFilters | isDesktop" class="places__filters" :class="{'places__filters-mobile': !isDesktop}">
      <Select
        :name="'Категория'"
        :fieldName="'category'"
      />
      <Select
        :name="'Сложность'"
        :fieldName="'difficulty'"
      />
      <Select
        :name="'На чем'"
        :fieldName="'way'"
      />
    </div>
    <div class="places__gallery">
      <PlacePreview
        v-for="place in filteredPlaces"
        :key="`place + ${place.id}`"
        :routePoint="place"
        :ShowText="true"
      />
    </div>
  </div>
</template>

<script>
import PlacePreview from './CustomComponents/PlacePreview.vue'
import Select from './CustomComponents/Select.vue'
import MyButton from './CustomComponents/MyButton.vue'
export default {
  components: {
    PlacePreview,
    Select,
    MyButton,
  },
  data(){
    return {
      isFullSizeFilters: false,
    }
  },
  computed: {
    selectedRegion() {
      return this.$store.state.placesModule.selectedRegion
    },
    filteredPlaces() {
      return this.$store.state.placesModule.filteredPlaces
    },
    welcomeImage() {
      if (this.selectedRegion) {
        return {image: this.filteredPlaces[0].picture, text: this.selectedRegion}
      } else {
        return {image: "chelovek-gora.jpeg", text: "Построй свой маршрут"}
      }
    },
    isDesktop(){
      return this.$store.state.appModule.isDesktop
    },
  },
  methods: {
    toggleFiltersSize() {
      this.isFullSizeFilters = !this.isFullSizeFilters;
    },
  },
  created() {
    this.$store.dispatch("getPlaces")
  }
}
</script>

<style lang="scss" scoped>

.places__gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  padding: 20px 0px;
}
.welcome {
  position:relative;
  height: 450px;
  &-mobile {
    height: 350px;
  }
}

.welcome__picture {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.welcome__text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 90%;
  font-size: min(max(40px, 6vw), 70px);
  color: white;
  font-weight: 900;
}

.places__filters {
  @include panel(to bottom);
  font-weight: 500;
  color: rgb(105, 105, 105);
  &-mobile {
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
  &-button {
    margin-top: 20px;
  }
}
</style>
