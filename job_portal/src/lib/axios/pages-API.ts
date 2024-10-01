import api from "./instance";

const pagesAPI = {
  async getPagesData(type: string) {
    return await api.post("/api/pages",{type:type});
  },
  async postContactUs(payload: any) {
    return await api.post("/contactus/details", payload);
  },
  async getBanners() {
    return await api.get("/banner/list");
  },
  async getShippingDetails() {
    return await api.get("/offer/shipping/details");
  },
  async addNewsletterMail(payload: any) {
    return await api.post("/newsletter/", payload);
  },
  async getProductDetails(upc: string) {
    return await api.get("/user/product-details", { params: { upc: upc } });
  },
  async addProductDetails(payload: any) {
    return await api.post("/user/product-details", payload);
  },
  async getConstants() {
    return await api.get("/constants");
  },
};

export default pagesAPI;
