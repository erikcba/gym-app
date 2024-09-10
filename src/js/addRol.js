import { doc, setDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig'

const addRol = async (userId) => {
  await setDoc(doc(db, "users", userId), {
    role: "user" // o "admin"
  })
}

export default addRol()