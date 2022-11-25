import {HotelRoom, Reservation, User} from "../types/types"
import {db} from "../pages/index"
import {dbConverter} from "../db_conversion/db_converter"
import { doc, setDoc, updateDoc, getDoc, query, collection, where } from "firebase/firestore"; 
import { analytics } from "firebase-functions/v1";

export async function updateUser(user : User) {

  const docRef = doc(db, 'User', user.id)

  await updateDoc(docRef, await dbConverter.userToJson(user)) 
}

export async function getUser(userId : string) : Promise<User> {

  return await dbConverter.jsonToUser(await getDoc(doc(db, 'User', userId)), doc(db, 'User', userId))
}

export async function updateRewardPoints(
  userID : string,
  points: number
  ){
      //1 point for every 10 dollars spent
      const rewards = points / 10;
      const user = await getUser(userID);
      const docRef = doc(db, 'User', userID);
      await updateDoc(docRef, {rewardPoints: (await user).rewardPoints + rewards});
  }

