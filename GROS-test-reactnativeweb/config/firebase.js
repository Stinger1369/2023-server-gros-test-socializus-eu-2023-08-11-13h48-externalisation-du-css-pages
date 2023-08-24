// import 'dotenv/config'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// const {
//     FIREBASE_API_KEY,
//     FIREBASE_AUTH_DOMAIN,
//     FIREBASE_PROJET_ID,
//     FIREBASE_STORAGE_BUCKET,
//     FIREBASE_MESSAGING_SENDER_ID,
//     FIREBASE_APP_ID
// } = process.env
// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDuFhZ4ItxxFwlkbbHp-rnrX4sjH7vijNw",
    authDomain: "socializus-chat.firebaseapp.com",
    projectId: "socializus-chat",
    storageBucket: "socializus-chat.appspot.com",
    messagingSenderId: "536261098157",
    appId: "1:536261098157:web:8be76f1067b5f97772a424"
}

// Initialize firebase
initializeApp(firebaseConfig)
export const database = getFirestore()