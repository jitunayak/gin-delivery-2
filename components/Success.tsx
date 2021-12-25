import { Button, Layout, Text } from "@ui-kitten/components";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Success({ navigation }) {
  return (
    <Layout
      style={{
        justifyContent: "center",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Ionicons name="md-checkmark-done-circle" size={100} color="green" />
      <Text category={"h4"}>Payment has been successful</Text>
      <Text category={"c2"}>
        Please, don't close this page or press back button
      </Text>
      {/* <Text category={"c2"} status={"warning"}>
        Auto redirecting to home page
      </Text> */}
      <Button
        style={{ margin: 30 }}
        onPress={() => {
          navigation.navigate("HomeScreen");
        }}
      >
        Press me
      </Button>
    </Layout>
  );
}
