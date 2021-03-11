import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/functions';
import FirebaseConfig from './FirebaseConfig'

const firebaseApp = firebase.initializeApp(FirebaseConfig);
const cloudFunctions = firebaseApp.functions();
const db = firebaseApp.firestore();
export {cloudFunctions, db};
