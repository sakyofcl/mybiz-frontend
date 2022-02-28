import axios from 'axios';

axios.interceptors.request.use(
   (config) => {
      config.headers['token'] = localStorage.getItem('token');
      return config;
   },
   (error) => {
      console.log(error);
      return Promise.reject(error);
   }
);

axios.interceptors.response.use(
   (response) => {
      return response;
   },
   (error) => {
      return Promise.reject(error);
   }
);

export default axios;
