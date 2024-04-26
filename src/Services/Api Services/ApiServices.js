import axios from "axios";
import { environment } from "../../environment";
const baseURL = environment.baseUrl;

const API_BASE_URL = baseURL;
const apiService = axios.create({
  baseURL: API_BASE_URL,
});

export default apiService;
