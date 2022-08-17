<template>
    <section class="registration--window">
      <Title
        text="Настройки"
      />
      <div class="form">
        <Avatar
          :user="user[0].name"
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
        <MyButton title="Применить изменения" @click="settingsAccept"/>
      </div>  
    </section>
</template>

<script>
import axios from 'axios'
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
      return this.$store.state.user.user
    },
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