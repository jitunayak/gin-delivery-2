import { Layout, Text } from '@ui-kitten/components';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function MultiSelectTab() {
	const [tabs, setTabs] = React.useState(['All', 'Pending', 'Completed']);
	const [selectedTab, setSelectedTab] = React.useState(0);
	return (
		<Layout
			level={'3'}
			style={{
				flexDirection: 'row',
				padding: 4,
				borderRadius: 10,
				marginHorizontal: 40,
			}}
		>
			{tabs.map((tab, index) => {
				return (
					<TouchableOpacity
						key={index}
						onPress={() => {
							setSelectedTab(index),
								Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
						}}
						style={{
							flex: 1,
						}}
					>
						<Layout
							level={selectedTab !== index ? '3' : '1'}
							style={[
								selectedTab === index ? styles.shadow : null,
								{
									padding: 10,
								},
							]}
						>
							<Text category={'p1'} style={{ textAlign: 'center' }}>
								{tab}
							</Text>
						</Layout>
					</TouchableOpacity>
				);
			})}
		</Layout>
	);
}

const styles = StyleSheet.create({
	shadow: {
		shadowRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: -4, height: 0 },
		shadowOpacity: 0.2,
		borderRadius: 6,
	},
});
