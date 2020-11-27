import styled, {css} from 'styled-components';

const Button = styled.button`
    color: white;
    background: ${p => p.secondary ? 'black' : '#f8049c'};
    font-weight: bold;
    ${p => p.large ? css`
        padding: 10px;
        border-radius: 5px;
        font-size: 1.5em;
    ` : css`
        padding: 8px;
        border-radius: 4px;
        font-size: 1em;
    `}
    box-shadow: none;
    display: block;
    width:100%;
    white-space: none;

    &:disabled{
        background: #eee;
        color: #fff;
    }
`;


export {Button};