<template>
  <div class="save-panel">
    <div class="save-panel__info" :class="{'save-panel__info-mobile': !isDesktop}">
      <div>Доступен</div>
      {{currentPlace.availability}}
      <div>Сложность</div>
      <div class="difficalty">{{currentDifficulty}}</div>
      <div>Время</div>
      {{currentTime}}
      <div>Рейтинг</div>
      <div class="raiting">
        <img
            v-for='star in currentRaiting' :key="'star'+star"
            :src="`${$baseUrl}/icons/star.png`"
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
      <div class="user-menu">
        Поделиться
        <img :src="`${$baseUrl}/icons/arrow.png`" alt="star" class="user-menu__arrow">
        <div class="user-menu__dropdown-content" :class="{'user-menu__dropdown-content-mobile': !isDesktop}">
          <a v-for="social in socials" :key="social.alt" :href="social.shareref + this.$route.path">
            <img :src="social.icon" :alt="social.alt" class="dropdown-content__link">
          </a>
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
import { socials } from '../../data/socials.data'
import AddInRouteButton from './AddInRouteButton.vue'
import ButtonHeart from './ButtonHeart.vue'

export default {
  data() {
    return {
        socials: socials,
    };
  },
  name: 'SavePanel',
  components: {
    AddInRouteButton,
    ButtonHeart,
  },
  computed: {
    currentPlace() {
      return this.$store.state.place
    },
    currentRaiting() {
      return this.$store.state.raiting
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
          return ( 'Неопределена' )
      }
    },
    currentTime() {
      if (this.$store.state.place.time < 1) {
        return 60 * this.$store.state.place.time + ' минут'
      } else if (this.$store.state.place.time >= 24) {
        return this.$store.state.place.time / 24 + ' день'
      }
      return this.$store.state.place.time + ' час'
    },
    isDesktop(){
      return this.$store.state.isDesktop
    }
  }
}
</script>

<style lang='scss' scoped>

.save-panel__info {
  display: grid;
  position: fixed;
  box-sizing: border-box;
  justify-items: center;
  right:0;
  top: 100px;
  grid-template-columns: 1fr;
  gap: 20px;
  padding: 30px;
  background-color: rgb(241, 241, 241);
  border-radius:  20px 0 0 0;
  width: 208px;
}

.save-panel__info-mobile {
  position: relative;
  grid-template-columns: 1fr 1fr;
  justify-items: start;
  top: 0;
  width: 100%;
  border-radius:  0 0 20px 20px;
}

.save-panel__buttons {
  position: fixed;
  display: grid;
  box-sizing: border-box;
  gap: 20px;
  right:0;
  top: 426px;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: center;
  background-color: rgb(241, 241, 241);
  border-radius: 0 0 20px 20px;
  padding: 30px;
  z-index: 1;
}

.save-panel__buttons-mobile {
  top: 90%;
  bottom: 0;
  border-radius: 0;
  grid-template-columns: 1fr 40px 1fr;
  padding: 0 20px;
  width: 100%;
}

.user-menu {
  @include flex-between-center-g15;
  position: relative;
}

.user-menu__dropdown-content {
  position: absolute;
  display: flex;
  bottom: -65px;
  top: 35px;
  width: 190px;
  right: -35px;
  background-color: #f1f1f1;
  display: none;
  border-radius: 0 0 30px 30px;
  padding: 10px;
}

.user-menu__dropdown-content-mobile {
  top: -230px;
  right: -5px;
  bottom: 70px;
  width: 48px;
  box-shadow: 0px 8px 8px 0px rgba(0,0,0,0.1);
  border-radius: 30px;
  padding: 0;
}

.dropdown-content__link {
  width: 30px;
  height: 30px;
  padding: 8px;
  border-radius: 50%;
  filter: invert(1);
}

.dropdown-content__link:hover {
  background-color: rgb(0, 0, 0);
}

.user-menu:hover .user-menu__arrow {
  transform: rotate(0deg);
}

.user-menu:hover .user-menu__dropdown-content {
  display: block;
}

.user-menu__arrow {
  width: 20px;
  height: 20px;
  padding: 8px;
  border-radius: 50%;
  background-color: white;
  transform: rotate(180deg);
  transition-duration: 300ms;
  z-index: 1;
}

.raiting__star {
  height: 19px;
  margin-right: 4px;
}
</style>