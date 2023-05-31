import http from "./http-common";

class ChannelsDataService {
  getAll(params) {
    return http.get("/channels?api_key=AIzaSyDVNUZThb56H3JabU2o3yMp2cGleMcSeMg", { params });
  }
  get(id) {
    return http.get('/channels/${id}?api_key=AIzaSyDVNUZThb56H3JabU2o3yMp2cGleMcSeMg');
  }
  add(al) {
    return http.post("/channels?api_key=AIzaSyDVNUZThb56H3JabU2o3yMp2cGleMcSeMg", al);
  }
  update(id, al) {
    const url = `/channels/${id}?api_key=AIzaSyDVNUZThb56H3JabU2o3yMp2cGleMcSeMg`
    console.log('channels Update ' + url)
    return http.put(url, al);
  }
  delete(id) {
    const url =`/channels/${id}?api_key=AIzaSyDVNUZThb56H3JabU2o3yMp2cGleMcSeMg`
    console.log('channels Update ' + url)
    return http.delete(url);
  }
 
}

export default new ChannelsDataService();