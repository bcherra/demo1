import http from "./http-common";

class LoginDataService {
  get(params) {
    return http.get("/login?api_key=AIzaSyDVNUZThb56H3JabU2o3yMp2cGleMcSeMg", { params });
  }
}

export default new LoginDataService();