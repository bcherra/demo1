import http from "./http-common";

class BasicAlertsDataService {
  getAll(params) {
    return http.get("/alerts?api_key=AIzaSyDVNUZThb56H3JabU2o3yMp2cGleMcSeMg", { params });
  }
  get(id) {
    return http.get('/alerts/${id}?api_key=AIzaSyDVNUZThb56H3JabU2o3yMp2cGleMcSeMg');
  }
  add(al) {
    return http.post("/alerts?api_key=AIzaSyDVNUZThb56H3JabU2o3yMp2cGleMcSeMg", al);
  }
  update(id, al) {
    const url = `/alerts/${id}?api_key=AIzaSyDVNUZThb56H3JabU2o3yMp2cGleMcSeMg`
    console.log('Alerts Update ' + url)
    return http.put(url, al);
  }
  delete(id) {
    const url =`/alerts/${id}?api_key=AIzaSyDVNUZThb56H3JabU2o3yMp2cGleMcSeMg`
    console.log('Alerts Update ' + url)
    return http.delete(url);
  }
 
}

export default new BasicAlertsDataService();