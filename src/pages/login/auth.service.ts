import axios from 'axios'

const authService = {
  login: async function (username: string, password: string) {
    return await axios
      .post('/login', {
        username,
        password
      })
      .then(response => {
        if (response.headers?.authorization != null) {
          sessionStorage.setItem('token', response.headers.authorization)
          sessionStorage.setItem('user', JSON.stringify(response.data))
        }

        return response.data
      })
  },

  logout: function () {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
  },

  register: async function (firstname: string, lastname: string, email: string) {
    return await axios.post('/signup', {
      firstname,
      lastname,
      email
    })
  },

  getCurrentUser: function () {
    const storedUser = sessionStorage.getItem('user')
    return storedUser != null ? JSON.parse(storedUser) : ''
  }
}

export default authService
