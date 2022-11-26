import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRE_BASE_API_KEY,
  authDomain: 'properties-management-dff37.firebaseapp.com',
  projectId: 'properties-management-dff37',
  storageBucket: 'properties-management-dff37.appspot.com',
  messagingSenderId: '433742168897',
  appId: '1:433742168897:web:921502b50da0ef3529d7c0',
  measurementId: 'G-V2JK12C1HM',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
