import styled from '@emotion/styled';

export const  Formulario = styled.form`

    max-width:600px;
    width:95%;
    margin:5rem auto 0 auto;

`

export const Campo = styled.div`
    margin-botton:2rem;
    display:flex;
    align-items:center;
    margin-top:1rem;

    label{
        flex: 0 0 150px;
        font-size:1.8rem;
    }

    input{
        flex:1;
        padding: 1rem;
    }
    
`

export const InputSubmit = styled.input`
    background-color: #33A5FF;
    width:100%;
    padding: 1.5rem;
    
    text-aling:center;
    color:#FFF;
    font-size:1.8rem;
    text-transform:uppercase;
    border:solid;
    Border-color:white;
    font-family: 'PT Sans' ,sans-serif;
    font-weight:700;
    margin-top:1rem;
    border-radius: 15px;

    &:hover {
        cursor:pointer;
    }

`   

export const Error = styled.p `
    background-color: red;
    padding:1rem;
    font-family : 'PT Sans',sans-serif;
    font-weight:700;
    font-size: 1.4rem;
    color:white;
    text-align:center;
    text-transform: uppercase ;
    margin: 2rem 0;
    border-radius: 15px;

`