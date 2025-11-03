import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsSWQFlGwkR_uKAc2KhK3kuGNZdbcd0ls",
  authDomain: "test-b48a7.firebaseapp.com",
  databaseURL: "https://test-b48a7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-b48a7",
  storageBucket: "test-b48a7.firebasestorage.app",
  messagingSenderId: "784039966313",
  appId: "1:784039966313:android:df14a613593e41f60e54f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
export const database = getDatabase(app);
