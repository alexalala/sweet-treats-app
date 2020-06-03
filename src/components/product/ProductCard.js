import React from "react";
import styled from 'styled-components';

export default function ProductCard({ product }) {
    const { attachment, productName, price } = product;
    const attachmentUrl = attachment && `${process.env.REACT_APP_BUCKET_URL}${attachment}`;

    return (
        <div>
            {/* TODO: add alt text into backend */}
            { attachmentUrl &&
                <Image src={attachmentUrl} alt=""/>
            }
            <p>{productName}</p>
            <p>£{price}</p>
        </div>
    );
}

const Image = styled.img`
    height: 15rem;
    width: 15rem;
    margin-bottom: 8px;
    object-fit: cover;
`;