
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDErZzvwsmBlXcQZ0D7a7ruINM9QlPgjKs",
  authDomain: "community-website-460bf.firebaseapp.com",
  projectId: "community-website-460bf",
  storageBucket: "community-website-460bf.firebasestorage.app",
  messagingSenderId: "292410889643",
  appId: "1:292410889643:web:39f96d5053675196802eee",
  measurementId: "G-YL3VPZX33W"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
