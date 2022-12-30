<template>
  <div>
    <div class="user">
      <Avatar
        v-if="currentUser.avatar"
        :userImg="`${$baseUrl}/avatars/`+ currentUser.avatar"
        :isVertical="true"
        :isBig="true"
        :userName="currentUser.name"
      />
      <div class="form__buttons">
        <input class="form__input-file" type="file" id="file" ref="file" accept="image/*" @change="replaceUserAvatar()">
        <label class="form__button" for="file">Изменить аватар</label>
        <div class="form__button" @click="change('name')">Изменить имя</div>
        <div class="form__button" @click="change('email')">Изменить e-mail</div>
        <div class="form__button" @click="change('password')">Изменить пароль</div>
      </div>
    </div>
    <div v-if="field === 'name'" class="form">
      <input class="form__input-text" v-model="user.name" type="name" placeholder="Ваше имя">
      <MyButton 
        title="Изменить имя"
        :isDisabled="!user.name"
        @click="replaceUser"
      />
    </div>
    <div v-if="field === 'email'" class="form">
      <input class="form__input-text" v-model="user.email" type="email" placeholder="Старый e-mail">
      <input class="form__input-text" v-model="user.newEmail" type="email" placeholder="Новый e-mail">
      <MyButton 
        title="Изменить e-mail"
        :isDisabled="!(user.newEmail && user.email)"
        @click="replaceUser"
      />
    </div>
    <div v-if="field === 'password'" class="form">
      <input class="form__input-text" v-model="user.password" type="password" placeholder="Старый пароль">
      <input class="form__input-text" v-model="user.newPassword" type="password" placeholder="Новый пароль">
      <MyButton 
        title="Изменить пароль"
        :isDisabled="!(user.newPassword && user.password)"
        @click="replaceUser"
      />
    </div>
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
    user: {},
    field: null,
  }),
  methods: {
    async replaceUserAvatar(){
      await this.$store.dispatch('replaceUserAvatar', this.$refs.file.files[0])
      this.$store.dispatch('getUser')
    },
    async replaceUser(){
      await this.$store.dispatch('replaceUser', this.user)
      this.$store.dispatch('getUser')
      this.user = {}
      this.field = null
    },
    change(name) {
      this.field = name
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.userModule.user
    },
  }
}
</script>

<style lang="scss" scoped>
.user {
  display: grid;
  justify-content: center;
  gap: 20px;
}
.form {
  margin: 40px auto;
  display: grid;
  gap: 20px;
  width: 300px;
}
.form__input-file {
  display: none;
}
.form__button {
  cursor: pointer;
}
.form__button:hover {
  color: red;
}
.form__buttons {
  display: grid;
  gap: 25px;
  padding-top: 20px;
  border-top: 1px solid rgb(0, 201, 134);
}
.form__input-text {
  @include input;
}
</style>