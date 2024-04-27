import { getDatabase, ref, get } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';

const firebaseConfig = {
    apiKey: "AIzaSyBEDzmVpp-24DBZLDxd23zSk_Jw8zX_rac",
    authDomain: "reservation-mate.firebaseapp.com",
    databaseURL: "https://reservation-mate-default-rtdb.firebaseio.com",
    projectId: "reservation-mate",
    storageBucket: "reservation-mate.appspot.com",
    messagingSenderId: "719958615188",
    appId: "1:719958615188:web:9a41ce51819fcaf6614081",
    measurementId: "G-HF4VV6PKW7"
  };
  
const app = initializeApp(firebaseConfig);

export const loginUser = async (id, password) => {
    try {
        const db = getDatabase();
        const userRef = ref(db, 'users/' + id);
        const snapshot = await get(userRef);

        return snapshot.exists() && snapshot.val().password === password;
    } catch (error) {
        console.error("Error logging in: ", error);
        throw error;
    }
};

export default firebase;