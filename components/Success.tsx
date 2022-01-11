import { Ionicons } from '@expo/vector-icons';
import { Button, Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { useDispatch } from 'react-redux';

export default function Success({ navigation }) {
	const dispatch = useDispatch();
	return (
		<Layout
			style={{
				justifyContent: 'center',
				flex: 1,
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Ionicons name="md-checkmark-done-circle" size={100} color="green" />
			<Text category={'h6'}>Payment has been successful</Text>
			<Text>Please, don't close this page or press back button</Text>
			{/* <Text category={"c2"} status={"warning"}>
        Auto redirecting to home page
      </Text> */}
			<Button
				style={{ margin: 30 }}
				onPress={() => {
					dispatch({
						type: 'EMPTY_CART',
						payload: null,
					});
					navigation.navigate('HomeScreen');
				}}
			>
				Press me
			</Button>
		</Layout>
	);
}
