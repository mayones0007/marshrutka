<template>
  <div class="registration--window">
    <Title
      text="Настройки"
    />
    <div class="form">
      <Avatar
        v-if="user.avatar"
        :userName="user.name"
        :userImg="avatarSrc"
        :vertical="true"
        :hideName="true"
        :big="true"
      />
      <input class="form__input--file" type="file" id="file" ref="file" accept="image/jpeg" @change="handleFilesUploads()">
      <label class="form__input--btn" for="file">Изменить аватар</label>
      <input class="form__input-text" v-model="oldEmail" type="email" placeholder="Старый e-mail">
      <input class="form__input-text" v-model="newEmail" type="email" placeholder="Новый e-mail">
      <input class="form__input-text" v-model="oldPassword" type="password" placeholder="Старый пароль">
      <input class="form__input-text" v-model="newPassword" type="password" placeholder="Новый пароль">
      <MyButton 
        title="Применить изменения" 
        @click="settingsAccept"
        :isDisabled="!(oldEmail || oldPassword || file)"
        />
    </div>  
  </div>
</template>

<script>
import { axiosInstance } from '../httpClient'
import MyButton from './CustomComponents/MyButton.vue'
import Avatar from './CustomComponents/Avatar.vue'
import Title from './CustomComponents/Title.vue'
export default {
  components: {
    MyButton,
    Avatar,
    Title
  },
  data: () => ({
    oldEmail: '',
    newEmail: '',
    oldPassword: '',
    newPassword: '',
    file: '',
    image: '',
  }),
  methods: {
    handleFilesUploads(){
      this.file = this.$refs.file.files[0]
      this.readImage()
    },
    async settingsAccept(){
      const formData = new FormData()
      formData.append('name', this.user.name)
      formData.append('oldEmail', this.oldEmail)
      formData.append('oldPassword', this.oldPassword)
      formData.append('email', this.newEmail)
      formData.append('password', this.newPassword)
      formData.append('image', this.file)

// TO-DO перенести в стор
      await axiosInstance.post('/settings', formData)
        this.oldEmail = this.newEmail = this.oldPassword = this.newPassword = this.file = ''
    },
    readImage() {
      const reader = new FileReader();
      reader.addEventListener('load', (event) => {
        this.image = event.target.result;
      });
      reader.readAsDataURL(this.file);
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    avatarSrc() {
        return this.image || `${process.env.VUE_APP_BASE_URL}/avatars/${this.user.avatar}`
    }
  }
}
</script>

<style lang="scss" scoped>
.registration--window__link {
  color: green;
  cursor: pointer;
  text-decoration: underline;
}

.registration--window {
  width: 350px;
  margin: 100px auto;
  text-align: center;
}

.form__input--file {
  display: none;
}

.form__input--btn {
  margin: 10px;
  cursor: pointer;
}

.form__input--btn:hover {
  color: red;
}

.form {
  display: grid;
  gap: 20px;
}

.form__input-text {
  @include input;
}
</style>