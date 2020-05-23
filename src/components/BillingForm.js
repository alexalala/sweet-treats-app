import React, { useState } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import styled from 'styled-components';

import LoaderButton from "./LoaderButton";
import { useFormFields } from "../libs/hooksLib";

function BillingForm({ isLoading, onSubmit, ...props }) {

    const [fields, handleFieldChange] = useFormFields({
        name: "",
        storage: ""
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [isCardComplete, setIsCardComplete] = useState(false);

    isLoading = isProcessing || isLoading;

    function validateForm() {
        return (
            fields.name !== "" &&
            fields.storage !== "" &&
            isCardComplete
        );
    }

    async function handleSubmitClick(event) {
        event.preventDefault();
        setIsProcessing(true);
        const { token, error } = await
        props.stripe.createToken({ name: fields.name });
        setIsProcessing(false);
        onSubmit(fields.storage, { token, error });
    }

    return (
        <form className="BillingForm" onSubmit={handleSubmitClick}>
            <div>
                <Label>
                    Storage
                    <Input
                        id="storage"
                        min="0"
                        type="number"
                        value={fields.storage}
                        onChange={handleFieldChange}
                        placeholder="Number of products to store"
                    />
                </Label>
            </div>
            <div>
                <Label>
                    Cardholder&apos;s name
                    <Input
                        id="name"
                        type="text"
                        value={fields.name}
                        onChange={handleFieldChange}
                        placeholder="Name on the card"
                    />
                </Label>
            </div>
            <Label>
                Credit Card Info
                <CardDetails
                    onChange={e => setIsCardComplete(e.complete)}
                />
            </Label>
            <LoaderButton
                type="submit"
                isLoading={isLoading}
                disabled={!validateForm()}
            >
                Purchase
            </LoaderButton>
        </form>
    );
}

export default injectStripe(BillingForm);

const Label = styled.label`
    display: flex;
    flex-direction: column;
    max-width: 20rem;
    font-size: 1.75rem;
    text-align: left;
    margin: 1rem auto;
`;

const Input = styled.input`
    padding: 5px;
    font-size: 1.5rem;
`;

const CardDetails = styled(CardElement)`
    background: white;
    max-width: 30rem;
    padding: 10px;
`;