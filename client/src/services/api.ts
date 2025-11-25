import axios from "axios";

const API = axios.create({
  baseURL: "https://mychatapp-xu23.onrender.com",
});

export default API;
