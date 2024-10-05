import axios from 'axios';
// import { GoogleLogout } from 'react-google-login';
import { environment } from '../config/environment'; // Adjust the path based on your project structure

const BASE_URL = environment.baseUrl; // Set your base URL in .env file

class AuthService {
  static register(data) {
    const url = `${BASE_URL}customer/register`;
    return axios.post(url, data);
  }

  static login(data) {
    // console.log(BASE_URL);
    const url = `${BASE_URL}customer/login`;
    return axios.post(url, data);
  }

  // static logout(onLogoutSuccess, onLogoutFailure) {
  //   return (
  //     <GoogleLogout
  //       clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} // Set your Google Client ID in .env file
  //       buttonText="Logout"
  //       onLogoutSuccess={onLogoutSuccess}
  //       onFailure={onLogoutFailure}
  //     />
  //   );
  // }

  static logout(headers){
    const url = `${BASE_URL}customer/logout`;
    return axios.get(url,{headers});
  }

  // static logout()

  static countryCode() {
    const url = `${BASE_URL}countries`;
    return axios.get(url);
  }

  static socialLogin(data) {
    const url = `${BASE_URL}customer/oauth2/validate`;
    return axios.post(url, data);
  }
}

export default AuthService;
