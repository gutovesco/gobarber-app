import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.43.122:3333',
});

export default api;
