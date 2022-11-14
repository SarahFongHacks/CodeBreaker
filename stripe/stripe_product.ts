import { httpsCallable } from "firebase/functions";
import { functions } from "../pages/";
import { HotelRoom } from "../types/types";

export function createProduct(
  hotelRoom: HotelRoom,
  startDate: Date,
  endDate: Date,
	price : number,
) {
  const product_create_function = httpsCallable(functions, "helloWorld");

  const startDateString =
    startDate.getMonth() +
    "/" +
    startDate.getDate() +
    "/" +
    startDate.getFullYear();

  const endDateString =
    endDate.getMonth() + "/" + endDate.getDate() + "/" + endDate.getFullYear();

  const name = hotelRoom.hotel + " " + startDateString + "-" + endDateString;

  product_create_function({
    productName: name,
    startDate: startDate,
    endDate: endDate,
    price: price,
    images: hotelRoom.image,
  }).then((result) => {
    console.log(result);
  });
}
