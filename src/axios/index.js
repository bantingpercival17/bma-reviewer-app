import axios from 'axios';

// Set baseURL globally for all requests
const prod = 'http://one.bma.edu.ph/api/'
//const prod = 'http://192.168.68.102:7000/api/'
//const testing = 'http://127.0.0.1:70/api/'
const testing = 'http://one.bma.edu.ph/api/'
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? prod : testing
/* 'http://one.bma.edu.ph/api/' */
;
// Create an instance of Axios with the default configurations
const axiosInstance = axios.create();

export default axiosInstance;