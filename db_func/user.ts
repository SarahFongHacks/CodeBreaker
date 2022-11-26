import {User} from "../types/types"
import {db} from "../pages/index"
import {dbConverter} from "../db_conversion/db_converter"
import { doc, updateDoc, getDoc } from "firebase/firestore"; 

export async function updateUser(user : User) {

  const docRef = doc(db, 'User', user.id)

  await updateDoc(docRef, await dbConverter.userToJson(user)) 
}

export async function getUser(userId : string) : Promise<User> {

  return await dbConverter.jsonToUser((await getDoc(doc(db, 'User', userId))).data(), doc(db, 'User', userId))
}

export async function updateRewardPoints(
  user : User,
  points: number
  ){
      /* person gets 1 point for every 10 dollars spent */
      const rewards = points / 10;
      const docRef = doc(db, 'User', user.id);
      await updateDoc(docRef, {rewardPoints: (await user).rewardPoints + rewards});
  }

