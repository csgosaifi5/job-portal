import util from '../util/util'
import axios from 'axios'

export default class GalleryVideosService {
  async add(payload) {
    const config = {
      headers: {
        content: 'multipart/form-data',
      },
      withCredentials: true,
    }
    let token = window?.user?.token ? window.user.token : 'no-token'
    config.headers['Authorization'] = 'Bearer ' + token

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASEURL + '/galleryvideos',
        payload,
        config,
      )
      if (response.error) {
        throw new Error(response.error)
      } else {
        return response.data
      }
    } catch (error) {
      throw error
    }
  }

  async edit(payload) {
    const config = {
      headers: {
        content: 'multipart/form-data',
      },
      withCredentials: true,
    }
    let token = window?.user?.token ? window.user.token : 'no-token'
    config.headers['Authorization'] = 'Bearer ' + token

    try {
      const response = await axios.put(
        process.env.REACT_APP_API_BASEURL + '/galleryvideos',
        payload,
        config,
      )
      if (response.error) {
        throw new Error(response.error)
      } else {
        return response.data
      }
    } catch (error) {
      throw error
    }
  }
  listAll(data) {
    const activity = Object.keys(data).reduce((object, key) => {
      if (data[key] !== '') {
        object[key] = data[key]
      }
      return object
    }, {})

    return util.sendApiRequest('/galleryvideos/list', 'POST', true, activity).then(
      (response) => {
        return response
      },
      (error) => {
        throw error
      },
    )
  }
  async getDetails(dataId) {
    return util
      .sendApiRequest('/galleryvideos/' + dataId, 'GET', true)
      .then((response) => {
        return response
      })
      .catch((err) => {
        throw err
      })
  }

  delete(dataId) {
    return util.sendApiRequest('/galleryvideos/' + dataId, 'DELETE', true).then(
      (response) => {
        return response
      },
      (error) => {
        throw new Error(error)
      },
    )
  }
}
