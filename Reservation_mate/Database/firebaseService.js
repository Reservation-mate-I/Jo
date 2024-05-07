import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';
import { getAuth, signInWithCredential, PhoneAuthProvider  } from 'firebase/auth';

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
  
const firebaseService = initializeApp(firebaseConfig);
const database = getDatabase(firebaseService);
const auth = getAuth(firebaseService);

export const sendVerificationCode = async (phone, setVerificationId, Alert) => {
  try {
    const provider = new PhoneAuthProvider(auth);
    const verificationId = await provider.verifyPhoneNumber(phone);
    setVerificationId(verificationId);
    Alert.alert('인증 코드가 전송되었습니다.');
  } catch (error) {
    Alert.alert('오류', error.message);
  }
};

export const verifyCode = async (verificationId, verificationCode, Alert) => {
  try {
    const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
    await signInWithCredential(auth, credential);
    Alert.alert('인증이 완료되었습니다.');
    // 여기서 추가적인 작업을 수행할 수 있습니다.
  } catch (error) {
    Alert.alert('오류', error.message);
  }
};

export const verify = async (verificationId, verificationCode, Alert) => {
  try {
    const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
    const userCredential = await signInWithCredential(auth, credential);
    const user = userCredential.user;
    Alert.alert('인증이 완료되었습니다.');
    return user;
  } catch (error) {
    Alert.alert('오류', error.message);
    throw error;
  }
};

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

export default firebaseService;