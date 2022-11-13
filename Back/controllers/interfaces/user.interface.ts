export interface GetUserBody {
  user: {
    name: string,
    id: number,
    avatar: string,
    role: string,
  }
}

export interface Tokens {
  accessToken: string,
  refreshToken: string,
}

export interface LoginUserBody extends GetUserBody, Tokens{
}

