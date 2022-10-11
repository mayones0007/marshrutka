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
      return this.$store.state.placesModule.place
    },
    currentDifficulty() {
      return this.$store.state.placesModule.place.difficulty
    },
    currentTime() {
      const time = this.currentPlace.time
      if (time < 1) {
        return numWord(60 * time, ['минута', 'минуты', 'минут'])
      } else if (time >= 24) {
        return numWord(time / 24, ['день', 'дня', 'дней'])
      }
      return numWord(time, ['час', 'часа', 'часов'])
    },
    isDesktop(){
      return this.$store.state.appModule.isDesktop
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
  right: 40px;
  top: 100px;
  grid-template-columns: 1fr 1.5fr;
  gap: 20px;
  padding: 20px;
  background: linear-gradient(45deg, rgb(235, 246, 255), rgb(207, 233, 255));
  border: solid rgb(240, 240, 240) 1px;
  border-radius: 5px;
  width: 320px;
  font-weight: 300;
}

.save-panel__info-mobile {
  position: relative;
  border-radius: 0 0 5px 5px;
  grid-template-columns: 1fr 1fr;
  background: rgb(235, 246, 255);
  border: none;
  padding: 15px;
  gap: 15px;
  right: 0;
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
  background: linear-gradient(to bottom, rgb(255, 255, 255), rgb(242, 242, 242));
  border: solid rgb(240, 240, 240) 1px;
  z-index: 1;
}

.raiting__star {
  height: 19px;
  margin-right: 4px;
}
</style>