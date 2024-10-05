import axios from 'axios';
import { environment } from '../config/environment';

class ProductService {
  constructor() {
    this.currentCar = {};
    this.baseUrl = environment.baseUrl; // Set your base URL from the environment
  }

  getCurrentCar() {
    return this.currentCar;
  }

  setCurrentCar(car) {
    this.currentCar = car;
  }

  getBrands() {
    const url = `${this.baseUrl}brands`;
    return axios.get(url);
  }

  getCategories() {
    const url = `${this.baseUrl}categories`;
    return axios.get(url);
  }

  getCars(data, filterList, categoryList, value, brandId) {
    const url = `${this.baseUrl}cars`;
    const body = {
      page: data,
      filter_list_id: filterList,
      category_id: categoryList,
      search: value,
      brand_id: brandId,
    };
    return axios.post(url, body);
  }

  getCarsWithBrand(data) {
    const url = `${this.baseUrl}cars`;
    const body = {
      brand_id: data,
    };
    return axios.post(url, body);
  }

  getCarsWithCategory(data) {
    const url = `${this.baseUrl}cars`;
    const body = {
      category_id: data,
    };
    return axios.post(url, body);
  }

  getCarDetails(value, headers) {
    const url = `${this.baseUrl}cars/${value}`;
    return axios.get(url, {headers});
  }

  getFilters() {
    const url = `${this.baseUrl}filters`;
    return axios.get(url);
  }

  search(name) {
    const url = `${this.baseUrl}cars/${name}`;
    return axios.get(url);
  }

  getCarFeatures(id) {
    const url = `${this.baseUrl}hot-offers/${id}`;
    return axios.get(url);
  }

  bookNow(data) {
    const url = `${this.baseUrl}hot-offers/enquiry`;
    return axios.post(url, data);
  }
}

export default new ProductService();
