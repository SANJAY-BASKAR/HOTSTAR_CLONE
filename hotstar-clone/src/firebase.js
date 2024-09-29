import firebase from "firebase/compat/app";
import "firebase/compat/auth"; // Import for auth
import "firebase/compat/firestore"; // Import for Firestore
import "firebase/compat/storage"; // Import for storage

const firebaseConfig = {
    apiKey: "AIzaSyA71oe4VsPRLjprgt7qYJyVSb8n1V76glI",
    authDomain: "hotstar-clone-sb98438.firebaseapp.com",
    projectId: "hotstar-clone-sb98438",
    storageBucket: "hotstar-clone-sb98438.appspot.com",
    messagingSenderId: "323271446072",
    appId: "1:323271446072:web:0e226269a1f74efa3da0cd",
    measurementId: "G-NN5JBPZQCM"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
