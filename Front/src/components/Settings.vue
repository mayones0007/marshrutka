<template>
  <div class="form">
    <h2>Настройки</h2>
    <Avatar
      v-if="user.avatar"
      :userName="user.name"
      :userImg="`${$baseUrl}/avatars/`+ user.avatar"
      :vertical="true"
      :big="true"
    />
    <input class="form__input-file" type="file" id="file" ref="file" accept="image/jpeg" @change="replaceUserAvatar()">
    <label class="form__button" for="file">Изменить аватар</label>
    <input class="form__input-text" v-model="oldEmail" type="email" placeholder="Старый e-mail">
    <input class="form__input-text" v-model="email" type="email" placeholder="Новый e-mail">
    <MyButton 
      title="Изменить E-mail"
      :isDisabled="!(oldEmail && email)"
      @click="replaceUserEmail"
    />
    <input class="form__input-text" v-model="oldPassword" type="password" placeholder="Старый пароль">
    <input class="form__input-text" v-model="password" type="password" placeholder="Новый пароль">
    <MyButton 
      title="Изменить пароль"
      :isDisabled="!(oldPassword && password)"
      @click="replaceUserPassword"
    />
  </div>
</template>

<script>
import MyButton from './CustomComponents/MyButton.vue'
import Avatar from './CustomComponents/Avatar.vue'
export default {
  components: {
    MyButton,
    Avatar,
  },
  data: () => ({
    oldEmail: '',
    email: '',
    oldPassword: '',
    password: '',
  }),
  methods: {
    replaceUserAvatar(){
      this.$store.dispatch('replaceUserAvatar', {name: this.user.name, image: this.$refs.file.files[0]})
    },
    replaceUserEmail(){
      this.$store.dispatch('replaceUserEmail', {name: this.user.name, oldEmail: this.oldEmail, email: this.email})
    },
    replaceUserPassword(){
      this.$store.dispatch('replaceUserPassword', {name: this.user.name, oldPassword: this.oldPassword, password: this.password})
    },
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  }
}
</script>

<style lang="scss" scoped>
.form {
  width: 300px;
  margin: 20px auto;
  text-align: center;
  display: grid;
  gap: 20px;
}
.form__input-file {
  display: none;
}
.form__button {
  margin: 10px;
  cursor: pointer;
}
.form__button:hover {
  color: red;
}
.form__input-text {
  @include input;
}
</style>