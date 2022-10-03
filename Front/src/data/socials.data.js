const baseUrl = process.env.VUE_APP_BASE_URL;

export const socials = [
  {
    ref: 'https://vk.com',
    shareref: 'http://vkontakte.ru/share.php?url=https://marshrutka.su',
    icon: baseUrl +'/icons/vk.png',
    alt: 'vk',
  },
  {
    ref: 'https://www.instagram.com',
    shareref: 'https://telegram.me/share/url?url=https://marshrutka.su',
    icon: baseUrl +'/icons/instagram.png',
    alt: 'instagram',
  },
  {
    ref: 'https://tlgg.ru/likhachev_maxim',
    shareref: 'https://telegram.me/share/url?url=https://marshrutka.su',
    icon: baseUrl +'/icons/telegram.png',
    alt: 'telegram',
  },
  {
    ref: 'https://wa.me/+79014534841',
    shareref: 'whatsapp://send?text=http://marshrutka.su',
    icon: baseUrl +'/icons/whatsapp.png',
    alt: 'whatsapp',
  },
]