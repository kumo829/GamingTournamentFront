import axios from 'axios'
import useSessionStorage from '../hooks/useSessionStorage'

axios.defaults.baseURL = 'http://localhost:8080/api'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

axios.interceptors.request.use(
  request => {
    const headerExists: boolean = Boolean(request.headers?.Authorization)

    const [token] = useSessionStorage('TOKEN_V1', null)

    if ((request.headers != null) && !headerExists && Boolean(token)) {
      request.headers.Authorization = token
    }

    return request
  },
  async error => await Promise.reject(error)
)
