import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Layout, Text } from "@ui-kitten/components";
import React from "react";

import CartScreen from "./CartScreen";
import HomeScreen from "./HomeScreen";
import OrdersScreen from "./OrdersScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const UsersScreen = () => (
  <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text category="h1">SUBSCRIPTION</Text>
  </Layout>
);

const TabNavigator = ({ navigation }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarLabel: ({ focused, color }) => {
        return (
          <Text
            style={{
              color,
              fontSize: 12,
              paddingBottom: 4,
            }}
          >
            {route.name}
          </Text>
        );
      },
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === "Home") {
          iconName = focused ? "ios-home" : "ios-home-outline";
        } else if (route.name === "Subscription") {
          iconName = focused ? "ios-wallet" : "ios-wallet-outline";
        } else if (route.name === "Orders") {
          iconName = focused ? "list-circle" : "list-circle-outline";
        }
        // You can return any component that you like here!
        return (
          <Layout style={{ padding: 0 }}>
            <Ionicons name={iconName} size={26} color={color} />
          </Layout>
        );
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Orders" component={OrdersScreen} />
    <Tab.Screen name="Subscription" component={UsersScreen} />
  </Tab.Navigator>
);

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeStack"
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen name="HomeStack" component={TabNavigator} />
        <Stack.Screen name="Order" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
