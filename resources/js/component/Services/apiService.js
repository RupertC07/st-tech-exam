import axios from "axios";
import Cookies from "js-cookie";
const API_BASE_URL = window.env.API_BASE_URL;

const apiService = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

//setupo interceptors so we can setup bearer token automatically
//Also, if we want to apply api key, we can put it here
//now, if we willuse apiservice function, we can just pass the payload
apiService.interceptors.request.use((config) => {
    const token = Cookies.get("auth-token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
});

export default apiService;
