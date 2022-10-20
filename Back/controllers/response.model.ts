export interface AppResponse<T = AppErrorResponse> {
  body: T,
  status: number,
}

export interface AppErrorResponse {
  message: string,
}