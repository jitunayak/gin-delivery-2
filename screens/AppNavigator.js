import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Text,
  Icon,
} from "@ui-kitten/components";
import HomeScreen from "./HomeScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const { Navigator, Screen } = createBottomTabNavigator();

const PersonIcon = (props) => <Icon {...props} name="person-outline" />;

const BellIcon = (props) => <Icon {...props} name="bell-outline" />;

const EmailIcon = (props) => <Icon {...props} name="email-outline" />;

const UsersScreen = () => (
  <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text category="h1">SUBSCRIPTION</Text>
  </Layout>
);

const OrdersScreen = () => (
  <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text category="h1">ORDERS</Text>
  </Layout>
);

const BottomTabBar = ({ navigation, state }) => (
  <SafeAreaView>
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab title="USERS" icon={PersonIcon} />
      <BottomNavigationTab title="ORDERS" icon={BellIcon} />
      <BottomNavigationTab title="SUBSCRIPTION" icon={EmailIcon} />
    </BottomNavigation>
  </SafeAreaView>
);

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Gin Delivery 2" component={HomeScreen} />
    <Screen name="Orders" component={OrdersScreen} />
    <Screen name="Subscription" component={UsersScreen} />
  </Navigator>
);

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
