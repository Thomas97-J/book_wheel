// import { initializeApp } from "firebase/app";
// import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

// // Firebase configuration object
// const firebaseConfig = {
//   apiKey: "AIzaSyCeGkyTk_RqWxi0FE0MQ0J0FGSo_dNLvOg",
//   authDomain: "book-wheel.firebaseapp.com",
//   projectId: "book-wheel",
//   storageBucket: "book-wheel.appspot.com",
//   messagingSenderId: "1061012424708",
//   appId: "1:1061012424708:web:0e55292effdb6e7bcf0d51",
// };

// // Initialize Firebase app
// const app = initializeApp(firebaseConfig);

// // Get Firebase Messaging instance
// const messaging = getMessaging(app);

// // Set up background message handler
// onBackgroundMessage(messaging, (payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: "/firebase-logo.png",
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
