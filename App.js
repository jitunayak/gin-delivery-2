import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Appearance } from "react-native";
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
import AppNavigator from "./screens/AppNavigator";
import HomeScreen from "./screens/HomeScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import configureStore from "./redux/store";
import { Provider as ReduxProvider } from "react-redux";

const store = configureStore();

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
      <SafeAreaProvider>
        <ApplicationProvider {...eva} theme={eva.light}>
          <ReduxProvider store={store}>
            <AppNavigator />
          </ReduxProvider>
        </ApplicationProvider>
      </SafeAreaProvider>
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
