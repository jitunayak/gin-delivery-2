import { mapping } from "@eva-design/eva";
import { Button, Layout, Text } from "@ui-kitten/components";
import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { API, COLORS, SYMBOLS } from "../utilities/Constants";
import Constants from "expo-constants";

export default function OrdersScreen() {
  const fetchRecentOrders = async () => {
    const orders = await fetch(
      `${API.BASE_URL}/order/customer/61ccb12a2c4515c1b403363c`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: API.JWT_TOKEN,
        },
      }
    );
    const jsonOrders = await orders.json();
    setOrders(jsonOrders.reverse());
  };
  const [orders, setOrders] = useState([]);

  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {orders.length === 0 ? <Text>No Orders </Text> : null}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          width: Dimensions.get("window").width,
          marginTop: Constants.statusBarHeight,
          marginRight: 10,
        }}
      >
        {orders.map((order, index) => {
          return (
            <Layout
              key={order._id}
              style={{
                width: Dimensions.get("screen").width,
                padding: 10,
                margin: 6,
                borderBottomColor: COLORS.GREY,
                borderBottomWidth: 1,
              }}
            >
              <Text
                category={"c2"}
                style={{
                  backgroundColor: order.Delivered
                    ? COLORS.LIGHT_GREY
                    : COLORS.PRIMARY,
                  padding: 10,
                }}
              >
                {order.Delivered
                  ? `Delivered on ${new Date(
                      order.updatedAt
                    ).toLocaleDateString()} , ${new Date(
                      order.updatedAt
                    ).toLocaleTimeString()}`
                  : `Order placed on  ${new Date(
                      order.createdAt
                    ).toDateString()}`}
              </Text>

              <Text category={"c2"} style={{ paddingVertical: 10 }}>
                Total Bill : {SYMBOLS.INR} {order.cart.totalCost}
              </Text>
              <Text category={"c2"}>
                Total No of Items :{order.cart.totalQty}
              </Text>
              <Layout
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                {order.cart.items.map((item, index) => {
                  return (
                    <Text category={"c1"} key={index}>
                      {item.name} x {item.quantity}
                    </Text>
                  );
                })}
              </Layout>
            </Layout>
          );
        })}
      </ScrollView>
      <Button appearance={"ghost"} onPress={() => fetchRecentOrders()}>
        Show Orders
      </Button>
    </Layout>
  );
}
