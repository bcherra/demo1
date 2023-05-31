import http from "./http-common";

class ThresholdDataService {
  getAll(params) {
    return http.get("/threshold?api_key=AIzaSyDVNUZThb56H3JabU2o3yMp2cGleMcSeMg", { params });
  }
  get(id) {
    return http.get('/threshold/${id}?api_key=AIzaSyDVNUZThb56H3JabU2o3yMp2cGleMcSeMg');
  }
  add(th) {
    return http.post("/threshold?api_key=AIzaSyDVNUZThb56H3JabU2o3yMp2cGleMcSeMg", th);
  }
  update(id, th) {
    const url = `/threshold/${id}?api_key=AIzaSyDVNUZThb56H3JabU2o3yMp2cGleMcSeMg`
    console.log('Threashold Update ' + url)
    return http.put(url, th);
  }
  delete(id) {
    const url =`/threshold/${id}?api_key=AIzaSyDVNUZThb56H3JabU2o3yMp2cGleMcSeMg`
    console.log('Threashold Update ' + url)
    return http.delete(url);
  }
}

export default new ThresholdDataService();