import { controllers }  from './controllers/index';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { corsMiddleware } from './middleware/cors';
import fileupload from 'express-fileupload';
import { authMiddleware } from './middleware/auth';
import { roleMiddleware } from './middleware/role';
const compression = require('compression')
const app = express()
const port = 3000

declare module 'express-serve-static-core' {
  interface Request {
    user: {
      userId?: number;
      role: string,
    }
  }
  interface Response {
    myField?: string
  }
}

app.use(bodyParser.json(), compression() ,express.static('public'), fileupload())

app.options('*', corsMiddleware, (req, res) => {
  res.status(204).send()
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})


app.get('/places', corsMiddleware, roleMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.place.getPlaces(req)
  res.status(response.status).send(response.body)
})

app.get('/place', corsMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.place.getPlace(req)
  res.status(response.status).send(response.body)
})

app.post('/place', corsMiddleware, authMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.place.addPlace(req)
  res.status(response.status).send(response.body)
})

app.patch('/place', corsMiddleware, authMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.place.editPlace(req)
  res.status(response.status).send(response.body)
})

app.get('/review', corsMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.review.getReviews(req)
  res.status(response.status).send(response.body)
})

app.delete('/review', corsMiddleware, authMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.review.deleteReview(req)
  res.status(response.status).send(response.body)
})

app.post('/review', corsMiddleware, authMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.review.createReview(req)
  res.status(response.status).send(response.body)
})

app.get('/pictures', corsMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.picture.getPictures(req)
  res.status(response.status).send(response.body)
})

app.get('/favorite', corsMiddleware, authMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.favorite.getFavorites(req)
  res.status(response.status).send(response.body)
})

app.get('/favoriteroutes', corsMiddleware, authMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.favorite.getFavoriteRoutes(req)
  res.status(response.status).send(response.body)
})

app.get('/myroute', corsMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.route.getMyRoute(req)
  res.status(response.status).send(response.body)
})

app.post('/myroute', corsMiddleware, authMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.route.addRoutePoint(req)
  res.status(response.status).send(response.body)
})

app.delete('/myroute', corsMiddleware, authMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.route.deleteRoutePoint(req)
  res.status(response.status).send(response.body)
})

app.get('/user', corsMiddleware, authMiddleware, async(req: Request, res: Response) => {
  const response = await controllers.user.getUser(req)
  res.status(response.status).send(response.body)
})

app.patch('/user', corsMiddleware, authMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.user.editUser(req)
  res.status(response.status).send(response.body)
})

app.post('/refresh', corsMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.user.getRefreshToken(req)
  res.status(response.status).send(response.body)
})

app.post('/login', corsMiddleware, async(req: Request, res: Response) => {
  const response = await controllers.user.login(req)
  res.status(response.status).send(response.body)
})

app.post('/registration', corsMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.user.registration(req)
  res.status(response.status).send(response.body)
})

app.post('/favorite', corsMiddleware, authMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.favorite.addFavorite(req)
  res.status(response.status).send(response.body)
})

app.delete('/favorite', corsMiddleware, authMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.favorite.deleteFavorite(req)
  res.status(response.status).send(response.body)
})

app.post('/pictures', corsMiddleware, authMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.picture.savePictures(req)
  res.status(response.status).send(response.body)
})

app.delete('/pictures', corsMiddleware, authMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.picture.deletePictures(req)
  res.status(response.status).send(response.body)
})

app.delete('/place', corsMiddleware, authMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.place.deletePlace(req)
  res.status(response.status).send(response.body)
})

app.get('/routelink', corsMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.route.getRouteByLink(req)
  res.status(response.status).send(response.body)
})

app.post('/routes', corsMiddleware, authMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.route.addRoute(req)
  res.status(response.status).send(response.body)
})

app.post('/email', corsMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.user.sendEmail(req)
  res.status(response.status).send(response.body)
})

app.post('/repassword', corsMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.user.rePassword(req)
  res.status(response.status).send(response.body)
})

app.get('/myroutes', corsMiddleware, authMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.route.getRoutes(req)
  res.status(response.status).send(response.body)
})

app.get('/routes', corsMiddleware, roleMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.route.getRoutes(req)
  res.status(response.status).send(response.body)
})

app.get('/route', corsMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.route.getRoute(req)
  res.status(response.status).send(response.body)
})

app.patch('/route', corsMiddleware, authMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.route.editRoute(req)
  res.status(response.status).send(response.body)
})

app.delete('/route', corsMiddleware, authMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.route.deleteRoute(req)
  res.status(response.status).send(response.body)
})

app.post('/booking', corsMiddleware, authMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.booking.createBooking(req)
  res.status(response.status).send(response.body)
})

app.patch('/booking', corsMiddleware, authMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.booking.setBooking(req)
  res.status(response.status).send(response.body)
})

app.get('/booking', corsMiddleware, authMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.booking.getBookings(req)
  res.status(response.status).send(response.body)
})

app.get('/filters', corsMiddleware, async (req: Request, res: Response) => {
  const response = await controllers.filter.getFilters(req)
  res.status(response.status).send(response.body)
})