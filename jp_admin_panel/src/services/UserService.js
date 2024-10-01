import axios from 'axios'
import util from '../util/util'
export default class UserService {
  checkLoginActive(tokenObj) {
    return util
      .sendApiRequest('/api/users/admin', 'PUT', true, tokenObj)
      .then(
        (response) => {
          if (!response.error) {
            return response
          } else {
            return response
          }
        },
        (error) => {
          throw new Error(error)
        },
      )
      .catch((e) => {
        throw e
      })
  }
  signup(signupObj) {
    return util
      .sendApiRequest('/user', 'POST', true, signupObj)
      .then(
        (response) => {
          if (!response.error) {
            return response
          } else {
            return response
          }
        },
        (error) => {
          throw new Error(error)
        },
      )
      .catch((e) => {
        throw e
      })
  }
  async addUser(payload) {
    const config = {
      headers: {
        content: 'multipart/form-data',
      },
      withCredentials: true,
    }
    let token = window.user.token ? window.user.token : 'no-token'
    config.headers['Authorization'] = 'Bearer ' + token
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASEURL + '/user',
        payload,
        config,
      )
      if (response.err) {
        throw new Error(response.err)
      } else {
        return response.data
      }
    } catch (err) {
      throw err
    }
  }
  verifyUser(user_name) {
    return util
      .sendApiRequest('/user/verifyusername', 'POST', true, {
        user_name: user_name,
      })
      .then(
        (response) => {
          return response
        },
        (error) => {
          throw new Error(error)
        },
      )
      .catch((e) => {
        throw e
      })
  }

  verifyEmail(emailId) {
    return util
      .sendApiRequest('/user/verifyemail', 'POST', true, {
        email: emailId,
      })
      .then(
        (response) => {
          return response
        },
        (error) => {
          throw new Error(error)
        },
      )
      .catch((e) => {
        throw e
      })
  }
  login(loginObj) {
    return util
      .sendApiRequest('/api/users/admin', 'POST', true, loginObj)
      .then(
        (response) => {
          if (!response.error) {
            localStorage.setItem('user', JSON.stringify(response))
            window.user = response
            return response
          } else {
            return response
          }
        },
        (error) => {
          throw new Error(error)
        },
      )
      .catch((e) => {
        throw e
      })
  }
  oktaLogin(loginObj) {
    return util
      .sendApiRequest('/user/oktaLogin', 'POST', true, loginObj)
      .then(
        (response) => {
          if (!response.error) {
            localStorage.setItem('user', JSON.stringify(response))
            window.user = response
            return response
          } else {
            return response
          }
        },
        (error) => {
          throw new Error(error)
        },
      )
      .catch((e) => {
        throw e
      })
  }
  verifyLoginOtp(loginObj) {
    return util
      .sendApiRequest('/user/login/verifyotp', 'POST', true, loginObj)
      .then(
        (response) => {
          if (!response.error) {
            return response
          } else {
            return response
          }
        },
        (error) => {
          throw new Error(error)
        },
      )
      .catch((e) => {
        throw e
      })
  }

  async forgotPassword(forgotpassword) {
    try {
      return await util.sendApiRequest('/user/forgot', 'POST', true, forgotpassword)
    } catch (err) {
      throw err
    }
  }

  async resetPassword(payload) {
    return util
      .sendApiRequest('/user/reset', 'POST', true, payload)
      .then((response) => {
        return response
      })
      .catch((e) => {
        throw e
      })
  }

  changePassword(payload) {
    return util
      .sendApiRequest('/user/changepassword', 'POST', true, payload)
      .then((response) => {
        return response
      })
      .catch((e) => {
        throw e
      })
  }

  userListApi(data) {
    const activity = Object.keys(data).reduce((object, key) => {
      if (data[key] !== '') {
        object[key] = data[key]
      }
      return object
    }, {})

    return util.sendApiRequest('/user/list', 'POST', true, activity).then(
      (response) => {
        return response
      },
      (error) => {
        throw error
      },
    )
  }

  deleteUserRecordApi(dataId) {
    return util.sendApiRequest('/user/' + dataId, 'DELETE', true).then(
      (response) => {
        return response
      },
      (error) => {
        throw new Error(error)
      },
    )
  }

  async getUser(dataId) {
    return util
      .sendApiRequest('/user/' + dataId, 'GET', true)
      .then((response) => {
        return response
      })
      .catch((err) => {
        throw err
      })
  }

  edit(payload) {
    return util.sendApiRequest('/user', 'PUT', true, payload).then(
      (response) => {
        return response
      },
      (error) => {
        throw error
      },
    )
  }
  async editUser(payload) {
    const config = {
      headers: {
        content: 'multipart/form-data',
      },
      withCredentials: true,
    }
    let token = window.user.token ? window.user.token : 'no-token'
    config.headers['Authorization'] = 'Bearer ' + token
    try {
      const response = await axios.put(process.env.REACT_APP_API_BASEURL + '/user', payload, config)
      if (response.err) {
        throw new Error(response.err)
      } else {
        return response.data
      }
    } catch (err) {
      throw err
    }
  }
}
