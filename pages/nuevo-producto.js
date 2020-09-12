import React,{useState,useContext} from 'react';
import Layout from '../components/layout/Layout';
import {css} from '@emotion/core';
import Router ,{useRouter} from 'next/router'

//UI
import {Formulario,Campo,InputSubmit,Error} from '../components/ui/Formulario';
//validaciones 
import useValidacion from '../hooks/useValidacion';
import validacionCrearProducto from '../validacion/validacionCrearProducto';
//firebase
import {firebase,FirebaseContext} from '../firebase'
import FileUploader from 'react-firebase-file-uploader'

 //State Inicial 
 const STATE_INICIAL = {
  nombre: '',
  empresa: '',
  //imagen: '',
  url: '',
  descripcion: ''
}

const NuevoProducto = () => {

  //state de las imagenes 
  const [nombreImagen,guardarNombre] = useState('');
  const [subiendo,guardarSubiendo] = useState(false);
  const [progreso,guardarProgreso] = useState(0);
  const [urlImg,guardarUrlImg] = useState('');

  const [error,guardarError] = useState(false)

  const {valores, errores, handleSubmit,handleChange,handleBlur} = useValidacion(STATE_INICIAL,validacionCrearProducto,crearProducto);

  //destructuring valores
  const { nombre, empresa, imagen,url,descripcion } = valores;

  //context con la operaciones crud de firebase
  const {usuario,firebase} = useContext(FirebaseContext)
  
  //hook routing para redireccionar
  const router = useRouter();
  //funcion crear Cuenta
  async function crearProducto(){
    //si el usuario no esta autenticado llevar a login
    if(!usuario){
      return  router.push('/login')
    }

    //crear objeto de nuevo producto
    const producto = {
      nombre,
      empresa,
      url,
      urlImg,
      descripcion,
      votos:0,
      comentarios:[],
      creado:Date.now()
    }

    //insertar en firebase
    firebase.db.collection('productos').add(producto);
  }

 

  const handleUploadStart = () => {
    guardarProgreso(0);
    guardarSubiendo(true);
}

const handleProgress = progreso => guardarProgreso({ progreso });

const handleUploadError = error => {
    guardarSubiendo(error);
    console.error(error);
};

const handleUploadSuccess = nombre => {
    guardarProgreso(100);
    guardarSubiendo(false);
    guardarNombre(nombre)
    firebase
        .storage
        .ref("productos")
        .child(nombre)
        .getDownloadURL()
        .then(url => {
          console.log(url);
          guardarUrlImg(url);
        } );
};


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
            >NUEVO PRODUCTO</h1>
            <Formulario
              onSubmit={handleSubmit}
            >
              <fieldset>
                <legend>Informacion General</legend>
             
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
                    <label htmlFor="empresa">Empresa</label>
                    <input 
                        type="text"
                        id="empresa"
                        placeholder="Nombre Empresa"
                        name="empresa"
                        value={empresa}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      
                    />
                </Campo>

                {errores.empresa && <Error>{errores.empresa}</Error>}

               
                <Campo>
                    <label htmlFor="imagen">Imagen</label>
                    <FileUploader 
                        accept="image/*"
                        id="imagen"
                        name="imagen"
                        randomizeFilename
                        storageRef={firebase.storage.ref("productos")}
                        onUploadStart={handleUploadStart}
                        onUploadError={handleUploadError}
                        onUploadSuccess={handleUploadSuccess}
                        onProgress={handleProgress}
                    />
                </Campo>

               
            
                <Campo>
                    <label htmlFor="url">URL</label>
                    <input 
                        type="url"
                        id="url"
                        name="url"
                        value={url}
                        placeholder="URL de tu producto"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      
                    />
                </Campo>

                {errores.url && <Error>{errores.url}</Error>}

                </fieldset>

                <fieldset>
                  <legend>Sobre Tu Producto</legend>

                  <Campo>
                    <label htmlFor="url">Descripcion</label>
                    <textarea 
                        id="descripcion"
                        name="descripcion"
                        value={descripcion}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      
                    />
                </Campo>

                {errores.descripcion && <Error>{errores.descripcion}</Error>}

                </fieldset>

                 {error && <Error>{error}</Error> }
                <InputSubmit 
                  type="submit"
                  value="Crear Producto"
                />
            </Formulario>
          </>
        </Layout>
      </div>

  );
}
 
export default NuevoProducto;