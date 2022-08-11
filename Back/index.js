const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const knexConfig = require('./db/knexfile')
const knex = require('knex')(knexConfig[process.env.NODE_ENV])
const corsMiddleware = require('./middleware/cors')
const fileupload = require('express-fileupload')
const fs = require('fs')

app.use(bodyParser.json(), express.static('public'), fileupload())

app.options('*', corsMiddleware, (req, res) => {
  res.status(204).send()
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', corsMiddleware, (req, res) => {
  knex('places')
  .then((places) => {
    return res.json(places);
  })
  .catch((err) => {
    console.error(err)
    return res.json({success: false, message: 'An error occurred, please try again later.'})
  })
})

app.get('/place', corsMiddleware, (req, res) => {
  const place = req.query.id ? req.query.id : ''
  knex('places').where('eng', place)
  .then((places) => {
    return res.json({success: true, message: 'Место загружено', places})
  })
  .catch((err) => {
    console.error(err)
    return res.json({success: false, message: 'An error occurred, please try again later.'})
  })
})

app.get('/reviews', corsMiddleware, (req, res) => {
  const place = req.query.id ? req.query.id : ''
  knex('reviews').where('eng', place)
  .then((reviews) => {
    return res.json({success: true, message: 'Отзывы загружены', reviews})
  })
  .catch((err) => {
    console.error(err)
    return res.json({success: false, message: 'An error occurred, please try again later.'})
  })
})

app.get('/pictures', corsMiddleware, (req, res) => {
  const place = req.query.id ? req.query.id : ''
  knex('pictures').where('eng', place).select('id')
    .then((pictures) => {
      return res.json({ success: true, message: 'Список картинок загружен', pictures })
    })
    .catch((err) => {
      console.error(err)
      return res.json({ success: false, message: 'An error occurred, please try again later.' })
    })
})

app.get('/favorites', corsMiddleware, (req, res) => {
  knex('favorites').join('places', 'favorites.eng', '=', 'places.eng').where('userName', 'sf')
  .then((favorites) => {
    return res.json({success: true, message: 'Избранное загружено', favorites})
  })
  .catch((err) => {
    console.error(err)
    return res.json({success: false, message: 'An error occurred, please try again later.'})
  })
})

app.get('/routes', corsMiddleware, (req, res) => {
  knex('routes').join('places', 'routes.eng', '=', 'places.eng').where('userName', 'sf')
  .then((routes) => {
    return res.json({success: true, message: 'Маршрут загружен', routes})
  })
  .catch((err) => {
    console.error(err)
    return res.json({success: false, message: 'An error occurred, please try again later.'})
  })
})

app.post('/login', corsMiddleware, (req, res) => {
  const name = req.body.name ? req.body.name : ''
  const password = req.body.password ? req.body.password : ''
  knex('users').where('name', name)
  .then((users) => {
    if (!users[0]) {
      return res.json({success: false, message: 'Неверный логин'})
    }
    if (users[0].password !== password) {
      return res.json({success: false, message: 'Неверный пароль'})
    }
      return res.json({success: true, message: 'Успешный вход', users})
    })
  .catch((err) => {
    console.error(err)
    return res.json({success: false, message: 'An error occurred, please try again later.'})
  })
})

app.post('/registration', corsMiddleware, (req, res) => {
  const name = req.body.name ? req.body.name : ''
  const email = req.body.email ? req.body.email : ''
  const password = req.body.password ? req.body.password : ''
  const avatar = "tourist.png"

if (!name || !email || !password) {
    return res.json({success: false, message: 'Заполните все поля'});
}
knex('users').where({ name })
  .then((users) => {
    if (users.length > 0) {
      return res.json({ success: false, message: 'Пользователь с таким именем уже существует' })}
  })
knex('users').where({ email })
  .then((users) => {
    if (users.length > 0) {
      return res.json({ success: false, message: 'Пользователь с таким email уже существует' })
    }
  })
knex('users')
    .insert({name, email, password, avatar})
    .then((id) => {
    knex('users')
        .where({id})
        .then((user) => {
        return res.json({success: true, message: 'Успешная регистрация', user})
    })
})
    .catch((err) => {
    console.error(err)
    return res.json({success: false, message: 'An error occurred, please try again later.'});
});
});

app.post('/review', corsMiddleware, (req, res) => {
  const text = req.body.text ? req.body.text : ''
  const userName = req.body.userName ? req.body.userName : ''
  const eng = req.body.eng ? req.body.eng : ''
if (userName === "Неопознанный турист"){
  return res.json({success: false, message: 'Для отправки отзыва авторизуйтесь'})
}
knex('reviews')
    .insert({eng, userName, text})
    .then((review) => {
      return res.json({success: true, message: 'Отзыв успешно добавлен', review})
    })
    .catch((err) => {
      console.error(err)
      return res.json({success: false, message: 'An error occurred, please try again later.'})
    });
});

app.post('/favorite', corsMiddleware, (req, res) => {
  const userName = req.body.userName ? req.body.userName : ''
  const eng = req.body.eng ? req.body.eng : ''
if (userName === "Неопознанный турист"){
  return res.json({success: false, message: 'Для добавления в избранное авторизуйтесь'})
}
  knex('favorites').where('eng', eng) .andWhere('userName', userName).then((favorites)=> {
    if (favorites.length === 0){
      knex('favorites')
        .insert({eng, userName})
        .then((favorite) => {
          return res.json({success: true, message: 'Обьект успешно добавлен в избаннное', favorite})
        })
    } else {
      knex('favorites')
        .where('eng', eng) .andWhere('userName', userName).del()
        .then((favorite) => {
          return res.json({success: true, message: 'Обьект успешно удален из избаннного', favorite})
        })
    }
  })
    .catch((err) => {
      console.error(err)
      return res.json({success: false, message: 'An error occurred, please try again later.'})
    });
});

app.post('/route', corsMiddleware, (req, res) => {
  const userName = req.body.userName ? req.body.userName : ''
  const eng = req.body.eng ? req.body.eng : ''
if (userName === "Неопознанный турист"){
  return res.json({success: false, message: 'Для добавления в маршрут авторизуйтесь'})
}
  knex('routes').where('eng', eng) .andWhere('userName', userName).then((routes)=> {
    if (routes.length === 0){
      knex('routes')
        .insert({eng, userName})
        .then((route) => {
          return res.json({success: true, message: 'Обьект успешно добавлен в маршрут', route})
        })
    } else {
      knex('routes')
        .where('eng', eng) .andWhere('userName', userName).del()
        .then((route) => {
          return res.json({success: true, message: 'Обьект успешно удален из маршрута', route})
        })
    }
  })
    .catch((err) => {
      console.error(err)
      return res.json({success: false, message: 'An error occurred, please try again later.'})
    });
});

app.post('/routemap', corsMiddleware, (req, res) => {
  const place1 = req.body.place1 ? req.body.place1 : ''
  const place2 = req.body.place2 ? req.body.place2 : ''
  const distance = req.body.distance ? req.body.distance : ''
  const duration = req.body.duration ? req.body.duration : ''

knex('routeMap')
    .insert({place1, place2, distance, duration})
    .then((id) => {
    knex('routeMap')
        .where({id})
        .then((route) => {
        return res.json({success: true, message: 'Данные о маршруте успешно', route});
    })
})
    .catch((err) => {
    console.error(err);
    return res.json({success: false, message: 'An error occurred, please try again later.'});
});
});

app.post('/newplace', corsMiddleware, (req, res) => {
  const eng = req.body.eng ? req.body.eng : ''
  const name = req.body.name ? req.body.name : ''
  const tag = req.body.tag ? req.body.tag : ''
  const region = req.body.region ? req.body.region : ''
  const city = req.body.city ? req.body.city : ''
  const difficulty = req.body.difficulty ? req.body.difficulty : ''
  const availability = req.body.availability ? req.body.availability : ''
  const time = req.body.time ? req.body.time : ''
  const description = req.body.description ? req.body.description : ''
  const coords = req.body.coords ? req.body.coords : ''

  const fileName = eng + '.jpeg'
  const path = __dirname + '/public/img/' + fileName
  req.files.images[0].mv(path)

  req.files.images.forEach(image => {
    knex('pictures')
      .insert({ eng })
      .then((id) => {
        const fileName = id[0] + '.jpeg'
        const path = __dirname + '/public/img/' + fileName
        image.mv(path)
      })
  })

knex('places')
    .insert({eng, name, tag, region, city, difficulty, availability, time, description, coords, pictures})
    .then((id) => {
      knex('places').select('places.coords')
        .then((places) => {
        return res.json({success: true, message: 'Место добавлено', places});
    })
})
    .catch((err) => {
    console.error(err);
    return res.json({success: false, message: 'An error occurred, please try again later.'});
    })
})

app.get('/optimalroute', corsMiddleware, (req, res) => {
  let route1
  knex('routes').where('userName', 'sf').select('eng')
  .then((route) => {
    route1 = route
    console.log(route1)
  })
});

app.post('/settings', corsMiddleware, (req, res) => {

  const name = req.body.name ? req.body.name : ''
  const email = req.body.email ? req.body.email : ''
  const password = req.body.password ? req.body.password : ''
  const newEmail = req.body.newEmail ? req.body.newEmail : ''
  const newPassword = req.body.newPassword ? req.body.newPassword : ''
  const avatar = 'avt-' + name + '.jpeg'
  const path = __dirname + '/public/avatars/' + avatar


knex('users').where({name})
.then((users) => {
  if(email !== ''){
  if (users[0].email !== email) {
    return res.json({success: false, message: 'Неверный email'})
  } else {
    knex('users').update({'email': newEmail}).where({name}).catch(err => console.log(err))
  }}
  if(password !== ''){
    if (users[0].password !== password) {
      return res.json({success: false, message: 'Неверный пароль'})
    } else {
      knex('users').update({'password': newPassword}).where({name}).catch(err => console.log(err))
    }}
  if (req.files){knex('users').where({name}).update({'avatar':avatar}), req.files.image.mv(path)}
  return res.json({success: true, message: 'Данные обновлены'})
  })
.catch((err) => {
  console.error(err)
  return res.json({success: false, message: 'An error occurred, please try again later.'})
})
});