import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { Layout, Text, Icon, Divider } from "@ui-kitten/components";
import HomeScreen from "./HomeScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CartScreen from "./CartScreen";
import OrdersScreen from "./OrdersScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const PersonIcon = (props) => <Icon {...props} name="person-outline" />;

const BellIcon = (props) => <Icon {...props} name="bell-outline" />;

const EmailIcon = (props) => <Icon {...props} name="email-outline" />;

const UsersScreen = () => (
  <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text category="h1">SUBSCRIPTION</Text>
  </Layout>
);

const BottomTabBar = ({ navigation, state }) => (
  <>
    <SafeAreaView edges={["bottom"]}>
      <BottomNavigation
        selectedIndex={state.index}
        onSelect={(index) => navigation.navigate(state.routeNames[index])}
      >
        <BottomNavigationTab title="USERS" icon={PersonIcon} />
        <BottomNavigationTab title="ORDERS" icon={BellIcon} />
        <BottomNavigationTab title="SUBSCRIPTION" icon={EmailIcon} />
      </BottomNavigation>
    </SafeAreaView>
  </>
);

const TabNavigator = ({ navigation }) => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Tab.Screen name="Gin Delivery 2" component={HomeScreen} />
    <Tab.Screen name="Orders" component={OrdersScreen} />
    <Tab.Screen name="Subscription" component={UsersScreen} />
  </Tab.Navigator>
);

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="Order" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
