
import util from "../util/util";
import axios from "axios";

export default class JobService {
  listAll(data: Data, url: string,requestType: string) {
    
    const activity = Object.keys(data).reduce((object: Data, key:string) => {
      if (data[key] !== "") {
        object[key] = data[key];
      }
      return object;
    }, {});

    return util.sendApiRequest(`/api/${url}`, requestType, true, activity).then(
      (response:any) => {
        return response;
      },
      (error:any) => {
        throw error;
      }
    );
  }
  

  async addJob(payload: any) {
    const config = {
      headers: {
        content: "multipart/form-data",
      },
      withCredentials: true,
    };

    try {
      const response: any = await axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/jobs`, payload, config);
      if (response.error) {
        throw new Error(response.err);
      } else {
        return response.data;
      }
    } catch (err) {
      throw err;
    }
  }
  async deleteJob(dataId:number) {
    return util.sendApiRequest(`api/jobs/` + dataId, "DELETE", true,{})
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  getEmployerJobs(data:any) {
    
    const activity = Object.keys(data).reduce((object: Data, key:string) => {
      if (data[key] !== "") {
        object[key] = data[key];
      }
      return object;
    }, {});

    return util.sendApiRequest(`/api/jobs`, "PUT", true, activity).then(
      (response:any) => {
        return response;
      },
      (error:any) => {
        throw error;
      }
    );
  }
  HaveApplicantAppliedJob(data:any) {
    
    const activity = Object.keys(data).reduce((object: Data, key:string) => {
      if (data[key] !== "") {
        object[key] = data[key];
      }
      return object;
    }, {});

    return util.sendApiRequest(`/api/apply-job`, "POST", true, activity).then(
      (response:any) => {
        return response;
      },
      (error:any) => {
        throw error;
      }
    );
  }
  applyJob(data:any) {
    
    const activity = Object.keys(data).reduce((object: Data, key:string) => {
      if (data[key] !== "") {
        object[key] = data[key];
      }
      return object;
    }, {});

    return util.sendApiRequest(`/api/apply-job`, "PUT", true, activity).then(
      (response:any) => {
        return response;
      },
      (error:any) => {
        throw error;
      }
    );
  }
  fetchAppliedJobs(data:any) {
    
    const activity = Object.keys(data).reduce((object: Data, key:string) => {
      if (data[key] !== "") {
        object[key] = data[key];
      }
      return object;
    }, {});

    return util.sendApiRequest(`/api/apply-job`, "PATCH", true, activity).then(
      (response:any) => {
        return response;
      },
      (error:any) => {
        throw error;
      }
    );
  }
  fetchAppliedResume(data:any) {
    
    const activity = Object.keys(data).reduce((object: Data, key:string) => {
      if (data[key] !== "") {
        object[key] = data[key];
      }
      return object;
    }, {});

    return util.sendApiRequest(`/api/employer`, "PATCH", true, activity).then(
      (response:any) => {
        return response;
      },
      (error:any) => {
        throw error;
      }
    );
  }

}
