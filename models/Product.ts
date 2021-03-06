export interface Product {
	id: string;
	name: string;
	price: number;
	weight: string;
	quantity: number;
	image: string;
	isAvailable?: boolean;
	category: string;
}

export interface ProductReducer {
	selectedItems: { items: Product[]; isCartEmpty: boolean };
}
