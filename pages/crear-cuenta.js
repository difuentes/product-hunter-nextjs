import React,{useState} from 'react';
import Layout from '../components/layout/Layout';
import {css} from '@emotion/core';
import Router from 'next/router'

//UI
import {Formulario,Campo,InputSubmit,Error} from '../components/ui/Formulario';
//validaciones 
import useValidacion from '../hooks/useValidacion';
import validarCrearCuenta from '../validacion/validarCrearCuenta';
//firebase
import firebase from '../firebase'

 //State Inicial 
 const STATE_INICIAL = {
  nombre: '',
  email: '',
  password: ''
}
 
const CrearCuenta = () => {

  const [error,guardarError] = useState(false)

  const {valores, errores, handleSubmit,handleChange,handleBlur} = useValidacion(STATE_INICIAL,validarCrearCuenta,crearCuenta);

  //destructuring valores
  const { nombre, email, password } = valores;
  
  //funcion crear Cuenta
  async function crearCuenta(){

    try {
      await firebase.registrar(nombre,email,password);
      Router.push('/')
    } catch (error) {
        console.log('Hubo un error al crear el usuario',error.message);
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
            >CREAR CUENTA</h1>
            <Formulario
              onSubmit={handleSubmit}
            >
                <Campo>
                    <label htmlFor="nombre">Nombre</label>
                    <input 
                        type="text"
                        id="nombre"
                        placeholder="Tu Nombre"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      
                    />
                </Campo>

                {errores.nombre && <Error>{errores.nombre}</Error>}
    
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
                  value="Crear Cuenta"
                />
            </Formulario>
          </>
        </Layout>
      </div>

  );
}
 
export default CrearCuenta;