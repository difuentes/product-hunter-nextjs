import  Styled from '@emotion/styled'

const Boton = Styled.a`

    font-weight:700;
    text-transform:uppercase;
    border:1px solid #d1d1d1;
    padding:.8rem 2rem;
    margin-right:1rem;
    border-radius: 5px;
    background-color: ${props => props.bgColor ? '#DA552F' : '#33A5FF'};
    color :${props => props.bgColor ? 'white' : 'white'};

    &:last-of-type{
     margin-right:0rem;
    }

    &:hover{
        cursos:pointer;
    }
`;

export default Boton;