import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import CartScreen from "./CartScreen";
import HomeScreen from "./HomeScreen";
import OrdersScreen from "./OrdersScreen";
import { SYMBOLS, COLORS } from "../utilities/Constants";
import AddressModal from "../components/AddressModal";

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
      // tabBarInactiveTintColor: "rgba(255, 255, 255, 0.5)",
      // tabBarActiveTintColor: "#fff",
      headerShown: false,
      headerTitleStyle: { color: COLORS.ACCENT, fontSize: 20 },
      tabBarLabel: ({ focused, color }) => {
        return (
          <Text
            category={"c1"}
            style={{
              color: focused ? COLORS.ACCENT : COLORS.GREY,
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
          iconName = focused ? "cart" : "cart-outline";
        } else if (route.name === "Subscription") {
          iconName = focused ? "ios-wallet" : "ios-wallet-outline";
        } else if (route.name === "Orders") {
          iconName = focused ? "list-circle" : "list-circle-outline";
        }
        // You can return any component that you like here!
        return (
          <Ionicons
            name={iconName}
            size={26}
            color={focused ? COLORS.ACCENT : COLORS.GREY}
          />
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
        initialRouteName="HomeScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="HomeScreen" component={TabNavigator} />
        <Stack.Screen name="Order" component={CartScreen} />
        <Stack.Screen name="Address" component={AddressModal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
