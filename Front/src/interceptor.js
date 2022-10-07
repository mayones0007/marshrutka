import { showToast, toastTypes } from "./toast"

export const initInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = JSON.parse(localStorage.getItem('userData'))?.token;
      if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  let refreshPromise = null;

  axiosInstance.interceptors.response.use(function (response) {
    return response;
  }, async (error) => {
    const config = error.config;
    if (error.response.status === 401) {
      if (!refreshPromise) {
        refreshPromise = axiosInstance.post('refresh',
          {
            token: JSON.parse(localStorage.getItem('userData'))?.refreshToken
          })
        const tokenResponse = await refreshPromise
        refreshPromise = null;
        localStorage.setItem('userData', JSON.stringify({ token: tokenResponse.data.accessToken, refreshToken: tokenResponse.data.refreshToken }))
      } else {
        await refreshPromise
      }
      return axiosInstance(config);
    }
    if (error.response.status === 403 && error.response.data) {
      showToast(toastTypes.ERROR, error.response.data.message, 'bottom', 'right')
    }
    showToast(toastTypes.ERROR, error.response.data.message, 'bottom', 'right')
  })
}

