import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import PaymentStripe from "../components/PaymentStripe";

export default function SubscriptionScreen({ navigation }) {
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text category={"h1"}>SUBSCRIPTION</Text>
    </Layout>
  );
}
