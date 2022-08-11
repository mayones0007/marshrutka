<template>
<div>
  <div class="welcome-image__text">Создай свой маршрут</div>
  <div class="places-container">
    <div class="menu__filters panel">
      <div class="region-name" v-if="selectedCity">{{ selectedCity }}</div>
      <div class="filter-name">Фильтр:
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
      <div
        v-for="(place, index) in filteredPlaces"
        :key="`place-${index}`"
        class="gallery__item"
        @click="openModal(place.eng)"
      >
        <div class="gallery__item-container">
          <img
            class="item__image"
            :src="`http://localhost:3000/img/` + place.eng + `.jpeg`"
            alt="avt"
          />
          <div class="item__name">{{ place.name }}</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { router } from "../router";
export default {
  data() {
    return {
      Pfilter: "all",
    };
  },
  computed: {
    filteredPlaces() {
      if (this.selectedCity === "" && this.Pfilter === "all") {
        return this.places;
      } else if (this.selectedCity === "") {
        return this.places.filter((item) => item.tag === this.Pfilter);
      } else if (this.Pfilter === "all") {
        return this.places.filter((item) => item.region === this.selectedCity);
      }
      return this.places.filter(
        (item) => item.tag === this.Pfilter && item.region === this.selectedCity
      );
    },
    selectedCity() {
      return this.$store.state.selectedCity;
    },
    places() {
      return this.$store.state.places;
    },
  },
  methods: {
    openModal(eng) {
      router.push({ name: "Description", params: { eng } });
    },
  },
  created() {
    this.$store.dispatch("getPlaces");
  },
};
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: white;
  height: 450px;
  font-weight: 900;
  user-select: none;
  background: url("http://localhost:3000/img/chelovek-gora.jpeg") center -280px;
}

.menu__filters {
  background: linear-gradient(
    to bottom,
    rgb(255, 255, 255),
    rgb(242, 242, 242)
  );
}

.region-name {
  font-size: 23px;
  font-weight: 600;
  color: rgb(105, 105, 105);
  margin: auto 0;
}

.filter-name {
  margin: auto 0;
}

.places-filter {
  width: 150px;
  border: solid rgb(220, 220, 220) 1px;
  border-radius: 5px;
  color: rgb(105, 105, 105);
  margin: auto 0;
  height: 33px;
  padding: 0 10px;
}
</style>
