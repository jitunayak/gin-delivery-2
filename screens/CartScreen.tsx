import { Layout, Button } from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet, Alert, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AddressModal from "../components/AddressModal";

import CartItems from "../components/CartItems";
import TimSchedule from "../components/TimSchedule";
import { COLORS, SYMBOLS } from "../utilities/Constants";
import { MaterialIcons } from "@expo/vector-icons";

export default function CartScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      shouldCancelWhenOutside={false}
    >
      <CartItems navigation={navigation} />

      <TimSchedule />

      <Button
        accessoryRight={() => (
          <MaterialIcons name="payment" size={24} color="white" />
        )}
        onPress={() => navigation.navigate("Payment")}
        style={styles.button}
        size={"large"}
      >
        MAKE PAYMENT
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    flex: 1,
  },

  button: {
    backgroundColor: "black",
    borderColor: "black",
    position: "absolute",
    bottom: 1,
    width: Dimensions.get("screen").width * 0.95,
    margin: 10,
  },
});
