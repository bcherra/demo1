import http from "./http-common";

class AlertEngineResultsService {
  getAll(params) {
    return http.get("/alertsEngine/results?api_key=AIzaSyDVNUZThb56H3JabU2o3yMp2cGleMcSeMg", { params });
  }
  getResultRecords(params) {
    const url =`/alertsEngine/resultsFile/?api_key=AIzaSyDVNUZThb56H3JabU2o3yMp2cGleMcSeMg`
    console.log(params)
    return http.get(url, {params});
  }
  getResultRecordsByRunId(params) {
    const url =`/alertsEngine/resultsFileByRunId/?api_key=AIzaSyDVNUZThb56H3JabU2o3yMp2cGleMcSeMg`
    console.log(params)
    return http.get(url, {params});
  }
  testAlert(al) {
    return http.post("/testAlert?api_key=AIzaSyDVNUZThb56H3JabU2o3yMp2cGleMcSeMg", al);
  }
 }

export default new AlertEngineResultsService();