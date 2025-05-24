import axios from "axios";

const api = axios.create({
  baseURL: process.env.BACKEND_BASE_URL,
  headers: {
    "x-api-key": process.env.API_KEY, // API_KEY در .env تعریف شده
  },
});

export default api;
