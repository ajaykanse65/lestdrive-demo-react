import axios from 'axios';
import AuthService from '../service/authService';

export const socialRegister =  (value) => {
  try {
    const response =  AuthService.socialLogin(value);
    return response.data;
  } catch (error) {
    console.error('Error during social register:', error);
    throw error;
  }
};
