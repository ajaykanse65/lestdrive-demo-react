// src/services/ApiService.js
import axios from 'axios';
import { environment } from '../config/environment'; // Adjust the path based on your project structure

const ApiService = {
  getData: (url, headers) => {
    return axios.get(`${environment.baseUrl}${url}`, {headers});
  },

  postData: (url, data, headers) => {
    return axios.post(`${environment.baseUrl}${url}`, data, {headers});
  }
  
};

export default ApiService;
