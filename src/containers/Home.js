import React, { useState, useEffect } from 'react';
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import styled from 'styled-components';

import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";

function Home() {
    const [products, setProducts] = useState([]);
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
                <Product header={product.content.trim().split("\n")[0]}>
                    {"Created: " + new Date(product.createdAt).toLocaleString()}
                </Product>
            </Link>
        ) : (
            <Link key="new" to="/products/new">
                <ButtonLink>
                    <b>{"\uFF0B"}</b> Create a new note
                </ButtonLink>
            </Link>
        ));
    }

    function renderLander() {
        return (
            <div>
                <h2>Welcome to Sweet Treats Delivered!</h2>
                <h3>Here you can purchase some sweet treats for you or someone you love</h3>
                <div>
                    <StyledLink to="/login">
                        Login
                    </StyledLink>
                    <StyledLink to="/signup">
                        Signup
                    </StyledLink>
                </div>
            </div>
        );
    }

    function renderProducts() {
        return (
            <div>
                <h2>Your Products</h2>
                <ProductList>
                    {!isLoading && renderProductsList(products)}
                </ProductList>
            </div>
        );   
    }

    return (
        <div>
            {isAuthenticated ? renderProducts() : renderLander()}
        </div>
    );
}

export default Home;

const ProductList = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 0;
    > a {
        color: white;
        text-decoration: none;
        margin: 1rem;
    }
`;

const ButtonLink = styled.div`
    border: 1px solid white;
    width: 12rem;
    padding: 1rem;
    font-size: 1.25rem;
`;

const Product = styled.li`
    font-size: 1.25rem;
`;

const StyledLink = styled(Link)`
    color: white;
    margin: 1rem;
    padding: 0.5rem;
    border: 1px solid white;
    border-radius: 26%;
    text-decoration: none;
    font-size: 1.25rem;
`;