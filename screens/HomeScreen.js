import { Layout, Text } from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import React from "react";
import Categories from "../components/Categories";
import Item from "../components/Item";
import { COLORS, SYMBOLS } from "../utilities/Constants";
import { StyleSheet } from "react-native";
export default function HomeScreen({ navigation }) {
  return (
    <>
      <Layout style={styles.container}>
        <Text category={"h2"} style={{ color: COLORS.ACCENT }}>
          {SYMBOLS.APP_NAME}
        </Text>
        <Text category={"p2"} style={{ color: COLORS.ACCENT }}>
          {SYMBOLS.POWERED_BY_GIN}
        </Text>
      </Layout>
      <Layout style={styles.subcontainer}>
        <Categories />
        <Item navigation={navigation} />
      </Layout>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: StatusBar.currentHeight || 50,
    backgroundColor: COLORS.WHITE,
    paddingBottom: 10,
  },
  subcontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
