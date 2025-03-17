import axios from 'axios';

const axiosBaseConfig = {
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

const httpClient = axios.create(axiosBaseConfig);

export { httpClient };
