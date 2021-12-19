import { Button, Divider, Layout, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SYMBOLS } from "../utilities/Constants";

export default function CartScreen({ navigation }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cartReducer.selectedItems);

  useEffect(() => {
    console.log("order page opened");
    const totalPrice1 = items.reduce((total, item) => {
      total += item.price * item.quantity;
      return total;
    }, 0);
    setTotalPrice(totalPrice1);
    return () => {};
  }, [items]);

  return (
    <Layout style={{ padding: 10, margin: 10, flex: 1 }}>
      <Text category="h3" style={{ marginVertical: 10 }}>
        Orders
      </Text>
      {items != null || undefined ? (
        items.map((item, index) => {
          return (
            <Layout
              key={index}
              style={{
                margin: 6,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text> {item.name}</Text>
              <Layout style={{ flexDirection: "row" }}>
                <Text style={{ textAlign: "right" }}> ₹{item.price}</Text>
                <Text style={{ textAlign: "right" }}> x {item.quantity}</Text>
              </Layout>
            </Layout>
          );
        })
      ) : (
        <Text>Empty cart</Text>
      )}
      <Divider />
      <Layout>
        <Text category={"s1"} style={{ paddingVertical: 10, margin: 6 }}>
          Bill Details
        </Text>

        <Layout
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 6,
            marginHorizontal: 6,
          }}
        >
          <Text>Item Total</Text>
          <Text>
            {SYMBOLS.INR}
            {totalPrice}
          </Text>
        </Layout>

        <Layout
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 6,
            marginHorizontal: 6,
          }}
        >
          <Text style={{ color: "blue" }}>Delivery Fee</Text>
          <Text style={{ color: "green" }}>FREE</Text>
        </Layout>
        <Text category={"c1"} style={{ color: "gray", marginHorizontal: 6 }}>
          This fees goes towards paying your Delivery Partner fairly{" "}
        </Text>
        <Divider style={{ marginTop: 16 }} />
        <Layout
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
            marginHorizontal: 6,
          }}
        >
          <Text category="s1">To Pay</Text>
          <Text>
            {SYMBOLS.INR} {totalPrice}
          </Text>
        </Layout>
        <Button>Place Order</Button>
      </Layout>
    </Layout>
  );
}
