import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from 'styled-components';
import { API, Storage } from "aws-amplify";

import { onError } from "../libs/errorLib";
import { s3Upload } from "../libs/awsLib";
import LoaderButton from "../components/LoaderButton";
import config from "../config";

export default function Product() {
    const [product, setProduct] = useState(null);
    const [content, setContent] = useState("");
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
                const { content, attachment } = product;
                if (attachment) {
                    product.attachmentURL = await Storage.vault.get(attachment);
                }
                setContent(content);
                setProduct(product);
            } catch (e) {
                onError(e);
            }
        }
        onLoad();
    }, [id]);

    function validateForm() {
        return content.length > 0;
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
                content,
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
                    <div>
                        <TextareaInput
                            id="content"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        />
                    </div>
                    {product.attachment && (
                        <CurrentContainer>
                            <Label>Current Image:</Label>
                                <ImageLink
                                target="_blank"
                                rel="noopener noreferrer"
                                href={product.attachmentURL}
                                >
                                    {formatFilename(product.attachment)}
                                </ImageLink>
                        </CurrentContainer>
                    )}
                    <div>
                        {!product.attachment &&
                            <label>Choose An Image:</label>
                        }
                        <input onChange={handleFileChange} type="file" />
                    </div>
                    <ButtonContainer>
                        <LoaderButton
                            type="submit"
                            isLoading={isLoading}
                            disabled={!validateForm()}
                        >
                            Save
                        </LoaderButton>
                        <LoaderButton
                            onClick={handleDelete}
                            isLoading={isDeleting}
                        >
                            Delete
                        </LoaderButton>
                    </ButtonContainer>
                </form>
            )}
        </div>
    );
}

const TextareaInput = styled.textarea`
    width: 25rem;
    font-size: 1.25rem;
`;

const Label = styled.label`
    font-size: 1.25rem;
    margin: 1rem;
`;

const CurrentContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 1rem;
`;

const ImageLink = styled.a`
    color: black;
    margin: auto 0;
`;

const ButtonContainer = styled.div`
    display: flex;
    margin: 1rem auto;
    width: 15rem;
`;