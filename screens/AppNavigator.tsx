import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { Platform } from 'react-native';

import AddressModal from '../components/AddressModal';
import PaymentStripe from '../components/PaymentStripe';
import PhonePeModal from '../components/PhonePeModal';
import Success from '../components/Success';
import { COLORS } from '../utilities/Constants';
import CartScreen from './CartScreen';
import HomeScreen from './HomeScreen';
import OrdersScreen from './OrdersScreen';
import SubscriptionScreen from './SubscriptionScreen';

import {
	AnimatedTabBarNavigator,
	DotSize, // optional
	TabElementDisplayOptions, // optional
	TabButtonLayout, // optional
	IAppearanceOptions, // optional
} from 'react-native-animated-nav-tab-bar';

/* This provides native OS specific navigation. */
const Stack = createNativeStackNavigator();

//const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

const Tab = AnimatedTabBarNavigator();

const UsersScreen = () => (
	<Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
		<Text category="h1">SUBSCRIPTION</Text>
	</Layout>
);

const TabNavigator = ({ navigation }) => (
	<Tab.Navigator
		tabBarOptions={{
			activeTintColor: COLORS.BLACK,
			// inactiveTintColor: '#222222',
			// showLabel: true,
			// showIcon: true,
			// style: {
			// 	backgroundColor: '#2F7C6E',
			// 	height: 90,
			// 	borderTopWidth: 0,
			// 	borderTopColor: '#fff',
			// },
			tabStyle: {
				padding: 0,
				margin: 0,
				borderRadius: 30,
				backgroundColor: COLORS.LIGHT_GREY,
			},
			indicatorStyle: {
				backgroundColor: '#2F7C6E',
			},
		}}
		screenOptions={({ route }) => ({
			// tabBarInactiveTintColor: COLORS.GREY,
			// tabBarActiveTintColor: COLORS.ACCENT,
			headerShown: false,
			headerTitleStyle: { color: COLORS.ACCENT, fontSize: 20 },
			// activeTintColor: '#2F7C6E',
			// inactiveTintColor: '#222222',
			tabBarLabel: ({ focused, color }) => {
				return (
					<Text
						category={'c2'}
						style={{
							color: focused ? COLORS.BLACK : COLORS.BLACK,
							padding: 4,
						}}
					>
						{route.name}
					</Text>
				);
			},
			tabBarIcon: ({ focused, color, size }) => {
				let iconName;
				if (route.name === 'Home') {
					iconName = focused ? 'cart' : 'cart-outline';
				} else if (route.name === 'Subscription') {
					iconName = focused ? 'ios-wallet' : 'ios-wallet-outline';
				} else if (route.name === 'Orders') {
					iconName = focused ? 'list-circle' : 'list-circle-outline';
				}
				// You can return any component that you like here!
				return (
					<Ionicons
						name={iconName}
						size={26}
						color={focused ? COLORS.BLACK : COLORS.GREY}
					/>
				);
			},
		})}
	>
		<Tab.Screen name="Home" component={HomeScreen} />
		<Tab.Screen name="Orders" component={OrdersScreen} />
		<Tab.Screen name="Subscription" component={SubscriptionScreen} />
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
						Platform.OS === 'ios'
							? {
									headerBackVisible: true,
									title: '',
							  }
							: { headerBackVisible: true }
					}
				/>
				<Stack.Screen
					name="Address"
					component={AddressModal}
					options={
						Platform.OS === 'ios'
							? { headerBackVisible: false }
							: { headerBackVisible: false }
					}
				/>
				<Stack.Screen
					name="Payment"
					component={PaymentStripe}
					options={
						Platform.OS === 'ios'
							? { headerLargeTitle: true, headerBackVisible: false }
							: { headerBackVisible: true }
					}
				/>
				<Stack.Screen
					name="Success"
					component={Success}
					options={
						Platform.OS === 'ios'
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
