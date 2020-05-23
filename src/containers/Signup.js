import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import { Auth } from "aws-amplify";

import LoaderButton from "../components/LoaderButton";

import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";

export default function Signup() {
    const [newUser, setNewUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
        confirmPassword: "",
        confirmationCode: "",
    });

    const history = useHistory();
    
    const { userHasAuthenticated } = useAppContext();
    
    function validateForm() {
        return (
            fields.email.length > 0 &&
            fields.password.length > 0 &&
            fields.password === fields.confirmPassword
        );
    };

    function validateConfirmationForm() {
        return fields.confirmationCode.length > 0;
    };

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        try {
            const newUser = await Auth.signUp({
                username: fields.email,
                password: fields.password,
            });
            setIsLoading(false);
            setNewUser(newUser);
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    async function handleConfirmationSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        try {
            await Auth.confirmSignUp(fields.email, fields.confirmationCode);
            await Auth.signIn(fields.email, fields.password);
            userHasAuthenticated(true);
            history.push("/");
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }
        
    function renderConfirmationForm() {
        return (
            <form onSubmit={handleConfirmationSubmit}>
                <InputContainer>
                    <InputLabel>
                        Confirmation Code
                        <Input
                            autoFocus
                            type="tel"
                            onChange={handleFieldChange}
                            value={fields.confirmationCode}
                            id="confirmationCode"
                        />
                    </InputLabel>
                    
                    <p>Please check your email for the code.</p>
                </InputContainer>
                <LoaderButton
                    type="submit"
                    isLoading={isLoading}
                    disabled={!validateConfirmationForm()}
                >
                    Verify
                </LoaderButton>
            </form>
        );
    }
    function renderForm() {
        return (
            <form onSubmit={handleSubmit}>
                <InputContainer>
                    <InputLabel>
                        Email
                        <Input
                            autoFocus
                            type="email"
                            value={fields.email}
                            onChange={handleFieldChange}
                            id="email"
                        />   
                    </InputLabel>
                </InputContainer>
                <InputContainer>
                    <InputLabel>
                        Password
                        <Input
                            type="password"
                            value={fields.password}
                            onChange={handleFieldChange}
                            id="password"
                        />
                    </InputLabel>
                </InputContainer>
                <InputContainer>
                    <InputLabel>
                        Confirm Password
                        <Input
                            type="password"
                            onChange={handleFieldChange}
                            value={fields.confirmPassword}
                            id="confirmPassword"
                        />
                    </InputLabel>
                    
                </InputContainer>
                <LoaderButton
                    type="submit"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Signup
                </LoaderButton>
            </form>
        );
    }
        
    return (
        <div className="Signup">
            { newUser === null
                ? 
                    renderForm()
                :
                    renderConfirmationForm()
            }
        </div>
    );
};

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.5rem;
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