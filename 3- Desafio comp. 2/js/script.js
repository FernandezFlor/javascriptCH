const ropa=['remera', 'pantalon', 'vestido'];


let opcion=parseInt(prompt('Ingrese una opción:  \n1 - Ver listado \n2 - Agregar producto \n3 - Eliminar último articulo \n4 - Salir '));




while(opcion!=4){
    if (opcion==1) {
        const cadena=ropa.toString();
        alert(cadena)       
    }else if(opcion==2){
        const ropaNueva=prompt('Agrega la nueva prenda:');
        ropaNueva={
            color: prompt('agrega el color'),
            talle: prompt('agrega el talle'),
            estampado: prompt('tiene estampado?'),
        }
        ropa.push(ropaNueva);
    }else if(opcion==3){
        ropa.pop();
    }
    opcion=parseInt(prompt('Ingrese una opción:  \n1 - Ver listado \n2 - Agregar producto \n3 - Eliminar último articulo \n4 - Salir '));
}