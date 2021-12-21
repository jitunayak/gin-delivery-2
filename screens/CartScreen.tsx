import { Layout, Button } from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet, Alert } from "react-native";
import AddressModal from "../components/AddressModal";

import CartItems from "../components/CartItems";
import TimSchedule from "../components/TimSchedule";
import { COLORS, SYMBOLS } from "../utilities/Constants";

export default function CartScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Layout style={styles.container}>
      <CartItems navigation={navigation} />
      <Button
        onPress={() => navigation.navigate("Address")}
        style={styles.button}
        size={"large"}
      >
        PLACE ORDER
      </Button>
      <TimSchedule />
    </Layout>
  );
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
