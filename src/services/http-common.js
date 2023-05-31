import axios from "axios";
// baseURL: "http://localhost:8081/datalyticsAlerting",baseURL: "https://alertingespv2-rv547wogxq-uc.a.run.app/datalyticsAlerting",
export default axios.create({
  baseURL: "https://alertingespv2-rv547wogxq-uc.a.run.app/datalyticsAlerting",
  headers: {
    "Content-type": "application/json"
  }
});