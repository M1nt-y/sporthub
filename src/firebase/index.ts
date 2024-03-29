import {initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBMID6Mi8oXodmtpRmY_Tctm2VdoLHityE",
    authDomain: "sporthub-sl.firebaseapp.com",
    projectId: "sporthub-sl",
    storageBucket: "sporthub-sl.appspot.com",
    messagingSenderId: "779803041500",
    appId: "1:779803041500:web:cbf9cc53c00bf4132e1e19"
})
const db = getFirestore(firebaseApp);

export default firebaseApp
export  {db}