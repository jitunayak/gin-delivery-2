import { Layout } from "@ui-kitten/components";
import React from "react";
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
