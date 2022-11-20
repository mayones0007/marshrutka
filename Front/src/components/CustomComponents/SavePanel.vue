<template>
    <div class="save-panel" :class="{'save-panel-mobile': !isDesktop}">
      <div class="name">
        <div>
          {{currentPlace.name}}
          <router-link v-if="isAdmin" :to="{name: 'newPlace', params: {id: currentPlace.id}}"><img :src="`${$baseUrl}/icons/pensil.svg`"></router-link>
        </div>
        <Hits :hits="currentPlace.hits" color="rgb(60, 60, 60)"/>
      </div>
      <div v-for="field in infoFields" :key="field.name" class="save-panel__item">
        <div>{{field.name}}</div>
        <a v-if="field.type === 'email'" class="link" :href="`mailto:${currentPlace[field.fieldName]}`">{{currentPlace[field.fieldName]}}</a>
        <a v-else-if="field.type === 'tel'" class="link" :href="`tel:${currentPlace[field.fieldName]}`">{{currentPlace[field.fieldName]}}</a>
        <a v-else-if="field.type === 'url'" class="link" :href="`http://${currentPlace[field.fieldName]}`" target="_blank">{{currentPlace[field.fieldName]}}</a>
        <div v-else-if="field.fieldName === 'time'">{{currentTime}}</div>
        <div v-else>{{currentPlace[field.fieldName]}}</div>
      </div>
      <div v-if="currentRaiting" class="save-panel__item">
        <div>Рейтинг</div>
        <div class="raiting">
          <img
            v-for='star in currentRaiting' :key="'star'+star"
            :src="`${$baseUrl}/icons/star.svg`"
            alt="star"
            class="raiting__star"
          >
        </div>
      </div>
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
import Hits from './Hits.vue'
import { placeFields } from '../../data/place.fields'
import { numWord } from '../../services/numerals.service'

export default {
  name: 'SavePanel',
  components: {
    AddInRouteButton,
    ButtonHeart,
    ShareButton,
    Hits,
  },
  data: () => ({
    placeFields,
  }),
  computed: {
    currentPlace() {
      return this.$store.state.placesModule.place
    },
    currentRaiting() {
      return this.$store.state.placesModule.raiting
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
    infoFields() {
      return this.placeFields.filter((field) => field.info && this.currentPlace[field.fieldName])
    },
    isDesktop(){
      return this.$store.state.appModule.isDesktop
    },
    isAdmin() {
      return this.$store.state.userModule.user.name === "Admin"
    },
  },
}
</script>

<style lang='scss' scoped>
.save-panel {
  display: grid;
  position: sticky;
  box-sizing: border-box;
  justify-items: start;
  text-align: start;
  top: 20px;
  gap: 15px;
  padding: 20px;
  background: linear-gradient(45deg, rgb(235, 246, 255), rgb(207, 233, 255));
  border: solid rgb(240, 240, 240) 1px;
  border-radius: 5px;
  width: 350px;
  font-weight: 300;
  &-mobile {
    position: relative;
    border-radius: 0 0 5px 5px;
    background: rgb(235, 246, 255);
    border: none;
    padding: 15px;
    right: 0;
    top: 0px;
    width: 100%;
  }
}

.save-panel__item {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  width: 100%;
  justify-items: start;
}

.save-panel__buttons {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 25px 25px;
  box-sizing: border-box;
  gap: 20px;
  width: 100%;
  margin-top: 20px;
  &-mobile {
    position: fixed;
    padding: 20px 20px 30px 20px;
    left: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgb(255, 255, 255), rgb(242, 242, 242));
    border: solid rgb(240, 240, 240) 1px;
    z-index: 1;
  }
}

.raiting {
  display:flex;
}

.raiting__star {
  height: 19px;
  margin-right: 4px;
}

.name {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  font-weight: 400;
  font-size: 1.2em;
  margin-bottom: 10px;
}

.link {
  color: rgb(0, 148, 99);
}
</style>