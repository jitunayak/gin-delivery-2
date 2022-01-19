import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import SearchBar from '../components/SearchBar';
import { SYMBOLS } from '../utilities/Constants';
import SearchResults from '../components/SearchResults';

export default function SearchScreen() {
	return (
		<Layout
			style={{ paddingTop: SYMBOLS.STATUSBAR_HERIGHT, flexDirection: 'column' }}
		>
			<SearchBar />
			<SearchResults />
		</Layout>
	);
}
