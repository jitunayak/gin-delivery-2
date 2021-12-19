import { Layout, Text } from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import React from "react";
import Categories from "../components/Categories";
import Item from "../components/Item";
import { COLORS } from "../utilities/Constants";

export default function HomeScreen({ navigation }) {
  return (
    <>
      <Layout
        style={{
          padding: 10,
          paddingTop: StatusBar.currentHeight || 50,
          backgroundColor: COLORS.WHITE,
          paddingBottom: 10,
        }}
      >
        <Text category={"h2"} style={{ color: COLORS.ACCENT }}>
          Ginmart
        </Text>
        <Text category={"p2"} style={{ color: COLORS.ACCENT }}>
          POWERED BY GIN
        </Text>
      </Layout>
      <Layout
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <Categories />
        <Item navigation={navigation} />
      </Layout>
    </>
  );
}
