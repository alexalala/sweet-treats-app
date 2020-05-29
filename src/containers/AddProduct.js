import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { API } from "aws-amplify";

import Button from "../components/simple/Button";
import { Input, InputContainer, InputLabel } from "../components/simple/FormElements";
import { onError } from "../libs/errorLib";
import { s3Upload } from "../libs/awsLib";
import config from "../config";

export default function AddProduct() {
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const file = useRef(null);
    const history = useHistory();
    
    function validateForm() {
        return content.length > 0;
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
            await createProduct({ content, attachment });
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
            <form onSubmit={handleSubmit}>
                <InputContainer>
                    <Input
                        value={content}
                        componentClass="textarea"
                        onChange={e => setContent(e.target.value)}
                        id="content"
                    />
                </InputContainer>
                <InputContainer>
                    <InputLabel>
                        Attachment
                        <Input onChange={handleFileChange} type="file" id="file" />
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