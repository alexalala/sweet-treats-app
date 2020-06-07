import React, { useState, useEffect } from 'react';
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import styled from 'styled-components';

import ProductCard from '../components/product/ProductCard';
import { onError } from "../libs/errorLib";

function PLP() {
    const [products, setProducts] = useState(null);
    const [productsAmount, setProductsAmount] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function onLoad() {
            try {
                const products = await loadProducts();
                setProducts(products.Items);
                setProductsAmount(products.Count);
            } catch (e) {
                onError(e);
            }
            setIsLoading(false);
        }
        onLoad();
    }, []);
    
    function loadProducts() {
        return API.get("product", "/product/all");
    }

    function renderProductsList(products) {
        return products.map((product, i) => (
            <Link key={i} to={`/product/${product.productId}`}>
                <ProductCard product={product} />
            </Link>
        ));
    }

    return (
        <div>
            <h2>All Products</h2>
            <p>{productsAmount} products</p>
            <ProductList>
                <ProductsContainer>
                    {!isLoading && renderProductsList(products)}
                </ProductsContainer>
            </ProductList>
        </div>
    );
}

export default PLP;

const ProductList = styled.ul`
    list-style-type: none;
    display: flex;
    padding-left: 0;
    justify-content: center;
`;

const ProductsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 51.25rem;
    > a {
        color: black;
        text-decoration: none;
        margin: 1rem;
    }
`;
