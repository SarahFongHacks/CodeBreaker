import { httpsCallable } from "firebase/functions";
import { functions } from "../pages/";
import { HotelRoom } from "../types/types";

export async function createProduct(
  hotelRoom: HotelRoom,
  startDate: Date,
  endDate: Date,
  price: number
) {
  const product_create_function = httpsCallable(functions, "helloWorld");

  const startDateString =
    (startDate.getMonth()+1) +
    "/" +
    startDate.getDate() +
    "/" +
    startDate.getFullYear();

  const endDateString =
    (endDate.getMonth() + 1) + "/" + endDate.getDate() + "/" + endDate.getFullYear();

  const name = hotelRoom.hotel + " " + startDateString + "-" + endDateString;

  const data = await product_create_function({
    productName: name,
    startDate: startDate,
    endDate: endDate,
    price: price,
    images: hotelRoom.image,
  });

  return data;
}
