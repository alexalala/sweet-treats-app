import styled from 'styled-components';

export const Input = styled.input`
    display: flex;
    height: 2rem;
    font-size: 2rem;
    width: 30rem;
    padding: 6px;
    margin-top: 1rem;
`;

export const TextareaInput = styled.textarea`
    width: 30.75rem;
    font-size: 2rem;
    height: 5rem;
    margin-top: 1rem;
`;

export const FileUploadButton = styled.div`
    cursor: pointer;
    border: 1px solid black;
    padding: 5px 2rem;
    width: fit-content;
    margin: 1rem 0;
`;

export const FileInput = styled.input`
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;

    &:focus + ${FileUploadButton} {
        outline: 1px dotted #000;
        outline: -webkit-focus-ring-color auto 5px;
    }
`;

export const InputContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const InputLabel = styled.label`
    font-size: 1.5rem;
    text-align: left;
    display: flex;
    width: 31rem;
    margin: 1rem;
    flex-direction: column;
`;

export const ButtonContainer = styled.div`
    display: flex;
    margin: 1rem auto;
    width: 15rem;
`;

export default Input;