export const validation = (value, type) => {
  const letters = /[A-zА-я]/
  const numbers = /[0-9]/
  const email = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/
  const phone = /^((\+7|7|8)+([0-9]){10})$/
  if (value) {
    switch (type) {
      case 'name':
        return value.length > 2 && value.match(letters) ? '' : 'Имя не должно быть короче 3-х символов и содержать только буквы'
      case 'phone':
        return value.match(phone)? '' : 'Некорректный телефонный номер'
      case 'email':
        return value.match(email) ? '' : 'Некорректный e-mail'
      case 'password':
        return value.length > 6 && value.match(numbers) && value.match(letters) ? '' : 'Пароль должен быть длиннее 6 символов и содержать лфтинские буквы и цифры'
      case 'description':
        return value.length > 40 ? '' : 'Описание не должно быть короче 40 символов'
      default:
        return ''
    }
  } return ''
}