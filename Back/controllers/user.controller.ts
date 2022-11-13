import { Request } from "express"
import { models } from "../models/index"
import { authService } from "../services"
import { GetUserBody, LoginUserBody, Tokens } from "./interfaces/user.interface"
import { AppResponse } from "./response.model"
import { fileService } from '../services/file.service'
import { UploadedFile } from "express-fileupload"

export class UserController {
  async getUser(req: Request): Promise<AppResponse<GetUserBody> | AppResponse> {
    const id = req.user?.userId
    if (!id){
      return {
        status: 400,
        body: { message: 'Пользователь не найден' }
      }
    }
    const user = await models.user.getUser({ id })
    return {
      status: 200,
      body: {
        user:
          { name: user.name, id: user.id, avatar: user.avatar, role: user.role }
      }
    }
  }

  async registration(req: Request): Promise<AppResponse<LoginUserBody> | AppResponse> {
    const name = req.body.name
    const password = req.body.password
    const email = req.body.email
    const phone = req.body.phone

    if (!name || !password || !email || !phone){
      return  {
        status: 400,
        body: { message: 'Заполните все поля' }
      }
    }

    const userEmail = await models.user.getUser({ email })
    if (userEmail) {
      return {
        status: 400,
        body: { message: 'Пользователь с таким email уже существует' }
      }
    }

    const user = await models.user.addUser({ ...req.body, createdAt: new Date() })

    const { accessToken, refreshToken} = authService.getTokens(user.id, user.role)
    return {
      status: 200,
      body: {
        message: 'Успешный вход',
        accessToken,
        refreshToken,
        user: { name: user.name, id: user.id, avatar: user.avatar, role: user.role }
      }
    }
  }

  async getRefreshToken(req: Request): Promise<AppResponse<Tokens> | AppResponse> {
    const refreshToken = req.body.refreshToken
    const decoded = authService.updateTokens(refreshToken)
    if(decoded) {
      return {
        status: 200,
        body: {
          accessToken: decoded.accessToken,
          refreshToken: decoded.refreshToken,
        }
      }
    }
    return {
      status: 403,
      body: { message: 'Ошибка токена' }
    }
  }

  async login(req: Request): Promise<AppResponse<LoginUserBody> | AppResponse> {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
      return {
        status: 400,
        body: { message: 'E-mail и/или пароль отсутствуют' }
      }
    }

    const user = await models.user.getUser({ email })
    if (!user) {
      return {
        status: 400,
        body: { message: 'Неверный e-mail' }
      }
    }

    if (user.password !== password) {
      return {
        status: 400,
        body: { message: 'Неверный пароль' }
      }
    }

    const { accessToken, refreshToken } = authService.getTokens(user.id, user.role)
    return {
      status: 200,
      body: {
        message: 'Успешный вход',
        accessToken,
        refreshToken,
        user: { name: user.name, id: user.id, avatar: user.avatar, role: user.role }
      }
    }
  }

  async editUser(req: Request): Promise<AppResponse<GetUserBody> | AppResponse> {
    const id = req.user!.userId
    if (!id) {
      return {
        status: 403,
        body: { message: 'Доступ запрещен' }
      }
    } 
    const password = req.body.password
    const email = req.body.email
    const newPassword = req.body.newPassword
    const newEmail = req.body.newEmail
    const updatedAt = new Date()
    const user = await models.user.getUser({ id })

    if (email && newEmail) {
      if (user.email !== email) {
        return {
          status: 400,
          body: { message: 'Неверный email' }
        }
      } else {
        const userEmail = await models.user.getUser({ email: newEmail })
        if (userEmail) {
          return {
            status: 400,
            body: { message: 'Пользователь с таким email уже существует' }
          }
        } else {
          models.user.editUser({ id }, { email: newEmail, updatedAt })
          return {
            status: 200,
            body: { message: 'Email обновлен' }
          }
        }
      }
    }
    if (password && newPassword){
      if (user.password !== password) {
        return {
          status: 400,
          body: { message: 'Неверный пароль' }
        }
      } else {
        models.user.editUser({ id }, { password: newPassword, updatedAt })
        return {
          status: 200,
          body: { message: 'Пароль обновлен' }
        }
      }
    }
    if (req.files) {
      const files = req.files.avatar as UploadedFile
      models.user.editUser({ id }, { avatar: files.name, updatedAt })
      fileService.deleteFiles('avatars', user.avatar)
      fileService.saveFiles('avatars', files)
      return {
        status: 200,
        body: { message: 'Аватар обновлен' }
      }
    }
    return {
      status: 400,
      body: { message: 'Ошибка обновления' }
    }
  }
}