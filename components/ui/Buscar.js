import React from 'react';
import Styled from '@emotion/styled';
import {css} from '@emotion/core'

const InputText = Styled.input`
    border:1px solid var(--gris3);
    padding:1rem;
    min-width:300px;
`;
const InputSubmit = Styled.button`
    height:3rem;
    width: 3rem;
    display: block;
    background-size: 4rem;
    background-image : url('/static/img/buscar.png');
    background-repeat: no-repeat;
    position:absolute;
    right:1rem;
    top: 1px;
    background-color: white;
    border:none;
    text-indent:-99999px;

    &:hover{
        cursor:pointer;
    }
`

const Buscar = () => {
    return (
        <form
            css={css`
                position:relative;
                margin-top: 2rem
            `}
        >
            <InputText type="text" placeholder="Buscar Producto"/>
            <InputSubmit type="button">Buscar</InputSubmit>
        </form>

      );
}
 
export default Buscar;