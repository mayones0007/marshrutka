export const routeFields = [
  {
    fieldName: 'name',
    name: 'Название',
    type: 'text',
    autofull: false,
    required: true,
    info: false,
  },
  {
    fieldName: 'date',
    name: 'Дата',
    type: 'date',
    info: true,
    filter: true,
  },
  {
    fieldName: 'category',
    name: 'Категория',
    type: 'text',
    autofull: true,
    required: true,
    info: true,
    filter: true,
  },
  {
    fieldName: 'region',
    name: 'Регион отправления',
    type: 'text',
    autofull: true,
    required: true,
    info: true,
  },
  {
    fieldName: 'city',
    name: 'Город отправления',
    type: 'text',
    autofull: true,
    required: true,
    info: true,
  },
  {
    fieldName: 'time',
    name: 'Время в часах',
    type: 'number',
    autofull: false,
    required: false,
    info: true,
  },
  {
    fieldName: 'way',
    name: 'На чем',
    type: 'text',
    autofull: true,
    required: true,
    info: true,
    filter: true,
  },
  {
    fieldName: 'persons',
    name: 'Кол-во человек',
    type: 'number',
    autofull: false,
    required: true,
    info: true,
  },
  {
    fieldName: 'price',
    name: 'Стоимость',
    type: 'number',
    autofull: false,
    required: true,
    info: true,
    filter: true,
  },
  {
    fieldName: 'description',
    name: 'Описание',
    type: 'textarea',
    autofull: false,
    required: true,
    placeholder: "Описание*",
    info: false,
  },
  {
    fieldName: 'isAccepted',
    name: 'Подтверждено',
    type: 'checkbox',
    autofull: false,
    required: false,
    info: false,
    filter: true,
    admin: true,
  },
]