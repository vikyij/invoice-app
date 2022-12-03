// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA_RBrKUvc08LmzhqdK5x3Y4NP0_t-fKOg',
  authDomain: 'invoice-app-3f7cd.firebaseapp.com',
  projectId: 'invoice-app-3f7cd',
  storageBucket: 'invoice-app-3f7cd.appspot.com',
  messagingSenderId: '475711630503',
  appId: '1:475711630503:web:0fec9a5461c8c8b6d8bf82',
  measurementId: 'G-FYKMEGN9SP',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export { db }
