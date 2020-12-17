import axios from "axios";

export const getData = function () {
  return axios.get("/api/data");
};

export const createData = function (data) {
  return axios.post("/api/data", data);
};

export const upDateData = function (id) {
  return axios.put("/api/data" + id);
};
