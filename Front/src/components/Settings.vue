<template>
    <section class="registration--window">
      <div class="registration--window__title title">Настройки</div>
      <div class="registration--window__form form">
        <input class="form__input--text" v-model="oldEmail" type="email" placeholder="Старый e-mail">
        <input class="form__input--text" v-model="newEmail" type="email" placeholder="Новый e-mail">
        <input class="form__input--text" v-model="oldPassword" type="password" placeholder="Старый пароль">
        <input class="form__input--text" v-model="newPassword" type="password" placeholder="Новый пароль">
        <input type="file" id="file" ref="file" accept="image/jpeg" @change="handleFilesUploads()">
        <button class="btn" @click="settingsAccept">Применить изменения</button>
      </div>
    </section>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    oldEmail: '',
    newEmail: '',
    oldPassword: '',
    newPassword: '',
    file: '',
  }),
  methods: {
    handleFilesUploads(){
      this.file = this.$refs.file.files[0];
    },
    async settingsAccept(){
      const formData = new FormData()
      formData.append('name', this.user[0].name)
      formData.append('email', this.oldEmail)
      formData.append('password', this.oldPassword)
      formData.append('newEmail', this.newEmail)
      formData.append('newPassword', this.newPassword)
      formData.append('image', this.file)

      const response = await axios.post('http://localhost:3000/settings', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
        alert(response.data.message);
    },
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  }
}

</script>

<style scoped>
.registration--window__link {
  color: green;
  cursor: pointer;
  text-decoration: underline;
}

.registration--window {
  width: 350px;
  margin: 100px auto;
}
</style>