import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 12000,
  headers: {
    Accept: 'application/json',
  },
});

export default api;
