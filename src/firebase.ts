// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCeGkyTk_RqWxi0FE0MQ0J0FGSo_dNLvOg",
  authDomain: "book-wheel.firebaseapp.com",
  projectId: "book-wheel",
  storageBucket: "book-wheel.appspot.com",
  messagingSenderId: "1061012424708",
  appId: "1:1061012424708:web:0e55292effdb6e7bcf0d51",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// export const messaging = getMessaging(app);
// export const requestForToken = async () => {
//   try {
//     const currentToken = await getToken(messaging, {
//       vapidKey:
//         "BFs3ANs3WvELOr5vUPxpC-TyEbAluZhbMfWdl_3V-nG_1W3FNYHBo8g6KRsrBM4MAyh82tBe4iZzs67DNdrgtGA",
//     });
//     if (currentToken) {
//       console.log("FCM Token:", currentToken);
//       // Send the token to your server and update the UI if necessary
//     } else {
//       console.log(
//         "No registration token available. Request permission to generate one."
//       );
//     }
//   } catch (err) {
//     console.error("An error occurred while retrieving token. ", err);
//   }
// };
