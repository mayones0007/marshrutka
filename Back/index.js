const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const knexConfig = require('./db/knexfile')
const knex = require('knex')(knexConfig[process.env.NODE_ENV])
const corsMiddleware = require('./middleware/cors')
const fileupload = require('express-fileupload')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const jwtSecret = require('./config/default.json').jwtSecret
const authMiddleware = require('./middleware/auth')


app.use(bodyParser.json(), express.static('public'), fileupload())

app.options('*', corsMiddleware, (req, res) => {
  res.status(204).send()
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

app.get('/', corsMiddleware, (req, res) => {
  knex('places')
  .then((places) => {
    return res.status(200).json(places);
  })
  .catch((err) => {
    return res.status(400).send({message: 'An error occurred, please try again later'})
  })
})

app.get('/place', corsMiddleware, (req, res) => {
  const place = req.query.id ? req.query.id : ''
  knex('places').where('eng', place).first()
  .then((place) => {
    return res.status(200).json(place)
  })
  .catch((err) => {
    return res.status(400).json({message: 'An error occurred, please try again later'})
  })
})

app.get('/reviews', corsMiddleware, (req, res) => {
  const placeId = req.query.id ? req.query.id : ''
  knex('reviews').where({ placeId }).join('users', 'reviews.userId', '=', 'users.id').select('users.name', 'reviews.text', 'reviews.createdAt', 'users.avatar','reviews.raiting')
  .then((reviews) => {
    return res.status(200).json(reviews)
  })
  .catch((err) => {
    return res.status(400).json({message: 'An error occurred, please try again later'})
  })
})

app.get('/pictures', corsMiddleware, (req, res) => {
  const place = req.query.id ? req.query.id : ''
  knex('pictures').where('eng', place).select('id')
    .then((pictures) => {
      return res.status(200).json(pictures.map(item => item.id + ".jpeg"))
    })
    .catch((err) => {
      return res.status(400).json({message: 'An error occurred, please try again later'})
    })
})

app.get('/favorites', corsMiddleware, (req, res) => {
  const userId = req.query.id
  knex('favorites').join('places', 'favorites.placeId', '=', 'places.id').where( { userId } ).select('')
  .then((favorites) => {
    return res.status(200).json(favorites)
  })
  .catch((err) => {
    console.error(err)
    return res.status(400).json({message: 'An error occurred, please try again later'})
  })
})

app.get('/auth', corsMiddleware, authMiddleware, (req, res) => {
  const id = req.user.userId
  const refreshToken = req.user.refreshToken ? req.user.refreshToken : ''
  if (refreshToken) {
  knex('users').where({ id }).first()
    .then((user) => {
      if (user.refreshToken === 'used') {
        return res.status(401).json({ message: 'Логинься заново' })
      } else {
        knex('users').update('refreshToken', 'used').where({ id }).catch((err) => console.log(err))
        knex('users').where({ id }).first().select('name', 'id', 'avatar')
          .then((user) => {
            return res.status(200).json({ user, refreshToken })
          })
      }
    })
  } else {
  knex('users').where({ id }).first().select('name', 'id', 'avatar')
    .then((user) => {
      return res.status(200).json({ user })
    })
  }
})

app.get('/routes', corsMiddleware, (req, res) => {
  const userId = req.query.id
  knex('routes').join('places', 'routes.placeId', '=', 'places.id').where( { userId } )
  .then((routes) => {
    return res.status(200).json(routes)
  })
  .catch((err) => {
    console.error(err)
    return res.status(400).json({message: 'An error occurred, please try again later'})
  })
})

app.post('/login', corsMiddleware, (req, res) => {
  const name = req.body.name ? req.body.name : ''
  const password = req.body.password ? req.body.password : ''
  knex('users').where('name', name).first()
    .then((user) => {
      if (!user) {
        return res.status(401).json({message: 'Неверный логин'})
      }
      if (user.password !== password) {
        return res.status(401).json({message: 'Неверный пароль'})
      }
    })
  knex('users').where({ name }).first().select('name','id','avatar')
    .then((user) => {
      const token = jwt.sign(
        { userId: user.id },
        jwtSecret,
        { expiresIn: '1h' }
      )
      knex('users').update('refreshToken', '').where('id', user.id ).catch((err) => console.log(err))
    return res.status(200).json({message: 'Успешный вход', token, user})
    })
    .catch((err) => {
      console.error(err)
      return res.status(400).json({message: 'An error occurred, please try again later'})
    })
})


app.post('/registration', corsMiddleware, (req, res) => {
  const name = req.body.name ? req.body.name : ''
  const email = req.body.email ? req.body.email : ''
  const password = req.body.password ? req.body.password : ''
  const avatar = "tourist.png"
  const createdAt = moment().locale('ru').format('LLL').replace('г.,', '')

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Заполните все поля' });
  }
  knex('users').where({ name }).first()
    .then((user) => {
      if(user) {
        return res.status(400).json({ message: 'Пользователь с таким именем уже существует' })
      }
    })
  knex('users').where({ email }).first()
    .then((user) => {
      if (user) {
        return res.status(400).json({ message: 'Пользователь с таким email уже существует' })
      }
    })
  knex('users')
    .insert({ name, email, password, avatar, createdAt })
    .then(() => {
      knex('users').where({ name }).first().select('name', 'id', 'avatar')
      .then(user => {
        const token = jwt.sign(
          { userId: user.id },
          jwtSecret,
          { expiresIn: '1h' }
        )
        knex('users').update('refreshToken', '').where('id', user.id).catch((err) => console.log(err))
        return res.status(200).json({ message: 'Успешная регистрация', token, user })}
      )
    })
    .catch((err) => {
    console.error(err)
      return res.status(400).json({ message: 'An error occurred, please try again later'});
});
});

app.post('/review', corsMiddleware, authMiddleware, (req, res) => {
  const text = req.body.text ? req.body.text : ''
  const raiting = req.body.raiting ? req.body.raiting : ''
  const userId = req.body.userId ? req.body.userId : ''
  const placeId = req.body.placeId ? req.body.placeId : ''
  const createdAt = moment().locale('ru').format('LLL').replace('г.,', '')
  knex('reviews')
    .insert({ placeId, userId, text, createdAt, raiting })
    .then(() => {
      return res.status(200).json({ message: 'Отзыв успешно добавлен' })
    })
    .catch((err) => {
      return res.status(400).json({ message: 'An error occurred, please try again later'})
    })
})

app.post('/favorite', corsMiddleware, authMiddleware, (req, res) => {
  const userId = req.body.userId ? req.body.userId : ''
  const placeId = req.body.placeId ? req.body.placeId : ''
if (userId === ''){
  return res.status(403).json({ message: 'Для добавления в избранное авторизуйтесь'})
}
  knex('favorites').where({ placeId }) .andWhere({ userId }).then((favorites)=> {
    if (favorites.length === 0){
      knex('favorites')
        .insert({ placeId, userId })
        .then(() => {
          return res.status(200).json({ message: 'Обьект успешно добавлен в избаннное'})
        })
    } else {
      knex('favorites')
        .where({ placeId }).andWhere({ userId }).del()
        .then(() => {
          return res.status(200).json({ message: 'Обьект успешно удален из избаннного'})
        })
    }
  })
    .catch((err) => {
      console.error(err)
      return res.status(400).json({ message: 'An error occurred, please try again later'})
    });
});

app.post('/route', corsMiddleware, authMiddleware, (req, res) => {
  const userId = req.body.userId ? req.body.userId : ''
  const placeId = req.body.placeId ? req.body.placeId : ''
  if (userId === ''){
  return res.status(403).json({ message: 'Для добавления в маршрут авторизуйтесь'})
}
  knex('routes').where({ placeId }).andWhere({ userId }).then((routes)=> {
    if (routes.length === 0){
      knex('routes')
        .insert({ placeId, userId })
        .then(() => {
          return res.status(200).json({ message: 'Обьект успешно добавлен в маршрут'})
        })
    } else {
      knex('routes')
        .where( {placeId} ).andWhere({ userId }).del()
        .then(() => {
          return res.status(200).json({ message: 'Обьект успешно удален из маршрута'})
        })
    }
  })
    .catch((err) => {
      console.error(err)
      return res.status(400).json({ message: 'An error occurred, please try again later.'})
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
          return res.status(200).json({ message: 'Место добавлено', places});
    })
})
    .catch((err) => {
    console.error(err);
      return res.status(400).json({ message: 'An error occurred, please try again later'});
    })
})

app.post('/settings', corsMiddleware, authMiddleware, (req, res) => {

  const name = req.body.name ? req.body.name : ''
  const email = req.body.email ? req.body.email : ''
  const password = req.body.password ? req.body.password : ''
  const oldEmail = req.body.oldEmail ? req.body.oldEmail : ''
  const oldPassword = req.body.oldPassword ? req.body.oldPassword : ''
  const avatar = 'avt-' + name + '.jpeg'
  const path = __dirname + '/public/avatars/' + avatar
  const updatedAt = moment().locale('ru').format('LLL').replace('г.,', '')

  knex('users').where({ name }).first()
    .then((user) => {
      if(email !== ''){
        if (user.email !== oldEmail) {
        return res.json({ message: 'Неверный email'})
      } else {
          knex('users').update({ email, updatedAt }).where({ name }).catch((err) => console.log(err))
      }}
      if(password !== ''){
        if (user.password !== oldPassword) {
          return res.json({ message: 'Неверный пароль'})
        } else {
          knex('users').update({ password, updatedAt }).where({ name }).catch((err) => console.log(err))
        }}
      if (req.files) { knex('users').update({ avatar, updatedAt }).where({ name }).catch((err) => console.log(err)), req.files.image.mv(path)}
      return res.status(200).json({ message: 'Данные обновлены'})
      })
    .catch((err) => {
      console.error(err)
      return res.status(400).json({ message: 'An error occurred, please try again later.'})
    })
});