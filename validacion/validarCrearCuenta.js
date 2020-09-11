export default function ValidarCrearCuenta(valores){

    let errores = {};

    //validar El nombre
    if(!valores.nombre){
        errores.nombre = "El nombre es obligatorio"
    }
    //validar el Correo 
    if(!valores.email){
        errores.email = "El correo es obligatorio"
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)){
        errores.email = "El correo no valido"
    }
    
       // validar el password
    if(!valores.password) {
        errores.password = "El password es obligatorio";
    } else if( valores.password.length < 6 ) {
        errores.password = 'El password debe ser de al menos 6 caracteres'
    }

    return errores ;
}