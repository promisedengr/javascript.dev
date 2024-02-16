import axios from "axios";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL+"/api",
  headers: {
    "Content-type": "application/json"
  }
});