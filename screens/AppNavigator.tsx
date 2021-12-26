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
import SubscriptionScreen from "./SubscriptionScreen";
import PaymentStripe from "../components/PaymentStripe";
import Success from "../components/Success";
import PhonePeModal from "../components/PhonePeModal";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";

/* This provides native OS specific navigation. */
const Stack = createNativeStackNavigator();

//const Stack = createStackNavigator();
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
    <Tab.Screen name="Subscription" component={PhonePeModal} />
  </Tab.Navigator>
);

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Order"
          component={CartScreen}
          options={
            Platform.OS === "ios"
              ? {
                  headerBackVisible: true,
                  title: "",
                }
              : { headerBackVisible: true }
          }
        />
        <Stack.Screen
          name="Address"
          component={AddressModal}
          options={
            Platform.OS === "ios"
              ? { headerLargeTitle: true, headerBackVisible: false }
              : { headerBackVisible: true }
          }
        />
        <Stack.Screen
          name="Payment"
          component={PaymentStripe}
          options={
            Platform.OS === "ios"
              ? { headerLargeTitle: true, headerBackVisible: false }
              : { headerBackVisible: true }
          }
        />
        <Stack.Screen
          name="Success"
          component={Success}
          options={
            Platform.OS === "ios"
              ? { headerLargeTitle: true, headerBackVisible: false }
              : { headerBackVisible: false }
          }
        />
        <Stack.Screen
          name="Phonepe"
          component={PhonePeModal}
          options={{
            headerStyle: {
              backgroundColor: COLORS.PURPLE,
            },
            headerTintColor: COLORS.WHITE,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
