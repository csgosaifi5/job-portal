import axios from 'axios'
import util from '../util/util'
export default class BlogService {
  async addBlog(payload) {
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
        process.env.REACT_APP_API_BASEURL + '/api/blogs',
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

  listAll(data) {
    const activity = Object.keys(data).reduce((object, key) => {
      if (data[key] !== '') {
        object[key] = data[key]
      }
      return object
    }, {})

    return util.sendApiRequest('/api/blogs', 'PATCH', true, activity).then(
      (response) => {
        return response
      },
      (error) => {
        throw error
      },
    )
  }

  getBlog(dataId) {
    return util
      .sendApiRequest('/api/blogs/' + dataId, 'GET', true)
      .then((response) => {
        return response
      })
      .catch((err) => {
        throw err
      })
  }

  async getDetails(dataId) {
    return util
      .sendApiRequest('/api/blogs/' + dataId, 'GET', true)
      .then((response) => {
        return response
      })
      .catch((err) => {
        throw err
      })
  }

  async editBlog(payload) {
    const config = {
      headers: {
        content: 'multipart/form-data',
      },
      withCredentials: true,
    }
    let token = window.user.token ? window.user.token : 'no-token'
    config.headers['Authorization'] = 'Bearer ' + token
    try {
      const response = await axios.put(
        process.env.REACT_APP_API_BASEURL + '/api/blogs',
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

  deleteBlog(dataId) {
    return util.sendApiRequest('/api/blogs/' + dataId, 'DELETE', true).then(
      (response) => {
        return response
      },
      (error) => {
        throw new Error(error)
      },
    )
  }
}
