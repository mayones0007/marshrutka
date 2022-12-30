<template>
  <div class="select__input" :class="{'select__input-checked': listFullSize}" @click="toggleSelectList" v-click-outside-element="hideSelectList">
    <div>{{selectedOption}}</div>
    <img v-if="isChanged" :src="`${$baseUrl}/icons/close.svg`" alt="close" class="select__reset-button" @click="resetSelectedOption">
    <img v-else :src="`${$baseUrl}/icons/arrow.png`" alt="arrow" class="input__arrow" :class="{'input__arrow-down': listFullSize}">
    <div v-if="listFullSize" class="input__options">
      <div v-for="option in options" :key="option" class="input__option" @click="setSelectedOption(option)">
        <div>{{option}}</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['name', 'fieldName', 'table'],
  data () {
    return {
      listFullSize: false,
    }
  },
  computed: {
    items() {
      return this.$store.state.placesModule[this.table]
    },
    options() {
      return this.$store.state.placesModule.filters[this.fieldName].map(filter => filter[this.fieldName])
    },
    selectedOption() {
      const filters = this.$store.state.placesModule.appliedFilters
      if (this.fieldName in filters) {
        return filters[this.fieldName]
      } else {
        return this.name
      }
    },
    isChanged() {
      return (this.selectedOption !== this.name)
    },
    currentMethod() {
      return this.table === 'places' ? 'getPlaces' : 'getRoutes'
    }
  },
  methods: {
    toggleSelectList() {
      this.listFullSize = !this.listFullSize
    },
    hideSelectList() {
      this.listFullSize = false
    },
    setSelectedOption(option) {
      this.$store.commit('setAppliedFilters', {[this.fieldName]: option})
      this.$store.dispatch(this.currentMethod)
    },
    resetSelectedOption() {
      this.listFullSize = false
      this.$store.commit('resetAppliedFilter', this.fieldName)
      this.$store.dispatch(this.currentMethod)
    }
  },
}
</script>

<style lang="scss" scoped>

.select__input {
  position: relative;
  display: flex;
  width: 150px;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  background-color: white;
  border: solid rgb(240, 240, 240) 1px;
  padding: 10px;
  text-align: start;
  cursor: pointer;
  font-weight: 300;
  line-height: 20px;
    &-checked {
      border-radius: 5px 5px 0px 0px;
    }
}
.input__options {
  position: absolute;
  box-sizing: border-box;
  display: grid;
  max-height: 200px;
  width: 100%;
  overflow: scroll;
  top: 41px;
  left: 0px;
  z-index: 1;
  background-color: white;
  box-shadow: 0px 8px 8px 0px rgba(0,0,0,0.1);
  border-radius: 0 0 5px 5px;
}
.input__option {
  padding: 10px;
  text-align: start;
  cursor: pointer;
  font-weight: 300;
  line-height: 20px;
  &:hover {
    background-color: rgb(240, 240, 240);
  }
}
.input__arrow {
  width: 20px;
  height: 20px;
  transform: rotate(-180deg);
}
.input__arrow-down {
  transform: rotate(0deg);
}
.select__reset-button {
  width: 22px;
  height: 22px;
  cursor: pointer;
  z-index: 1;
}
</style>
