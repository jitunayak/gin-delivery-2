import React from 'react';
import { Button, Input, Layout } from '@ui-kitten/components';

export default function SearchBar() {
	return (
		<Layout
			style={{
				padding: 20,
			}}
		>
			<Layout
				style={{
					flexDirection: 'row',
				}}
			>
				<Input placeholder="Search" style={{ flex: 5 }} />
				<Button appearance={'ghost'} style={{ flex: 1, marginLeft: 10 }}>
					Search
				</Button>
			</Layout>
			<Layout
				style={{ flexWrap: 'wrap', flexDirection: 'row', marginVertical: 10 }}
			>
				<Button
					style={{ marginHorizontal: 5 }}
					status={'info'}
					appearance={'outline'}
					size={'small'}
				>
					Popular
				</Button>
				<Button
					style={{ marginHorizontal: 5 }}
					status={'success'}
					appearance={'outline'}
					size={'small'}
				>
					Low To High
				</Button>
				<Button
					style={{ marginHorizontal: 5 }}
					status={'warning'}
					appearance={'outline'}
					size={'small'}
				>
					Discount
				</Button>
			</Layout>
		</Layout>
	);
}
