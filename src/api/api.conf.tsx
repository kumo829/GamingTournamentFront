import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/api'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

axios.interceptors.request.use(
  request => {
    const headerExists: boolean = Boolean(request.headers?.Authorization)

    if ((request.headers != null) && !headerExists && Boolean(sessionStorage.getItem('token'))) {
      request.headers.Authorization = sessionStorage.getItem('token')
    }

    return request
  },
  async error => await Promise.reject(error)
)
