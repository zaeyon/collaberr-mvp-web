import axios from 'axios';
import { getCookie } from '../lib/cookie';

//export const baseUrl = 'http://ec2-3-37-12-137.ap-northeast-2.compute.amazonaws.com:8000';
export const baseUrl = 'http://localhost:8000';

const axiosInstance = axios.create();

//axiosInstance.defaults.headers.common['X-CSRFToken'] = getCookie('csrftoken');

axiosInstance.defaults.withCredentials = true;

export default axiosInstance;

