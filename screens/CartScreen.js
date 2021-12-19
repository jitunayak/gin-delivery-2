import { Layout, Button } from "@ui-kitten/components";
import React, { Component } from "react";
import { StyleSheet, Alert } from "react-native";

import CartItems from "../components/CartItems";
import TimSchedule from "../components/TimSchedule";
import { COLORS, SYMBOLS } from "../utilities/Constants";

export default class CartScreen extends Component {
  render() {
    return (
      <Layout style={styles.container}>
        <CartItems />
        <Button
          onPress={() => Alert.alert("Order Placed")}
          style={styles.button}
          size={"large"}
        >
          PLACE ORDER
        </Button>
        <TimSchedule />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  button: {
    backgroundColor: "black",
    borderColor: "black",
  },
});
