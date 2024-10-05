 // Scripts for firebase and firebase messaging
 importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
 importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

 // Initialize the Firebase app in the service worker by passing the generated config
 const firebaseConfig = {
    apiKey: 'AIzaSyAHvgU2qgqBcsShLd3tXL2L5AfstXVsN_Y',
    authDomain: 'lets-drive-371408.firebaseapp.com',
    projectId: 'lets-drive-371408',
    storageBucket: 'lets-drive-371408.appspot.com',
    messagingSenderId: '916977580664',
    appId: '1:916977580664:web:13927b3c8f28b180f98b8d',
    measurementId: 'G-DVMB1C5B2L',
    vapidKey:
      'BL318I6xNONNfhIkFH5ppTO29hFK2ztd9Y7dX2JgJf03iJJykWQ6o8yNfJ48ZmUrUNsHRBfcQ9slwJtoxD5-QR0',
 };

 firebase.initializeApp(firebaseConfig);

 // Retrieve firebase messaging
 const messaging = firebase.messaging();

 messaging.onBackgroundMessage(function(payload) {
   console.log("Received background message ", payload);

   const notificationTitle = payload.notification.title;
   const notificationOptions = {
     body: payload.notification.body,
   };

   self.registration.showNotification(notificationTitle, notificationOptions);
 });