import { httpsCallable } from "firebase/functions";
import { functions } from "../pages/index";

export function create_product(productName : string) {
  const product_create_function = httpsCallable(functions, "helloWorld");

  product_create_function({ productName: productName}).then((result) => {
    console.log(result);
  });
}
