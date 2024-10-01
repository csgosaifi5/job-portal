import util from "../util/util";
import axios from "axios";

export default class UserService {


  verifyUser(user_name: string) {
    return util
      .sendApiRequest("/user/verifyusername", "POST", true, {
        user_name: user_name,
      })
      .then(
        (response) => {
          return response;
        },
        (error) => {
          throw new Error(error);
        }
      )
      .catch((e) => {
        throw e;
      });
  }

  verifyEmail(emailId: string) {
    return util
      .sendApiRequest("/user/verifyemail", "POST", true, {
        email: emailId,
      })
      .then(
        (response) => {
          return response;
        },
        (error) => {
          throw new Error(error);
        }
      )
      .catch((e) => {
        throw e;
      });
  }

  login(loginObj: any) {
    return util
      .sendApiRequest("/api/users", "POST", true, loginObj)
      .then(
        (response) => {
          if (!response.error) {
            localStorage.setItem("user", JSON.stringify(response.data));
            return response;
          } else {
            return response;
          }
        },
        (error) => {
          throw new Error(error);
        }
      )
      .catch((e) => {
        throw e;
      });
  }
  verifyLoginOtp(loginObj: any) {
    return util
      .sendApiRequest("/user/login/verifyotp", "POST", true, loginObj)
      .then(
        (response) => {
          if (!response.error) {
            return response;
          } else {
            return response;
          }
        },
        (error) => {
          throw new Error(error);
        }
      )
      .catch((e) => {
        throw e;
      });
  }

  async forgotPassword(forgotpassword: any) {
    try {
      return await util.sendApiRequest("/api/users", "PATCH", true, forgotpassword);
    } catch (err) {
      throw err;
    }
  }
  async resetPassword(data: any) {
    try {
      return await util.sendApiRequest("/api/users/admin", "PATCH", true, data);
    } catch (err) {
      throw err;
    }
  }
  async changePassword(data: any) {
    try {
      return await util.sendApiRequest("/api/applicant", "PATCH", true, data);
    } catch (err) {
      throw err;
    }
  }

  isLoginActive(loginObj: any) {
    return util
      .sendApiRequest("/api/users", "PUT", true, loginObj)
      .then(
        (response) => {
          if (!response.error) {
            return response;
          } else {
            return response;
          }
        },
        (error) => {
          throw new Error(error);
        }
      )
      .catch((e) => {
        throw e;
      });
  }
  async registerUser(payload: any,url:string) {
    return util
      .sendApiRequest(`/api/${url}`, "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }


  async updateUser(payload: any,url:string) {
    const config = {
      headers: {
        content: "multipart/form-data",
      },
      withCredentials: true,
    };

    try {
      const response: any = await axios.put(process.env.NEXT_PUBLIC_API_URL + `/api/${url}`, payload, config);
      if (response.error) {
        throw new Error(response.err);
      } else {
        return response.data;
      }
    } catch (err) {
      throw err;
    }
  }
}