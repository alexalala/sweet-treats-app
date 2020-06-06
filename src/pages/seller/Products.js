import React, { useState, useEffect } from 'react';
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import styled from 'styled-components';

import ProductCard from '../../components/product/ProductCard';
import { useAppContext } from "../../libs/contextLib";
import { onError } from "../../libs/errorLib";

function Products() {
    const [products, setProducts] = useState(null);
    const { isAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function onLoad() {
            if (!isAuthenticated) {
                return;
            }
            try {
                const products = await loadProducts();
                setProducts(products);
            } catch (e) {
                onError(e);
            }
            setIsLoading(false);
        }
        onLoad();
    }, [isAuthenticated]);
    
    function loadProducts() {
        return API.get("product", "/product");
    }

    function renderProductsList(products) {
        return [{}].concat(products).map((product, i) => i !== 0 ? (
            <Link key={product.productId} to={`/product/${product.productId}`}>
                <ProductCard product={product} />
            </Link>
        ) : (
            <Link key="new" to="/product/new">
                <ButtonLink>
                    <b>{"\uFF0B"}  </b> Create a new product
                </ButtonLink>
            </Link>
        ));
    }

    return (
        <div>
            <h2>Your Products</h2>
            <ProductList>
                <ProductsContainer>
                    {!isLoading && renderProductsList(products)}
                </ProductsContainer>
            </ProductList>
        </div>
    );
}

export default Products;

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

const ButtonLink = styled.div`
    display: flex;
    border: 1px solid black;
    width: 13rem;
    padding: 1rem;
    align-items: center;
    height: 13rem;
    font-size: 1.25rem;
`;