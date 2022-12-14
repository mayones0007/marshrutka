import "toastify-js/src/toastify.css"
import Toastify from 'toastify-js'

export const toastTypes = {
  ERROR: 'rgb(255, 98, 98)',
  SUCCCES: 'rgb(0, 212, 141)',
  WARNING: 'rgb(234, 206, 127)',
}

export const showToast = (type, text, gravity, position) => {
  Toastify({
    text: text,
    duration: 3000,
    newWindow: true,
    close: false,
    gravity, // `top` or `bottom`
    position, // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: type,
      'border-radius': '5px',
      'font-family': 'Roboto, Arial, sans- serif',
      'font-weight': '300',
    },
    onClick: function () { } // Callback after click
  }).showToast();
}


