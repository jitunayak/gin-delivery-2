import React, { useState } from "react";
import { View, StyleSheet, Alert, TextInput } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Button, Text } from "@ui-kitten/components";
//ADD localhost address of your server
const API_URL = "http://192.168.0.107:3000";

const PaymentStripe = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [cardDetails, setCardDetails] = useState("");
  const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete || !email) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }
    const billingDetails = {
      email: email,
    };
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          alert("Payment Successful");
          console.log("Payment successful ", paymentIntent);
          navigation.navigate("Success");
        }
      }
    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with the card details
  };

  return (
    <StripeProvider publishableKey="pk_test_51J5aVYSBhy92HuL3Qwn9pVoRyOuWzayePWJAPBT5Rs00wYdy1c6Z5N1nEFqAK36zMm40U9TA7pb4DxU0dHM9uOcn00UmL2PnhB">
      <View style={styles.container}>
        <Text category={"h4"} style={{ alignSelf: "center", padding: 10 }}>
          Make your secure payment
        </Text>
        <TextInput
          autoCapitalize="none"
          placeholder="E-mail"
          keyboardType="email-address"
          onChange={(value) => setEmail(value.nativeEvent.text)}
          style={styles.input}
        />
        <CardField
          postalCodeEnabled={true}
          placeholder={{
            number: "4242 4242 4242 4242",
          }}
          cardStyle={styles.card}
          style={styles.cardContainer}
          onCardChange={(cardDetails) => {
            setCardDetails(cardDetails);
          }}
        />
        <Button onPress={handlePayPress} disabled={loading}>
          Pay
        </Button>
      </View>
    </StripeProvider>
  );
};
export default PaymentStripe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "#efefefef",

    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});
