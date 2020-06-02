import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { API } from "aws-amplify";

import Button from "../components/simple/Button";
import { Input, TextareaInput, InputContainer, InputLabel, FileInput, FileUploadButton } from "../components/simple/FormElements";
import { onError } from "../libs/errorLib";
import { s3Upload } from "../libs/awsLib";
import config from "../config";

export default function AddProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const file = useRef(null);
    const history = useHistory();
    
    function validateForm() {
        return (
            name.length > 0 &&
            price.length > 0 &&
            description.length > 0
        );
    };

    function handleFileChange(event) {
        file.current = event.target.files[0];
    };

    async function handleSubmit(event) {
        event.preventDefault();
        if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(
                `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`
            );
            return;
        }
        setIsLoading(true);

        try {
            const attachment = file.current ? await s3Upload(file.current) : null;
            await createProduct({ name, price, description, attachment });
            history.push("/");
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    };

    function createProduct(product) {
        return API.post("product", "/product", {
            body: product
        });
    };

    return (
        <div>
            <h2>Add a new product</h2>
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
                <InputContainer>
                    <InputLabel>
                        Product image
                        <FileInput onChange={handleFileChange} type="file" id="file"/>
                        <FileUploadButton>
                            <span>Choose an image</span>
                        </FileUploadButton>
                    </InputLabel>
                </InputContainer>
                <Button
                    type="submit"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Create
                </Button>
            </form>
        </div>
    );
}