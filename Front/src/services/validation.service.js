export const validation = (value, type) => {
  const letters = /[A-z]/
  const numbers = /[0-9]/
  if (value) {
    switch (type) {
      case 'phone':
        return value.length > 11 && value.match(numbers) && value.includes('+') ? '' : 'Phone number is incorrect'
      case 'email':
        return value.includes('@') && value.includes('.') ? '' : 'E-mail is incorrect'
      case 'password':
        return value.length > 6 && value.match(numbers) && value.match(letters) ? '' : 'Password must contain at least 6 symbols (numbers and/or letters'
      case 'firstName':
        return value.length > 1 && value.match(letters) ? '' : 'First Name is incorrect'
      case 'lastName':
        return value.length > 1 && value.match(letters) ? '' : 'Last Name is incorrect'
      case 'site':
        return !value.includes('http://') && value.includes('.') ? '' : 'Site is incorrect'
      default:
        return ''
    }
  } return ''
}