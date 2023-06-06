<template>
  <div class="page">
    <div class="welcome" :class="{'welcome-mobile': !isDesktop}">
      <img class="welcome__picture" :src="`${$baseUrl}/img/${welcomeImage.image}`" alt="Маршрутка">
      <div class="welcome__text">{{ welcomeImage.text }}</div>
    </div>
    <div v-if="!isDesktop" class="filters">
    <MyButton
      title="Фильтры"
      :icon="'filter.svg'"
      class="filters-button"
      @click="toggleFiltersSize"
    />
    <div class="switcher">
      <div class="switcher__item" :class="{'switcher__item-active': isCurrentType('places')}" @click="setItems('places')">Места</div>
      <div class="switcher__item" :class="{'switcher__item-active': isCurrentType('routes')}" @click="setItems('routes')">Маршруты</div>
    </div>
    </div>
    <div v-if="isFullSizeFilters | isDesktop" class="filters" :class="{'filters-mobile': !isDesktop}">
      <div v-for="filter in currentFilters" :key="filter">
        <Select
          v-if="!filter.admin || filter.admin === isAdmin"
          :name="filter.name"
          :fieldName="filter.fieldName"
          :table="itemsType"
        />
      </div>
      <div v-if="isDesktop" class="switcher">
        <div class="switcher__item" :class="{'switcher__item-active': isCurrentType('places')}" @click="setItems('places')">Места</div>
        <div v-if="this.routes.length" class="switcher__item" :class="{'switcher__item-active': isCurrentType('routes')}" @click="setItems('routes')">Маршруты</div>
      </div>
    </div>
    <div class="places" :class="{'places-mobile': !isDesktop}">
      <MasonryWall :items="items" :columnWidth="350" :type="itemsType"/>
      <LoadingSpinner
        v-if="itemsType === 'places' ? !isLastPage : !isLastRoutesPage"
        noBackGround=true
      />
    </div>
  </div>
</template>

<script>
import Select from './CustomComponents/Select.vue'
import MyButton from './CustomComponents/MyButton.vue'
import MasonryWall from './CustomComponents/MasonryWall.vue'
import LoadingSpinner from './CustomComponents/LoadingSpinner.vue'
import { routeFields } from '../data/route.fields'
import { placeFields } from '../data/place.fields'
export default {
  components: {
    Select,
    MyButton,
    MasonryWall,
    LoadingSpinner
  },
  data(){
    return {
      isFullSizeFilters: false,
      itemsType: 'routes',
      routeFields,
      placeFields
    }
  },
  computed: {
    selectedRegion() {
      return this.$store.state.placesModule.selectedRegion
    },
    places() {
      return this.$store.state.placesModule.places
    },
    routes() {
      return this.$store.state.placesModule.routes
    },
    welcomeImage() {
      if (this.selectedRegion) {
        return {image: this.places[0].picture, text: this.selectedRegion}
      } else {
        return {image: "chelovek-gora.jpeg", text: "Построй свой маршрут"}
      }
    },
    isDesktop(){
      return this.$store.state.appModule.isDesktop
    },
    currentFilters() {
      return this.itemsType === 'places'? this.placeFields.filter((field) => field.filter) : this.routeFields.filter((field) => field.filter)
    },
    isLastPage(){
      return this.$store.state.placesModule.isLastPage
    },
    isLastRoutesPage(){
      return this.$store.state.placesModule.isLastRoutesPage
    },
    items() {
      return this.$store.state.placesModule[this.itemsType]
    },
    isAdmin() {
      return this.$store.state.userModule.user.role === "admin"
    },
  },
  methods: {
    toggleFiltersSize() {
      this.isFullSizeFilters = !this.isFullSizeFilters;
    },
    setItems(itemsType) {
      this.itemsType = itemsType
      this.$store.commit('resetAppliedFilters')
      this.$store.dispatch(this.currentMethod())
    },
    isCurrentType(itemsType){
      return itemsType === this.itemsType
    },
    currentMethod() {
      return this.itemsType === 'routes' ? 'getRoutes' : 'getPlaces'
    },
    loadMorePlaces() {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(async() => {
        if (document.body.scrollHeight - window.innerHeight - 200 < window.scrollY && !this.isLastPage) {
          this.$store.dispatch(this.currentMethod(), this.$store.state.placesModule.page)
        }
      }, 100)
    }
  },
  mounted() {
    this.$store.dispatch("getRoutes")
    this.$store.dispatch("getPlaces")
    window.addEventListener('scroll', this.loadMorePlaces) 
  },

  unmounted() {
    window.removeEventListener('scroll', this.loadMorePlaces)
    clearTimeout(this.timeout)
  },
}
</script>

<style lang="scss" scoped>
.page {
  padding: 0;
  width: 100%;
}
.places {
  padding: 2% 10%;
  &-mobile {
    padding: 2%;
  }
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

.filters {
  @include panel(to bottom);
  font-weight: 500;
  color: rgb(105, 105, 105);
  &-mobile {
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
  &-button {
    margin: 20px 0;
  }
}

.switcher {
  display: flex;
  gap: 15px;
  font-weight: 400;
  font-size: 18px;
  text-transform: uppercase;
  &__item {
    cursor: pointer;
    &-active {
      color: red;
    }
    &:hover {
      color: red;
    }
  }
}
</style>
