import { Layout, Text, useTheme } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../utilities/Constants';

const Categories = ({ setSelectedCategory }) => {
	const theme = useTheme();
	//setCategories("Vegetables");
	// console.log(props);
	const [categories, setCategories] = useState([
		{
			id: '189sdjnsdp',
			name: 'vegetables',
			category: 'Vegetables',
			image: 'https://cdn-icons-png.flaticon.com/512/2329/2329865.png',
		},
		{
			id: '189sdjnsd',
			name: 'Dairy',
			category: 'Milk',
			image: 'https://cdn-icons-png.flaticon.com/512/3500/3500270.png',
		},
		{
			id: '189sdjnsd1',
			name: 'Breakfast',
			category: 'Breakfast',
			image: 'https://cdn-icons-png.flaticon.com/512/3480/3480823.png',
		},
		{
			id: '189sdjnsdp1',
			name: 'Snacks',
			category: 'Snacks',
			image: 'https://cdn-icons-png.flaticon.com/512/3014/3014403.png',
		},
	]);

	const [currentCategory, setCurrentCategory] = useState(categories[0].id);

	const Item = ({ category }) => (
		<TouchableOpacity
			onPress={() => {
				setCurrentCategory(category.id);
				setSelectedCategory(category.category);
			}}
			style={{
				alignItems: 'center',
				backgroundColor:
					currentCategory === category.id ? COLORS.ACCENT_LIGHT : '',
				width: '100%',
				marginVertical: 10,
				marginHorizontal: 0,
				borderRadius: 4,
				justifyContent: 'center',
				padding: 6,
				elevation: currentCategory === category.id ? 6 : 0,
			}}
		>
			<Image
				source={{ uri: category.image }}
				style={{ width: 40, height: 40 }}
			/>
			<Text
				category="c2"
				style={{
					color: currentCategory === category.id ? 'black' : 'black',
				}}
			>
				{category.name}
			</Text>
		</TouchableOpacity>
	);

	const renderItem = ({ item }) => <Item category={item} />;

	return (
		<Layout
			style={{
				padding: 10,
				justifyContent: 'flex-end',
			}}
		>
			<FlatList
				horizontal={false}
				showsHorizontalScrollIndicator={false}
				data={categories}
				keyExtractor={(category) => category.id}
				renderItem={renderItem}
			/>
		</Layout>
	);
};

export default Categories;
