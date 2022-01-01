import { Divider, Layout, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { COLORS, SYMBOLS } from "../utilities/Constants";

export default function CartItems({ navigation, totalPrice, setTotalPrice }) {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cartReducer.selectedItems);
  // items.size === 0 ? setIsCartEmpty(true) : setIsCartEmpty(false);

  const calculateTotalPrice = () => {
    items.reduce((total, item) => {
      total += item.price * item.quantity;
      return total;
    }, 0);
  };

  useEffect(() => {
    setTotalPrice(
      items.reduce((total, item) => {
        total += item.price * item.quantity;
        return total;
      }, 0)
    );
    return () => {};
  }, [items]);

  return (
    <Layout style={{ padding: 20 }}>
      {/* <Text category="h3" style={{ marginVertical: 16 }}>
        In cart
      </Text> */}
      <Text category="h5" style={{ paddingVertical: 10 }}>
        To Pay {SYMBOLS.INR}
        {totalPrice}
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
              <Text>
                {item.name} ({item.weight})
              </Text>
              <Layout style={{ flexDirection: "row" }}>
                <Text style={{ textAlign: "right" }}> ₹{item.price}</Text>
                <Text style={{ textAlign: "right" }}> x {item.quantity}</Text>
              </Layout>
            </Layout>
          );
        })
      ) : (
        <Text category={"h1"}>Empty cart</Text>
      )}
      <Divider />
      <Layout>
        <Text category={"s1"} style={{ paddingVertical: 10, margin: 6 }}>
          Bill Details
        </Text>

        <Layout style={styles.rowcartitem}>
          <Text>Item Total</Text>
          <Text>
            {SYMBOLS.INR}
            {totalPrice}
          </Text>
        </Layout>

        <Layout style={styles.rowcartitem}>
          <Text style={{ color: COLORS.DARK_BLUE }}>Delivery Fee</Text>
          <Text style={{ color: "green" }}>FREE</Text>
        </Layout>
        <Text category={"c1"} style={{ color: "gray", marginHorizontal: 6 }}>
          This fees goes towards paying your Delivery Partner fairly{" "}
        </Text>
        <Divider style={{ marginTop: 16 }} />
        <Layout style={styles.rowcartitem}>
          <Text category="s1">Total Bill</Text>
          <Text category={"s1"}>
            {SYMBOLS.INR} {totalPrice}
          </Text>
        </Layout>
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  rowcartitem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
    marginHorizontal: 6,
  },
});
