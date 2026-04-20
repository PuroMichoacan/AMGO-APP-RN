import axios from 'axios';


const ENV_URLS = {
  DEV: process.env.EXPO_PUBLIC_API_URLDEBUG,
  QAS: process.env.EXPO_PUBLIC_API_URLQAS,
  PROD: process.env.EXPO_PUBLIC_API_URLPROD,
};


const baseApi = axios.create({
  baseURL: ENV_URLS.PROD, // default inicial
  headers: {
    'Content-Type': 'application/json',
  },
});


export const setBaseUrl = (env: 'DEV' | 'QAS' | 'PROD') => {
  baseApi.defaults.baseURL = ENV_URLS[env];
};

// const baseApi = axios.create({
//     baseURL : process.env.EXPO_PUBLIC_API_URLPROD,
//     headers: {
//     'Content-Type': 'application/json',
//   },

// });


export { baseApi };

