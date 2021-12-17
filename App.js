import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Appearance, SafeAreaView } from "react-native";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  Layout,
  Text,
  IconRegistry,
  Button,
  useTheme,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import Item from "./components/Item";
import Categories from "./components/Categories";

export default function App() {
  const [systemTheme, setSystemTheme] = useState(eva.light);
  const theme = useTheme();

  useEffect(() => {
    const theme = Appearance.getColorScheme();
    setSystemTheme(theme === "dark" ? eva.dark : eva.light);
    return () => {};
  }, []);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={systemTheme}>
        <Layout style={styles.container}>
          <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <Text category="h3" style={{ margin: 10 }}>
              Gin Delivery 2{" "}
            </Text>
            <Layout
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <Categories />
              <Item />
            </Layout>
          </SafeAreaView>
        </Layout>
      </ApplicationProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: StatusBar.currentHeight || 0,
  },
});
