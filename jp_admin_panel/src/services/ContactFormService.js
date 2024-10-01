import util from '../util/util'

export default class ContactFormService {
  listAll(data) {
    const activity = Object.keys(data).reduce((object, key) => {
      if (data[key] !== '') {
        object[key] = data[key]
      }
      return object
    }, {})

    return util.sendApiRequest('/api/contactform', 'PUT', true, activity).then(
      (response) => {
        return response
      },
      (error) => {
        throw error
      },
    )
  }

  chatbotUsersList(data) {
    const activity = Object.keys(data).reduce((object, key) => {
      if (data[key] !== '') {
        object[key] = data[key]
      }
      return object
    }, {})

    return util.sendApiRequest('/chatbot/contact-us/listAll', 'POST', true, activity).then(
      (response) => {
        return response
      },
      (error) => {
        throw error
      },
    )
  }
  appointmentUsersList(data) {
    const activity = Object.keys(data).reduce((object, key) => {
      if (data[key] !== '') {
        object[key] = data[key]
      }
      return object
    }, {})

    return util.sendApiRequest('/appointments/contact-us/listAll', 'POST', true, activity).then(
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
      .sendApiRequest('/contactform/' + dataId, 'GET', true)
      .then((response) => {
        return response
      })
      .catch((err) => {
        throw err
      })
  }

  deleteChatbotUser(dataId) {
    return util.sendApiRequest('/chatbot/contact-us/' + dataId, 'DELETE', true).then(
      (response) => {
        return response
      },
      (error) => {
        throw new Error(error)
      },
    )
  }
  deleteAppointmentUser(dataId) {
    return util.sendApiRequest('/appointments/contact-us/' + dataId, 'DELETE', true).then(
      (response) => {
        return response
      },
      (error) => {
        throw new Error(error)
      },
    )
  }
  delete(dataId) {
    return util.sendApiRequest('/api/contactform' , 'DELETE', true,dataId).then(
      (response) => {
        return response
      },
      (error) => {
        throw new Error(error)
      },
    )
  }
  listAllSubscription(data) {
    const activity = Object.keys(data).reduce((object, key) => {
      if (data[key] !== '') {
        object[key] = data[key]
      }
      return object
    }, {})

    return util.sendApiRequest('/contactform/keepuptodate/list', 'POST', true, activity).then(
      (response) => {
        return response
      },
      (error) => {
        throw error
      },
    )
  }
  deleteSubscription(dataId) {
    return util.sendApiRequest('/contactform/keepuptodate/' + dataId, 'DELETE', true).then(
      (response) => {
        return response
      },
      (error) => {
        throw new Error(error)
      },
    )
  }
}
