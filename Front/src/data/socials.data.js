const baseUrl = process.env.VUE_APP_BASE_URL;

export const socials = [
  {
    ref: 'https://vk.com',
    shareref: 'http://vkontakte.ru/share.php?url=https://marshrutka.ru',
    icon: baseUrl +'/icons/vk.png',
    alt: 'vk',
  },
  {
    ref: 'https://www.instagram.com',
    shareref: 'https://telegram.me/share/url?url=https://marshrutka.ru',
    icon: baseUrl +'/icons/instagram.png',
    alt: 'inst',
  },
  {
    ref: 'https://tlgg.ru/likhachev_maxim',
    shareref: 'https://telegram.me/share/url?url=https://marshrutka.ru',
    icon: baseUrl +'/icons/telegram.png',
    alt: 'tele',
  },
  {
    ref: 'https://wa.me/+79014534841',
    shareref: 'whatsapp://send?text=http://marshrutka.ru',
    icon: baseUrl +'/icons/whatsapp.png',
    alt: 'wa',
  },
]