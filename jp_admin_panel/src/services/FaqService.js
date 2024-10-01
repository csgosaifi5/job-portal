import axios from 'axios'
import util from '../util/util'
export default class FaqService {
  async addFaq(payload) {
    const config = {
      headers: {
        content: 'multipart/form-data',
      },
      withCredentials: true,
    }
    let token = window.user.token ? window.user.token : 'no-token'
    config.headers['Authorization'] = 'Bearer ' + token
    try {
      const response = await axios.post(process.env.REACT_APP_API_BASEURL + '/faq', payload, config)
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

    return util.sendApiRequest('/faq/list', 'POST', true, activity).then(
      (response) => {
        return response
      },
      (error) => {
        throw error
      },
    )
  }

  getFaq(dataId) {
    return util
      .sendApiRequest('/faq/' + dataId, 'GET', true)
      .then((response) => {
        return response
      })
      .catch((err) => {
        throw err
      })
  }

  async getDetails(dataId) {
    return util
      .sendApiRequest('/faq/' + dataId, 'GET', true)
      .then((response) => {
        return response
      })
      .catch((err) => {
        throw err
      })
  }

  async editFaq(payload) {
    const config = {
      headers: {
        content: 'multipart/form-data',
      },
      withCredentials: true,
    }
    let token = window.user.token ? window.user.token : 'no-token'
    config.headers['Authorization'] = 'Bearer ' + token
    try {
      const response = await axios.put(process.env.REACT_APP_API_BASEURL + '/faq', payload, config)
      if (response.err) {
        throw new Error(response.err)
      } else {
        return response.data
      }
    } catch (err) {
      throw err
    }
  }

  deleteFaq(dataId) {
    return util.sendApiRequest('/faq/' + dataId, 'DELETE', true).then(
      (response) => {
        return response
      },
      (error) => {
        throw new Error(error)
      },
    )
  }
  async updateOrderNo(Data) {
    try {
      const response = await axios.put(process.env.REACT_APP_API_BASEURL + '/faq/order_no', Data, {
        headers: {
          Authorization: 'Bearer ' + window.user.token,
          content: 'multipart/form-data',
        },
        withCredentials: true,
      })

      if (!response.error) {
        return response.data
      }

      throw response.error
    } catch (err) {
      throw err
    }
  }
}
