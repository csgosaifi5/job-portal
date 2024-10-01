import axios from 'axios'
import util from '../util/util'

export default class PagesService {
  addPage(payload) {
    return util
      .sendApiRequest('/pages', 'POST', true, payload)
      .then((response) => {
        return response
      })
      .catch((err) => {
        throw err
      })
  }
  listAll(data) {
    const activity = Object.keys(data).reduce((object, key) => {
      if (data[key] !== '') {
        object[key] = data[key]
      }
      return object
    }, {})

    return util.sendApiRequest('/pages/list', 'POST', true, activity).then(
      (response) => {
        return response
      },
      (error) => {
        throw error
      },
    )
  }
  getDetails(dataId) {
    return util
      .sendApiRequest('/api/pages', 'POST', true, {type:dataId})
      .then((response) => {
        return response
      })
      .catch((err) => {
        throw err
      })
  }
  async editPage(payload) {
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
        process.env.REACT_APP_API_BASEURL + '/api/pages',
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
}
