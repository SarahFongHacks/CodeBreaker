import {User} from "../types/types"
import {db} from "../pages/index"
import {dbConverter} from "../db_conversion/db_converter"
import { doc, setDoc, updateDoc } from "firebase/firestore"; 

export async function updateUser(user : User) {

  const docRef = doc(db, 'User', user.id)

  await updateDoc(docRef, await dbConverter.userToJson(user)) 
}
