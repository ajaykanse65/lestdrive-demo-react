import { initializeApp } from "@firebase/app";
import { getMessaging, getToken } from 'firebase/messaging';
import { environment } from "../config/environment";

const app = initializeApp(environment.firebase);
const messaging = getMessaging(app);


export const getDeviceToken = async () => {
    try {
      const currentToken = await getToken(messaging, { vapidKey: environment.firebase.vapidKey });
      if (currentToken) {
        localStorage.setItem('deviceToken', currentToken);
        console.log('Device token:', currentToken);
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    } catch (err) {
      console.error('An error occurred while retrieving token. ', err);
    }
  };