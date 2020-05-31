import styled from 'styled-components';

export const Input = styled.input`
    display: flex;
    height: 2rem;
    font-size: 2rem;
    width: 30rem;
    padding: 6px;
    margin: 1rem 0;
`;

export const TextareaInput = styled.textarea`
    width: 25rem;
    font-size: 1.25rem;
`;

export const InputContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const InputLabel = styled.label`
    font-size: 1.5rem;
    text-align: left;
`;

export default Input;