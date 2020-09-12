export default function ValidarNuevoProducto(valores){

    let errores = {};

    //validar El nombre
    if(!valores.nombre){
        errores.nombre = "El nombre es obligatorio !!"
    }

    //validar empresa 
    if(!valores.empresa){
        errores.email = "El campo Empresa Es  obligatorio !!"
    }
    
    //validar la url 
    if(!valores.url){
        errores.url = "La URL del producto es obligatoria !!"
    }else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)){
        errores.url = "URL mal formateada o no valida"
    }

    //validar descripcion
    if(!valores.descripcion){
        errores.descripcion ="El campo descripcion es obligatorio !!"
    }

    return errores ;
}