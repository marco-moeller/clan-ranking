// Your web app's Firebase configuration
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.envNEXT_PUBLICP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.RNEXT_PUBLICFIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export default getDatabase(app);
