import React, { useEffect, useState } from 'react';
import { Button, Input, Layout, Spinner, Text } from '@ui-kitten/components';
import { Alert, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { LoginHelper } from '../utilities/LoginHelper';
import { useNavigation } from '@react-navigation/native';
import { loadConstacts } from '../utilities/Constants';
import { getAsyncStorageData } from '../utilities/LocalStorage';

export default function LoginScreen() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const loginHelper = new LoginHelper();

	const navigation = useNavigation();

	const verifyLogin = async () => {
		setIsLoading(true);
		setIsLoggedIn(false);
		console.log({ email, password });
		const token = await loginHelper.VerifyLogin(email, password);
		// ! store login token locally
		if (token !== null) {
			setIsLoggedIn(true);
			loadConstacts().then(() => {
				navigation.reset({
					index: 0,
					routes: [{ name: 'HomeScreen' }],
				});
			});
			return;
		}
		setIsLoading(false);
		Alert.alert('Failed');
	};

	//if (isLoading) return <Spinner />;

	useEffect(() => {
		async function checkUserLogin() {
			try {
				const result = await getAsyncStorageData('USER');
				const { id, token } = JSON.parse(result);

				if (id !== null && token !== null) {
					console.log('user already logged in');
					navigation.reset({
						index: 0,
						routes: [{ name: 'HomeScreen' }],
					});
				}
			} catch (e) {
				console.log('user not logged in');
			}
		}

		checkUserLogin();
	}, []);

	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<Text category={'h1'} style={{ paddingVertical: 30 }}>
				Welcome to Gin
			</Text>
			<Input
				label="Email Address"
				placeholder="john@gmail.com"
				keyboardType="email-address"
				value={email}
				onChangeText={(e) => setEmail(e)}
				style={{ paddingVertical: 10 }}
				disabled={isLoading}
			/>
			<Input
				label="Password"
				placeholder="strong password"
				secureTextEntry={true}
				value={password}
				onChangeText={(e) => setPassword(e)}
				style={{ paddingVertical: 10 }}
				disabled={isLoading}
			/>

			{isLoading ? (
				<Layout style={{ alignSelf: 'center', padding: 10 }}>
					<Spinner />
				</Layout>
			) : null}
			<Button disabled={isLoading} onPress={() => verifyLogin()}>
				Login
			</Button>
			<Button
				disabled={isLoading}
				appearance={'ghost'}
				onPress={() => navigation.navigate('SignUpScreen')}
			>
				New User
			</Button>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 40,
	},
});
