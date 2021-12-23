import {
  Input,
  Layout,
  Icon,
  Button,
  Text,
  CheckBox,
} from "@ui-kitten/components";
import React, { useState } from "react";
import { View, Alert, StyleSheet, Pressable, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../utilities/Constants";

export default function AddressModal() {
  const [checked, setChecked] = React.useState(true);
  const dispatch = useDispatch();
  const { address } = useSelector(
    (state) => state.addressReducer.selectedAddress
  );
  console.log({ store: address });

  const [newAddress, setnewAddress] = useState({
    name: address.name || "",
    phone: address.phone || "",
    address1: address.address1 || "",
    address2: address.address2 || "",
    pincode: address.pincode || "",
  });
  const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

  function updatenewAddress() {
    //console.log({ "New Address": newAddress });
    dispatch({ type: "ADD_ADDRESS", payload: newAddress });
  }

  const renderCaption = () => {
    return <Text status={"danger"}>Should contain at least 8 symbols</Text>;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
      <Layout style={{ padding: 20, flexDirection: "column" }}>
        <Text category={"h4"} style={{ marginVertical: 10 }}>
          Add Address
        </Text>
        <Input
          value={newAddress.name}
          label="Name"
          placeholder="Jitu Nayak"
          textContentType="name"
          //   caption={renderCaption}
          onChangeText={(nextValue) =>
            setnewAddress({ ...newAddress, name: nextValue })
          }
          style={{ marginVertical: 10 }}
        />
        <Input
          value={newAddress.phone}
          label="Phone Number"
          placeholder="000-000-0000"
          textContentType="telephoneNumber"
          //   caption={renderCaption}
          onChangeText={(nextValue) =>
            setnewAddress({ ...newAddress, phone: nextValue })
          }
          style={{ marginVertical: 10 }}
        />
        <Input
          value={newAddress.address1}
          label="House No, Street, Locality"
          placeholder="1/2, Times Square, Locality"
          //   caption={renderCaption}
          onChangeText={(nextValue) =>
            setnewAddress({ ...newAddress, address1: nextValue })
          }
          style={{ marginVertical: 10 }}
        />
        <Input
          value={newAddress.address2}
          label="Area / City"
          placeholder="Bapuji Nagar"
          textContentType="addressCityAndState"
          //   caption={renderCaption}
          onChangeText={(nextValue) =>
            setnewAddress({ ...newAddress, address2: nextValue })
          }
          style={{ marginVertical: 10 }}
        />
        <Input
          value={newAddress.pincode}
          label="PINCODE"
          placeholder="750021"
          textContentType="postalCode"
          //   caption={renderCaption}
          onChangeText={(nextValue) =>
            setnewAddress({ ...newAddress, pincode: nextValue })
          }
          style={{ marginVertical: 10 }}
        />

        <Layout style={{ flexDirection: "row" }}>
          <CheckBox
            status={"primary"}
            checked={checked}
            onChange={(nextChecked) => setChecked(nextChecked)}
          />
          <Text category={"c1"} style={{ padding: 10 }}>
            Above information would be stored and processed for providing better
            user experience
          </Text>
        </Layout>

        <Button
          onPress={() => updatenewAddress()}
          status={"primary"}
          appearance={"filled"}
        >
          Deliver here
        </Button>
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
