import { Ionicons } from '@expo/vector-icons';
import { Button, Layout, Spinner, Text } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';

export default function Success({ navigation }) {
	const dispatch = useDispatch();

	setTimeout(() => {
		dispatch({
			type: 'EMPTY_CART',
			payload: null,
		});
		navigation.navigate('HomeScreen');
	}, 3000);

	return (
		<Layout
			style={{
				justifyContent: 'center',
				flex: 1,
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Image
				source={require('../assets/pngs/credit_card.png')}
				style={{ width: 200, height: 200 }}
			/>
			<Spinner size={'giant'} />
			{/* <Ionicons name="md-checkmark-done-circle" size={100} color="green" /> */}
			<Text category={'h6'}>Payment has been successful</Text>
			<Text>Please, don't close this page or press back button</Text>
			{/* <Text category={"c2"} status={"warning"}>
        Auto redirecting to home page
      </Text> */}
			<Button
				style={{ margin: 30 }}
				status={'success'}
				onPress={() => {
					dispatch({
						type: 'EMPTY_CART',
						payload: null,
					});
					navigation.navigate('Orders');
				}}
			>
				Wait Auto Redirection or Press me
			</Button>
		</Layout>
	);
}
