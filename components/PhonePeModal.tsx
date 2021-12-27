import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import { Button, Layout, Spinner } from "@ui-kitten/components";
import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { COLORS } from "../utilities/Constants";
import { MaterialIcons } from "@expo/vector-icons";

export default function PhonePeModal({ amount, navigation }) {
  const stripe = useStripe();

  const API_URL = "https://stripe-gin.herokuapp.com";
  const API_KEY = "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("jitunayak715@gmail.com");

  //console.log("amount", amount);
  const fetchPaymentIntentClientSecret: any = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: API_KEY,
      },
      body: JSON.stringify({
        amount: amount,
      }),
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const makeAPayment = async () => {
    setLoading(true);
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();

      if (error) {
        Alert.alert("Unable to process payment");
        setLoading(false);
      }
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        primaryButtonColor: COLORS.ACCENT,
        merchantDisplayName: "Gin Delivery",
        customerId: "jitu_id_12435",
        style: "automatic",
      });
      if (initSheet.error) {
        //console.error(initSheet.error);
        setLoading(false);
        return Alert.alert(initSheet.error.message);
      }
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret: clientSecret,
      });
      if (presentSheet.error) {
        //console.error(presentSheet.error);
        setLoading(false);
        return Alert.alert(presentSheet.error.message);
      }
      //navigation.navigate("Success");
      Alert.alert("Donated successfully! Thank you for the donation.");
    } catch (err) {
      //console.error(err);
      setLoading(false);
      Alert.alert("Payment failed!");
    }
  };
  return (
    <StripeProvider publishableKey="pk_test_51J5aVYSBhy92HuL3Qwn9pVoRyOuWzayePWJAPBT5Rs00wYdy1c6Z5N1nEFqAK36zMm40U9TA7pb4DxU0dHM9uOcn00UmL2PnhB">
      <Button
        accessoryRight={() => (
          <MaterialIcons name="payment" size={20} color="white" />
        )}
        accessoryLeft={() => {
          return loading ? <Spinner size="small" status={"success"} /> : null;
        }}
        style={{ backgroundColor: "black", borderColor: "black", flex: 1 }}
        size={"medium"}
        onPress={makeAPayment}
        disabled={loading}
      >
        MAKE PAYMENT
      </Button>
    </StripeProvider>
  );
}
