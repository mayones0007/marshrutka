const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const knexConfig = require('./db/knexfile')
const knex = require('knex')(knexConfig[process.env.NODE_ENV])
const corsMiddleware = require('./middleware/cors')
const fileupload = require('express-fileupload')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const jwtSecret = require('./config/default.json').jwtSecret
const authMiddleware = require('./middleware/auth')
const config = require('./config/default.json')
const fs = require('fs')


app.use(bodyParser.json(), express.static('public'), fileupload())

app.options('*', corsMiddleware, (req, res) => {
  res.status(204).send()
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

app.get('/places', corsMiddleware, (req, res) => {
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

app.get('/review', corsMiddleware, (req, res) => {
  const placeId = req.query.id ? req.query.id : ''
  knex('reviews').where({ placeId }).join('users', 'reviews.userId', '=', 'users.id').select('users.name', 'reviews.id', 'reviews.text', 'reviews.createdAt', 'users.avatar','reviews.raiting')
  .then((reviews) => {
    return res.status(200).json(reviews)
  })
  .catch((err) => {
    return res.status(400).json({message: 'An error occurred, please try again later'})
  })
})

app.delete('/review', corsMiddleware, authMiddleware, (req, res) => {
  const reviewId = req.query.id ? req.query.id : ''
  knex('reviews').where({ id: reviewId }).del()
    .then(() => {
      return res.status(200).json({ message: 'Отзыв успешно удален' })
    })
    .catch((err) => {
      return res.status(400).json({ message: 'An error occurred, please try again later' })
    })
})

app.get('/pictures', corsMiddleware, (req, res) => {
  const place = req.query.id
  if (place) {
    knex('pictures').where('eng', place).select('id')
      .then((pictures) => {
        return res.status(200).json(pictures.map(item => item.id + ".jpeg"))
      })
      .catch((err) => {
        return res.status(400).json({ message: 'An error occurred, please try again later' })
      })
  } else {
    knex('pictures').whereIn('id',
      knex('pictures').max('id').groupBy('eng')
    )
      .then((pictures) => {
        return res.status(200).json(pictures)
      })
      .catch((err) => {
        return res.status(400).json({ message: 'An error occurred, please try again later' })
      })
  }
})

app.get('/favorite', corsMiddleware, authMiddleware, (req, res) => {
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

app.get('/user', corsMiddleware, authMiddleware, (req, res) => {
  const id = req.user.userId
  knex('users').where({ id }).first().select('name', 'id', 'avatar')
    .then((user) => {
      return res.status(200).json({ user })
    })
})

app.post('/refresh', corsMiddleware, (req, res) => {
  const token = req.body.token;
  const decoded = jwt.verify(token, config.jwtSecret)
  if (decoded) {
    const accessToken = jwt.sign(
      { userId: decoded.userId },
      config.jwtSecret,
      { expiresIn: '15m' }
    )
    const refreshToken = jwt.sign(
      { userId: decoded.userId },
      config.jwtSecret,
      { expiresIn: '14d' }
    )
    return res.status(200).json({ accessToken, refreshToken })
  } else res.status(403).send()
})

app.get('/route', corsMiddleware, authMiddleware, (req, res) => {
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

app.get('/optimalroute', corsMiddleware, (req, res) => {
  const userId = req.query.id
  let optimalroute = []
  knex('routes').where({ userId })
  //knex('routes').join('routeMap', function () {this .on('routes.placeId', '=', 'routeMap.place1') .orOn('routes.placeId', '=', 'routeMap.place2')}).where({ userId })
  //knex('routes').join('routeMap', 'routes.placeId', '=', 'routeMap.place1').where({ userId })
    .then((routes) => {
      for (let i = 1; i < routes.length; i ++) {
        knex('routes').join('routeMap', function () {this .on(routes[i - 1].placeId, '=', 'routeMap.place1').andOn(routes[i].placeId, '=', 'routeMap.place2') }).where({ userId })
          .then((route) => {
            optimalroute.push(route)
          })
      }
      return res.status(200).json(optimalroute)
    })
    .catch((err) => {
      console.error(err)
      return res.status(400).json({ message: 'An error occurred, please try again later' })
    })
})

app.post('/login', corsMiddleware, (req, res) => {
  const name = req.body.name ? req.body.name : ''
  const password = req.body.password ? req.body.password : ''
  knex('users').where({ name }).first()
    .then((user) => {
      if (!user) {
        return res.status(400).json({message: 'Неверный логин'})
      }
      if (user.password !== password) {
        return res.status(400).json({message: 'Неверный пароль'})
      } else {
        const token = jwt.sign(
          { userId: user.id },
          jwtSecret,
          { expiresIn: '15m' }
        )
        const refreshToken = jwt.sign(
          { userId: user.id },
          jwtSecret,
          { expiresIn: '14d' }
        )
        return res.status(200).json({ message: 'Успешный вход', token, refreshToken, user: { name: user.name, id: user.id, avatar: user.avatar } })
        }
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
  knex('users').where({ name }).orWhere({ email }).first()
    .then((user) => {
      if (!user) {
        knex('users')
        .insert({ name, email, password, avatar, createdAt })
        .then(() => {
          knex('users').where({ name }).first().select('name', 'id', 'avatar')
            .then(user => {
              const token = jwt.sign(
                { userId: user.id },
                jwtSecret,
                { expiresIn: '15m' }
              )
              const refreshToken = jwt.sign(
                { userId: user.id },
                jwtSecret,
                { expiresIn: '14d' }
              )
              return res.status(200).json({ message: 'Успешная регистрация', token, refreshToken, user })
            }
            )
        })
      } else {
        if (user.name === name) {
          return res.status(400).json({ message: 'Пользователь с таким именем уже существует' })
        } else {
          return res.status(400).json({ message: 'Пользователь с таким email уже существует' })
        }
      }
    })
  .catch((err) => {
  console.error(err)
    return res.status(400).json({ message: 'An error occurred, please try again later'});
  })
})

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
  const placeId = req.body.placeId ? req.body.placeId : ''
  const userId = req.body.userId ? req.body.userId : ''
  knex('favorites').where({ placeId }).andWhere({ userId }).first()
    .then((favorite)=> {
      if (!favorite){
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
  const placeId = req.body.placeId ? req.body.placeId : ''
  const userId = req.body.userId ? req.body.userId : ''
  knex('routes').where({ placeId }).andWhere({ userId }).first()
    .then((route)=> {
      if (!route){
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


app.post('/place', corsMiddleware, authMiddleware, (req, res) => {
  const place = req.body.place
knex('places')
    .insert(place)
    .then(() => {
      return res.status(200).json({ message: 'Место добавлено'})
    })
    .catch((err) => {
    console.error(err);
      return res.status(400).json({ message: 'An error occurred, please try again later'});
    })
})

app.patch('/place', corsMiddleware, authMiddleware, (req, res) => {
  const place = req.body.place
  knex('places')
    .update(place).where({ id: place.id }).catch((err) => console.log(err))
    .then(() => {
      return res.status(200).json({ message: 'Место добавлено'})
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).json({ message: 'An error occurred, please try again later' });
    })
})

app.delete('/place', corsMiddleware, authMiddleware, (req, res) => {
  const id = req.query.id
  knex('places').where({ id }).del()
    .then(() => {
      return res.status(200).json({ message: 'Место удалено' })
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).json({ message: 'An error occurred, please try again later' });
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
})

app.post('/pictures', corsMiddleware, authMiddleware, (req, res) => {
  const eng = req.body.eng ? req.body.eng : ''
    knex('pictures')
      .insert({ eng })
      .then((id) => {
        const fileName = id + '.jpeg'
        const path = __dirname + '/public/img/' + fileName
        req.files.image.mv(path)
        return res.status(200).json({ message: 'Картинка добавлена' })
      })
    .catch((err) => {
      console.error(err);
      return res.status(400).json({ message: 'An error occurred, please try again later' })
    })
})

app.delete('/pictures', corsMiddleware, authMiddleware, (req, res) => {
  const id = req.query.image.split('.')[0]
  const fileName = req.query.image
  const path = __dirname + '/public/img/' + fileName
  knex('pictures').where({ id }).del()
    .then(() => {
      fs.unlink(path, err => {
        if (err) throw err;
        return res.status(200).json({ message: 'Картинка удалена' })
      })
    })
    .catch((err) => {
      return res.status(400).json({ message: 'An error occurred, please try again later' })
    })
})