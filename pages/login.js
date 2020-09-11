import React,{useState} from 'react';
import Layout from '../components/layout/Layout';
import {css} from '@emotion/core';
import Router from 'next/router'

//UI
import {Formulario,Campo,InputSubmit,Error} from '../components/ui/Formulario';
//validaciones 
import useValidacion from '../hooks/useValidacion';
import ValidarLogin from '../validacion/validacionLogin';
//firebase
import firebase from '../firebase'

 //State Inicial 
 const STATE_INICIAL = {
  email: '',
  password: ''
}
 

const Login = () =>{

  const [error,guardarError] = useState(false)

  const {valores, errores, handleSubmit,handleChange,handleBlur} = useValidacion(STATE_INICIAL,ValidarLogin,iniciarSesion);

  //destructuring valores
  const { email, password } = valores;
  
  // funcion iniciar sesion

  async function iniciarSesion(){
      try {

        const usuario = await firebase.login(email,password);
        Router.push('/')

      } catch (error) {
        console.log('Hubo un error autenticar el usuario',error.message);
        guardarError(error.message)
      }
  }

  return (  
     <div>
        <Layout>
          <>
            <h1
              css={css`
                text-align: center;
                margin-top: 5rem;
                color: #33A5FF;
                font-size: 3rem;
              `}
            >LOGIN</h1>
            <Formulario
              onSubmit={handleSubmit}
            >
               
                <Campo>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email"
                        id="email"
                        placeholder="Tu Email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Campo>
                {errores.email && <Error>{errores.email}</Error>}

                <Campo>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        id="password"
                        placeholder="Tu password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Campo>
                {errores.password && <Error>{errores.password}</Error>}

                 {error && <Error>{error}</Error> }
                <InputSubmit 
                  type="submit"
                  value="Iniciar Sesion"
                />
            </Formulario>
          </>
        </Layout>
      </div>

  );
}
 
export default Login;