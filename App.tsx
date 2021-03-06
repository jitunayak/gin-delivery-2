import * as eva from '@eva-design/eva';
import {
	ApplicationProvider,
	IconRegistry,
	useTheme,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Appearance, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import Toast from 'react-native-toast-message';

import configureStore from './redux/store';
import AppNavigator from './screens/AppNavigator';
import { COLORS } from './utilities/Constants';
import { default as customtheme } from './custom-theme2.json'; // <-- Import app theme

const store: any = configureStore();
export default function App() {
	const [systemTheme, setSystemTheme] = useState(eva.light);
	const theme = useTheme();

	useEffect(() => {
		const theme = Appearance.getColorScheme();
		setSystemTheme(theme === 'dark' ? eva.dark : eva.light);
		return () => {};
	}, []);

	return (
		<>
			<IconRegistry icons={EvaIconsPack} />
			<SafeAreaProvider>
				<ApplicationProvider {...eva} theme={{ ...eva.light, ...customtheme }}>
					<ReduxProvider store={store}>
						<StatusBar style="dark" />
						<AppNavigator />
						<Toast />
					</ReduxProvider>
				</ApplicationProvider>
			</SafeAreaProvider>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		// backgroundColor: COLORS.WHITE,
	},
});
