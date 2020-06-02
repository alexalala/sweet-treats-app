import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from 'styled-components';
import { API, Storage } from "aws-amplify";

import { Input, TextareaInput, InputContainer, InputLabel, FileInput, FileUploadButton } from "../components/simple/FormElements";
import { onError } from "../libs/errorLib";
import { s3Upload } from "../libs/awsLib";
import Button from "../components/simple/Button";
import config from "../config";

export default function Product() {
    const [product, setProduct] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const file = useRef(null);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        function loadProduct() {
            return API.get("product", `/product/${id}`);
        }
        async function onLoad() {
            try {
                const product = await loadProduct();
                const { productName, price, description, attachment } = product;
                if (attachment) {
                    product.attachmentURL = await Storage.get(attachment);
                }
                setName(productName);
                setPrice(price);
                setDescription(description);
                setProduct(product);
            } catch (e) {
                onError(e);
            }
        }
        onLoad();
    }, [id]);

    function validateForm() {
        return (
            name.length > 0 &&
            price.length > 0 &&
            description.length > 0
        );
    }

    function formatFilename(str) {
        return str.replace(/^\w+-/, "");
    }

    function handleFileChange(event) {
        file.current = event.target.files[0];
    }

    function saveProduct(product) {
        return API.put("product", `/product/${id}`, {
            body: product
        });
    }

    function deleteProduct() {
        return API.del("product", `/product/${id}`);
    }

    async function handleSubmit(event) {
        let attachment;
        event.preventDefault();
        if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(
                `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`
            );
            return;
        }
        setIsLoading(true);
        try {
            if (file.current) {
                attachment = await s3Upload(file.current);
            }
            await saveProduct({
                name,
                price,
                description,
                attachment: attachment || product.attachment
            });
            history.push("/");
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    async function handleDelete(event) {
        event.preventDefault();
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (!confirmed) {
            return;
        }
        setIsDeleting(true);

        try {
            await deleteProduct();
            history.push("/");
        } catch (e) {
            onError(e);
            setIsDeleting(false);
        }
    }

    return (
        <div>
            <h2>Edit product</h2>
            {product && (
                <form onSubmit={handleSubmit}>
                    <InputContainer>
                        <InputLabel>
                            Product name
                            <Input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                id="name"
                            />
                        </InputLabel>
                    </InputContainer>
                    <InputContainer>
                        <InputLabel>
                            Product price
                            <Input
                                type="number"
                                min="0.00"
                                step="any"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                id="price"
                            />
                        </InputLabel>
                    </InputContainer>
                    <InputContainer>
                        <InputLabel>
                            Product description
                            <TextareaInput
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                id="description"
                            />
                        </InputLabel>
                    </InputContainer>
                    {product.attachment && (
                        <InputContainer>
                            <InputLabel>Current Image:</InputLabel>
                                <ImageLink
                                target="_blank"
                                rel="noopener noreferrer"
                                href={product.attachmentURL}
                                >
                                    {formatFilename(product.attachment)}
                                </ImageLink>
                        </InputContainer>
                    )}
                    <InputContainer>
                        <InputLabel>
                            {!product.attachment &&
                                <span>Choose An Image:</span>
                            }
                            <FileInput onChange={handleFileChange} type="file" id="file"/>
                            <FileUploadButton>
                                <span>Choose an image</span>
                            </FileUploadButton>
                        </InputLabel>
                    </InputContainer>
                    <ButtonContainer>
                        <Button
                            type="submit"
                            isLoading={isLoading}
                            disabled={!validateForm()}
                        >
                            Save
                        </Button>
                        <Button
                            onClick={handleDelete}
                            isLoading={isDeleting}
                        >
                            Delete
                        </Button>
                    </ButtonContainer>
                </form>
            )}
        </div>
    );
}

const ImageLink = styled.a`
    color: black;
    margin: auto 0;
`;

const ButtonContainer = styled.div`
    display: flex;
    margin: 1rem auto;
    width: 15rem;
`;