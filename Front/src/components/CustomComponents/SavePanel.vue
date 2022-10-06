<template>
    <div class="save-panel__info" :class="{'save-panel__info-mobile': !isDesktop}">
      <div>Регион</div>
      {{currentPlace.region}}
      <div>Город</div>
      {{currentPlace.city}}
      <div>Категория</div>
      {{currentPlace.tag}}
      <div>Доступен</div>
      {{currentPlace.availability}}
      <div>Сложность</div>
      <div>{{currentDifficulty}}</div>
      <div>Время</div>
      {{currentTime}}
      <div>Рейтинг</div>
      <div class="raiting" v-if="currentPlace.raiting">
        <img
          v-for='star in currentPlace.raiting' :key="'star'+star"
          :src="`${$baseUrl}/icons/star.svg`"
          alt="star"
          class="raiting__star"
        >
      </div>
      <div v-else>Не определен</div>
      <div class="save-panel__buttons" :class="{'save-panel__buttons-mobile': !isDesktop}">
        <AddInRouteButton
          :placeId="currentPlace.id"
        />
        <ButtonHeart
          :placeId="currentPlace.id"
        />
        <ShareButton/>
      </div>
    </div>
</template>

<script>
import AddInRouteButton from './AddInRouteButton.vue'
import ButtonHeart from './ButtonHeart.vue'
import ShareButton from './ShareButton.vue'
import { numWord } from '../../services/numerals.service'

export default {
  name: 'SavePanel',
  components: {
    AddInRouteButton,
    ButtonHeart,
    ShareButton
  },
  computed: {
    currentPlace() {
      return this.$store.state.place
    },
    currentDifficulty() {
      switch (this.$store.state.place.difficulty) {
        case '1':
          return ( 'Легкая' )
        case '2':
          return ( 'Средняя' )
        case '3':
          return ( 'Сложная' )
        default:
          return ( 'Не определена' )
      }
    },
    currentTime() {
      if (this.$store.state.place.time < 1) {
        return numWord(60 * this.$store.state.place.time, ['минута', 'минуты', 'минут'])
      } else if (this.$store.state.place.time >= 24) {
        return numWord(this.$store.state.place.time / 24, ['день', 'дня', 'дней'])
      }
      return numWord(this.$store.state.place.time, ['час', 'часа', 'часов'])
    },
    isDesktop(){
      return this.$store.state.isDesktop
    }
  },
}
</script>

<style lang='scss' scoped>

.save-panel__info {
  display: grid;
  position: fixed;
  box-sizing: border-box;
  justify-items: start;
  right: 0;
  top: 12.5%;
  grid-template-columns: 1fr 1.5fr;
  gap: 20px;
  padding: 30px;
  background-color: rgb(241, 241, 241);
  border-radius: 20px 0 0 20px;
  width: 300px;
  font-weight: 300;
}

.save-panel__info-mobile {
  position: relative;
  border-radius: 0 0 20px 20px;
  grid-template-columns: 1fr 1fr;
  padding: 15px 30px;
  gap: 15px;
  top: 0px;
  width: 100%;
}

.save-panel__buttons {
  position: relative;
  display: grid;
  grid-column: span 2;
  grid-template-columns: 1fr 25px 25px;
  box-sizing: border-box;
  gap: 20px;
  width: 100%;
}

.save-panel__buttons-mobile {
  position: fixed;
  padding: 20px;
  left: 0;
  bottom: 0;
  background-color: rgb(250, 250, 250);
  z-index: 1;
}

.raiting__star {
  height: 19px;
  margin-right: 4px;
}
</style>