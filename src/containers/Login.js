import React, { useState } from "react";
import styled from 'styled-components';
import LoaderButton from "../components/LoaderButton";

import { Auth } from "aws-amplify";

import { onError } from "../libs/errorLib";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";

export default function Login() {
    const { userHasAuthenticated } = useAppContext();

    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: ""
    });

    function validateForm() {
        return fields.email.length > 0 && fields.password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            await Auth.signIn(fields.email, fields.password);
            userHasAuthenticated(true);
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <InputContainer>
                    <InputLabel>
                        Email
                        <Input
                            id="email"
                            autoFocus
                            type="email"
                            value={fields.email}
                            onChange={handleFieldChange}
                        />
                    </InputLabel>
                </InputContainer>
                <InputContainer>
                    <InputLabel>
                        Password
                        <Input
                            id="password"
                            value={fields.password}
                            onChange={handleFieldChange}
                            type="password"
                        />
                    </InputLabel>
                </InputContainer>
                <LoaderButton 
                    isLoading={isLoading}
                    disabled={!validateForm()}
                    type="submit"
                >
                    Log in
                </LoaderButton>
            </form>
        </div>
    );
}

const InputContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const InputLabel = styled.label`
    font-size: 1.5rem;
`;

const Input = styled.input`
    display: flex;
    height: 2rem;
    font-size: 2rem;
    width: 30rem;
    padding: 6px;
    margin: 1rem;
`;