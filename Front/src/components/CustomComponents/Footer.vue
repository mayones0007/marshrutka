<template>
  <div class="footer">
    <div class="footer__contacts-typical">
      <a href="tel:+79014534841" class="contacts-typical__item">
        <img src="http://localhost:3000/icons/russia-flag.png" alt="tel"> +79014534841
      </a>
      <a href="mailto:macs0007@mail.ru" class="contacts-typical__item">
        <img src="http://localhost:3000/icons/mail.png" alt="mail"> macs0007@mail.ru
      </a>
    </div>
    <div class="footer__contacts-social">
      <a href="https://vk.com">
        <img src="http://localhost:3000/icons/vk.png" alt="vk" class="contacts-social__item">
      </a>
      <a href="https://www.instagram.com">
        <img src="http://localhost:3000/icons/instagram.png" alt="inst" class="contacts-social__item">
      </a>
      <a href="https://tlgg.ru/likhachev_maxim">
        <img src="http://localhost:3000/icons/telegram.png" alt="tele" class="contacts-social__item">
      </a>
      <a href="https://wa.me/+79014534841">
        <img src="http://localhost:3000/icons/whatsapp.png" alt="wa" class="contacts-social__item">
      </a>
    </div>
    <router-link to="/" class="footer__logo-name">© 2022, Marshrutka Limited Sochifornia</router-link>
  </div>
</template>

<style lang="scss" scoped> 

.footer {
  @include panel(to top);
}

.footer__logo-name{
  @include link-reset;
  width: 200px;
  text-align: end;
}

.footer__contacts-typical {
  display: grid;
  text-align: start;
}

.contacts-typical__item {
  @include link-reset;
}

.contacts-typical__item:hover {
  filter: brightness(1.1);
}

.footer__contacts-social {
  @include flex-between-center-g15;
}
.contacts-social__item {
  height: 30px;
  border-radius: 50%;
  padding: 8px;
  background-color: #c7c7c7;
  transition: 500ms;
}

.contacts-social__item:hover {
  background-color: #a0a0a0;
}

</style>