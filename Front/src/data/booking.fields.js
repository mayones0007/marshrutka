export const bookingFields = [
  {
    fieldName: 'id',
    name: 'ID заявки',
    type: 'number',
    required: false,
    info: true,
  },
  {
    fieldName: 'date',
    name: 'Дата',
    type: 'date',
    required: true,
    info: false,
  },
  {
    fieldName: 'persons',
    name: 'Кол-во человек',
    type: 'number',
    required: true,
    info: false,
  },
  {
    fieldName: 'userName',
    name: 'Имя',
    type: 'text',
    required: false,
    info: false,
  },
  {
    fieldName: 'phone',
    name: 'Телефон',
    type: 'tel',
    required: true,
    info: false,
  },
]