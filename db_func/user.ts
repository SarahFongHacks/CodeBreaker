import {User} from "../types/types"
import {db} from "../pages/index"
import {dbConverter} from "../db_conversion/db_converter"
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore"; 

export async function updateUser(user : User) {

  const docRef = doc(db, 'User', user.id)

  await updateDoc(docRef, await dbConverter.userToJson(user)) 
}

export async function getUser(userId : string) : Promise<User> {

  return await dbConverter.jsonToUser(await getDoc(doc(db, 'User', userId)), doc(db, 'User', userId))
}
