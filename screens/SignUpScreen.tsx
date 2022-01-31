import { useNavigation } from '@react-navigation/native';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { loadConstacts, loadFromLocalStorage } from '../utilities/Constants';
import { LoginHelper } from '../utilities/LoginHelper';

export default function SignUpScreen() {
	const [username, setUsername] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const loginHelper = new LoginHelper();
	const navigation = useNavigation();
	const signUpUser = async () => {
		try {
			setIsLoading(true);
			await loginHelper.SignUpUser(username, email, password);
			const token = await loginHelper.VerifyLogin(email, password);
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
		} catch (err) {
			Alert.alert(err);
		}
	};
	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<Text category={'h3'} style={{ paddingVertical: 10 }}>
				Register yourself
			</Text>
			<Input
				label="Username"
				placeholder="john"
				value={username}
				onChangeText={(e) => setUsername(e)}
				style={{ paddingVertical: 10 }}
				disabled={isLoading}
			/>
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
			<Button
				onPress={async () => signUpUser()}
				disabled={isLoading}
				style={{ marginVertical: 10 }}
			>
				SIGN UP
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
