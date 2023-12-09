// Your web app's Firebase configuration
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDg6_5uVrT4rkS3HXQDxc3zgx9ynC3CIbk",
  authDomain: "clan-ranking.firebaseapp.com",
  projectId: "clan-ranking",
  storageBucket: "clan-ranking.appspot.com",
  messagingSenderId: "1039526407507",
  appId: "1:1039526407507:web:024664eceeb33253cb45a6",
};

const app = initializeApp(firebaseConfig);
export default getDatabase(app);
