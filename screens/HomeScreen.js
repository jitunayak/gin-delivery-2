import { Layout } from "@ui-kitten/components";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Categories from "../components/Categories";
import Item from "../components/Item";

export default function HomeScreen({ navigation }) {
  return (
    <Layout
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "wheat",
      }}
    >
      <Categories />
      <Item navigation={navigation} />
    </Layout>
  );
}
