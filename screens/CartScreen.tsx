import { Layout, Button, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet, Alert, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import CartItems from "../components/CartItems";
import TimSchedule from "../components/TimSchedule";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

export default function CartScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { address } = useSelector(
    (state) => state.addressReducer.selectedAddress
  );
  //console.log(address);
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={true}>
        <CartItems navigation={navigation} />
        <Button
          style={{ marginHorizontal: 10 }}
          appearance={"outline"}
          onPress={() => navigation.navigate("Address")}
        >
          {address.name === "" ? "Add Address" : "Change Address"}
        </Button>
        {address.address1 !== "" ? (
          <Text style={{ textAlign: "center", paddingVertical: 10 }}>
            Choosen address is for {address.name} {`,${address.address1}`}
          </Text>
        ) : null}
        <TimSchedule />
      </ScrollView>
      <Button
        accessoryRight={() => (
          <MaterialIcons name="payment" size={20} color="white" />
        )}
        onPress={() => navigation.navigate("Payment")}
        style={styles.button}
        size={"medium"}
      >
        MAKE PAYMENT
      </Button>
    </>
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
    bottom: 20,
    width: Dimensions.get("screen").width * 0.95,
    margin: 10,
  },
});
