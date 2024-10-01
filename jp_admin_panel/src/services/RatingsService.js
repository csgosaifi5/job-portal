import axios from 'axios'
import util from '../util/util'
export default class RatingService {
  async addRating(payload) {
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
        process.env.REACT_APP_API_BASEURL + '/ratings',
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

    return util.sendApiRequest('/ratings/list', 'POST', true, activity).then(
      (response) => {
        return response
      },
      (error) => {
        throw error
      },
    )
  }

  getRatings(dataId) {
    return util
      .sendApiRequest('/ratings/' + dataId, 'GET', true)
      .then((response) => {
        return response
      })
      .catch((err) => {
        throw err
      })
  }

  async getDetails(dataId) {
    return util
      .sendApiRequest('/ratings/' + dataId, 'GET', true)
      .then((response) => {
        return response
      })
      .catch((err) => {
        throw err
      })
  }

  async editRating(payload) {
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
        process.env.REACT_APP_API_BASEURL + '/ratings',
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

  deleteRating(dataId) {
    return util.sendApiRequest('/ratings/' + dataId, 'DELETE', true).then(
      (response) => {
        return response
      },
      (error) => {
        throw new Error(error)
      },
    )
  }
}
