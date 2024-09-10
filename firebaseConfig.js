import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAXdOzR94McNBo9n_QOrDjUspk1zzDifqQ",
  authDomain: "trainer-app-6261b.firebaseapp.com",
  projectId: "trainer-app-6261b",
  storageBucket: "trainer-app-6261b.appspot.com",
  messagingSenderId: "1010832053599",
  appId: "1:1010832053599:web:3e49174abdf97b296d92ea"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)


export { auth, db }