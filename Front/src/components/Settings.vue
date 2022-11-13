<template>
  <div class="form">
    <h2>Настройки</h2>
    <Avatar
      v-if="user.avatar"
      :userImg="`${$baseUrl}/avatars/`+ user.avatar"
      :isVertical="true"
      :isBig="true"
    />
    <input class="form__input-file" type="file" id="file" ref="file" accept="image/*" @change="replaceUserAvatar()">
    <label class="form__button" for="file">Изменить аватар</label>
    <input class="form__input-text" v-model="email" type="email" placeholder="Старый e-mail">
    <input class="form__input-text" v-model="newEmail" type="email" placeholder="Новый e-mail">
    <MyButton 
      title="Изменить E-mail"
      :isDisabled="!(newEmail && email)"
      @click="replaceUserEmail"
    />
    <input class="form__input-text" v-model="password" type="password" placeholder="Старый пароль">
    <input class="form__input-text" v-model="newPassword" type="password" placeholder="Новый пароль">
    <MyButton 
      title="Изменить пароль"
      :isDisabled="!(newPassword && password)"
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
    email: '',
    newEmail: '',
    password: '',
    newPassword: '',
    isLoading: false,
  }),
  methods: {
    async replaceUserAvatar(){
      await this.$store.dispatch('replaceUserAvatar', this.$refs.file.files[0])
      await this.$store.dispatch('getUser')
    },
    replaceUserEmail(){
      this.$store.dispatch('replaceUserEmail', {newEmail: this.newEmail, email: this.email})
    },
    replaceUserPassword(){
      this.$store.dispatch('replaceUserPassword', {newPassword: this.newPassword, password: this.password})
    },
  },
  computed: {
    user() {
      return this.$store.state.userModule.user
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