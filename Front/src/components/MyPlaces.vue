<template>
  <div>
    <div class="welcome-image__text">Создай свой маршрут</div>
    <div class="places-container">
      <div class="menu__filters">
        <div>Регион: {{ selectedRegion }}</div>
        <div>Категория:
          <select class="places-filter" name="filter" v-model="Pfilter">
            <option value="all" selected>Все</option>
            <option value="waterfall">Водопады</option>
            <option value="lake">Озера</option>
            <option value="mountain">Горы</option>
            <option value="abonded">Заброшки</option>
          </select>
        </div>
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
export default {
  components: {
    PlacePreview
  },
  data() {
    return {
      Pfilter: "all",
    };
  },
  computed: {
    filteredPlaces() {
      if (this.selectedRegion === "Все" && this.Pfilter === "all") {
        return this.places;
      } else if (this.selectedRegion === "Все") {
        return this.places.filter((item) => item.tag === this.Pfilter);
      } else if (this.Pfilter === "all") {
        return this.places.filter((item) => item.region === this.selectedRegion);
      }
      return this.places.filter(
        (item) => item.tag === this.Pfilter && item.region === this.selectedRegion
      )
    },
    selectedRegion() {
      return this.$store.state.selectedRegion;
    },
    places() {
      return this.$store.state.places;
    },
    isDesktop(){
      return this.$store.state.isDesktop
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

.welcome-image__text {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: min(max(50px, 6vw), 70px);
  color: white;
  height: 450px;
  font-weight: 900;
  user-select: none;
  background: url("https://marshrutka.su/api/img/chelovek-gora.jpeg") center -280px;
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
