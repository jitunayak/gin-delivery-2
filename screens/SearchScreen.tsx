import React, { useEffect } from 'react';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import SearchBar from '../components/SearchBar';
import { SYMBOLS } from '../utilities/Constants';
import SearchResults from '../components/SearchResults';
import Item from '../components/Item';

export default function SearchScreen({ navigation }) {
	const fetchedProducts = [
		{
			id: '1we23klpd',
			name: 'Panner',
			price: 30,
			isAvailable: true,
			weight: '1ltr',
			quantity: 0,
			image:
				'https://previews.123rf.com/images/bigacis/bigacis1610/bigacis161000162/65500420-bowl-of-diced-soft-cheese-isolated-on-white-background-top-view.jpg',
			category: 'Milk',
		},
		{
			id: '12asbhej',
			name: 'Nandini Milk',
			price: 22,
			weight: '500ml',
			quantity: 0,
			image:
				'https://www.kmfnandini.coop/sites/default/files/styles/product_popup_600x500/public/products/Pasteurised-Toned-Milk-b.png?itok=x64Sfsmk',
			category: 'Milk',
			isAvailable: true,
		},
		{
			id: '1we23kl',
			name: 'Toned milk',
			price: 34,
			isAvailable: true,
			weight: '500ml',
			quantity: 0,
			image:
				'https://www.kmfnandini.coop/sites/default/files/styles/product_popup_600x500/public/products/Nandini-Double-Toned-Milk-b.png?itok=vdjKgE_l',
			category: 'Milk',
		},
		{
			id: '12asbhejp',
			name: 'Onions',
			price: 65,
			isAvailable: true,
			weight: '1kg',
			quantity: 0,
			image:
				'https://media.istockphoto.com/photos/red-onions-picture-id499146498?k=20&m=499146498&s=612x612&w=0&h=fe8fftS2SpmSlx_KAT_wOPIhlwO9SFelIwq0nmG8NmA=',
			category: 'Vegetables',
		},
		{
			id: '1we23klp',
			name: 'Potatoes',
			price: 20,
			isAvailable: true,
			weight: '1kg',
			quantity: 0,
			image:
				'https://media.istockphoto.com/photos/three-potatoes-picture-id157430678?k=20&m=157430678&s=612x612&w=0&h=dfYLuPYwA50ojI90hZ4jCgKZd5TGnqf24UCVBszoZIA=',
			category: 'Vegetables',
		},
	];

	const [products, setProducts] = React.useState(fetchedProducts);
	const [selectedCategory, setSelectedCategory] =
		React.useState<string>('Milk');
	const [searchText, setSearchText] = React.useState<string>('');

	useEffect(() => {
		let filteredProducts = fetchedProducts.filter((product) => {
			return product.name.toLowerCase().includes(searchText.toLowerCase());
		});
		setProducts(filteredProducts);
	}, [searchText]);

	return (
		<Layout
			style={{
				paddingTop: SYMBOLS.STATUSBAR_HERIGHT,
				flexDirection: 'column',
				marginTop: SYMBOLS.STATUSBAR_HERIGHT,
				padding: 10,
			}}
		>
			<Input
				value={searchText}
				placeholder="Search..."
				style={{ marginVertical: 2 }}
				autoFocus={true}
				onChangeText={(value) => {
					setSearchText(value);
				}}
			/>
			{searchText.length > 0 ? (
				<Item
					navigation={navigation}
					selectedCategory={selectedCategory}
					products={products}
					setProducts={setProducts}
				/>
			) : (
				<Text appearance={'hint'}>e.g milk, panner</Text>
			)}
		</Layout>
	);
}
