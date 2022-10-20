export interface GetUserBody {
  user: {
    name: string,
    id: number,
    avatar: string
  }
}

export interface Tokens {
  accessToken: string,
  refreshToken: string,
}

export interface LoginUserBody extends GetUserBody, Tokens{
}

