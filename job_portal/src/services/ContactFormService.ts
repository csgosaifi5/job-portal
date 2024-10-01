import util from "../util/util";

export default class ContactFormService {
  async add(payload:any) {
    return util
      .sendApiRequest("/api/contactform", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  
}
