import axios from "axios"


const baseUrl = axios.create({baseURL: "https://oula.org.sa/api"})


baseUrl.interceptors.request.use(
    (config) => {
      const lang = localStorage.getItem("i18nextLng");
      if (lang) {
        config.headers["Accept-Language"] = lang;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default baseUrl