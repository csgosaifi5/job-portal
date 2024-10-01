
import util from "../util/util";

export default class CommonService {
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

//   relatedAll(data, url) {
//     return util.sendApiRequest(`/${url}/related`, "POST", true, data).then(
//       (response) => {
//         return response;
//       },
//       (error) => {
//         throw error;
//       }
//     );
//   }

//   categoryListAndCount(data, url) {
//     return util.sendApiRequest(`/${url}/category-count`, "POST", true, data).then(
//       (response) => {
//         return response;
//       },
//       (error) => {
//         throw error;
//       }
//     );
//   }
//   async getDetails(dataId, url) {
//     return util
//       .sendApiRequest(`/${url}/` + dataId, "GET", true)
//       .then((response) => {
//         return response;
//       })
//       .catch((err) => {
//         throw err;
//       });
//   }
  async getDetailsBySlug(dataId:string, url:string) {
    return util.sendApiRequest(`api/${url}/` + dataId, "PUT", true,{})
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }


}
