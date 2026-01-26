import axios from 'axios';

const baseApi = axios.create({
    baseURL : process.env.EXPO_PUBLIC_API_URLQAS,
    headers: {
    'Content-Type': 'application/json',
  },

});


export { baseApi };
