// import { useSelector } from "react-redux";
import { API } from "./Constants";

export default async function OrderToBePlace(amount) {
  //   const { items } = useSelector((state) => state.cartReducer.selectedItems);

  const order = {
    user: "61ccb12a2c4515c1b403363c",
    cart: {
      totalQty: 1,
      totalCost: amount,
      items: [
        {
          productId: "61ccb12a2c4515c1b403363c",
          qty: 2,
          price: 53,
          title: "Nandini Milk",
          productCode: "MILK_CAT",
        },
      ],
    },
    address: {
      name: "Jitu Nayak",
      phoneNumber: "7377056991",
      address1: "989/B ",
      address2: "bangalore",
      pin: "754004",
      geoLocation: "45.67, 23.56",
    },
    paymentId: "pi_3KD1QbSBhy92HuL30K0qHfAA_secret_D58Vl2cGdokESHcLbv2GMv9sO",
    Delivered: false,
  };

  const response = await fetch(`${API.BASE_URL}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: API.JWT_TOKEN,
    },
    body: JSON.stringify({
      order,
    }),
  });
  const { data, error } = await response.json();
  if (error) return "Server rejected your order";
  return "Order Placed";
}
