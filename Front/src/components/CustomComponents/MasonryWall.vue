<template>
  <div v-if="items.length">
    <h2 v-if="header">{{header}}</h2>
    <masonry-wall :items="items" :column-width="columnWidth" :gap="20">
      <template #default="{ item }">
        <div class="item" :style="`background-image: url(${$baseUrl}/min/${item.picture})`">
          <div class="item__info">
            <router-link :to="{name: currentType(), params: {id: item.id}}" class="item__info-name">{{item.name}}</router-link>
            <div>
              <div class="item__info-description">{{item.description}}</div>
              <div class="item__info-footer">
                <div v-if="item.persons" class="card__info-persons">{{item.persons}}<img :src="`${$baseUrl}/icons/person.svg`" alt="Человек"></div>
                <div v-if="item.price">{{item.price}} &#8381;</div>
                <div v-if="item.time">{{currentTime(item.time)}}</div>
                <div v-if="item.way" class="card__info-persons">{{item.way}}<img :src="`${$baseUrl}/icons/${currentIcon(item.way)}.svg`"></div>
                <Hits :hits="item.hits" color="white"/>
              </div>
            </div>
          </div>
          <ButtonHeart v-bind="currentProps(item.id)" class="item__button-heart"/>
        </div>
      </template>
    </masonry-wall>
  </div>
</template>

<script>
import { numWord } from '../../services/numerals.service'
import MasonryWall from '@yeger/vue-masonry-wall'
import ButtonHeart from './ButtonHeart.vue'
import Hits from './Hits.vue'
export default {
  props:['items', 'type', 'header', 'columnWidth'],
  components: {
    MasonryWall,
    Hits,
    ButtonHeart,
  },
  methods: {
    currentProps(id) {
      return this.type === 'routes' ? {routeId: id} : {placeId: id}
    },
    currentType() {
      return this.type === 'routes' ? 'route' : 'place'
    },
    currentTime(time) {
      if (time < 1) {
        return numWord(60 * time, ['минута', 'минуты', 'минут'])
      } else if (time >= 24) {
        return numWord(time / 24, ['день', 'дня', 'дней'])
      }
      return numWord(time, ['час', 'часа', 'часов'])
    },
    currentIcon(iconName) {
      switch (iconName) {
        case 'Авто':
          return 'car'
        case 'Поход':
          return 'backpack'
        default:
          return 'walk'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
h2 {
  font-size: 30px;
}
.item {
  position: relative;
  border-radius: 15px;
  background-size: cover;
  background-position: center;
  color: white;
  box-shadow: 2px 2px 15px 4px rgba(0, 0, 0, 0.2);
}

.item__button-heart {
  position: absolute;
  top: 25px;
  right: 25px;
}
.item__info {
  background: linear-gradient(to left bottom, transparent, rgba(0, 0, 0, 0.425),rgb(0, 0, 0));
  display: flex;
  height: 330px;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px;
  padding: 20px;
  text-align: start;
}

.item__info-name{
  font-size: 1.5em;
  margin-right: 35px;
  text-decoration: none;
  color: white;
  &:hover {
    text-decoration: underline;
  }
}

.item__info-description{
  font-size: 1.2em;
  font-weight: 200;
  margin-bottom: 20px;
  white-space: pre-line;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  text-align: justify;
  overflow: hidden;
  line-height: 120%;
}

.item__info-footer{
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.item__info-footer-price {
  font-size: 1.8em;
}
.card__info-persons {
  display: flex;
  gap: 5px;
  align-items: center;
}
</style>
