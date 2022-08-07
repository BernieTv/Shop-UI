import axios from 'axios';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { popularProducts } from '../data';
import Product from './Product';

const Container = styled.div`
	padding: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);

	useEffect(() => {
		const getProducts = async () => {
			try {
				const response = await axios.get(
					cat
						? `http://localhost:5000/api/products?category=${cat}`
						: 'http://localhost:5000/api/products'
				);
				setProducts(response.data);
			} catch (error) {}
		};

		getProducts();
	}, [cat]);

	useEffect(() => {
		if (cat) {
			setFilteredProducts(
				products.filter((product) =>
					Object.entries(filters).every(([key, value]) =>
						product[key].includes(value)
					)
				)
			);
		}
	}, [cat, filters, products]);

	useEffect(() => {
		if (sort === 'newest') {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => a.createdAt - b.createdAt)
			);
		} else if (sort === 'asc') {
			setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
		} else {
			setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
		}
	}, [sort]);

	return (
		<Container>
			{cat
				? filteredProducts.map((item) => <Product key={item._id} item={item} />)
				: products.slice(0, 8).map((item) => <Product key={item._id} item={item} />)}
		</Container>
	);
};

export default Products;
