<template>
  <div>
    <div class="welcome">
      <img class="welcome__image" :src="`${$baseUrl}/img/chelovek-gora.jpeg`" alt="Маршрутка">
      <div class="welcome__text">{{ welcomeText }}</div>
    </div>
    <div class="places-container">
      <div class="menu__filters">
        <div>Категория:
          <select class="places-filter" name="filter" v-model="Pfilter">
            <option v-for="type in placesTypes" :key="type" >{{type}}</option>
          </select>
        </div>
        <div>Уровень сложности:
          <select class="places-filter">
            <option v-for="level in placesLevels" :key="level" >{{level}}</option>
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
      Pfilter: '',
    };
  },
  computed: {
    // @TO-DO !!!! 
    filteredPlaces() {
      if (!this.selectedRegion && !this.Pfilter) {
        return this.places;
      } else if (!this.selectedRegion) {
        return this.places.filter((item) => item.tag === this.Pfilter)
      } else if (!this.Pfilter) {
        return this.places.filter((item) => item.region === this.selectedRegion)
      }
      return this.places.filter(
        (item) => item.tag === this.Pfilter && item.region === this.selectedRegion
      )
    },
    selectedRegion() {
      return this.$store.state.placesModule.selectedRegion
    },
    places() {
      return this.$store.state.placesModule.places
    },
    placesTypes() {
      return new Set(this.places.map((place) => place.tag))
    },
    placesLevels() {
      return new Set(this.places.map((place) => place.difficulty))
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
