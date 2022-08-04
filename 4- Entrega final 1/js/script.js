class Ropita{
    constructor(nombre, color, talle, estampado, precio, id){
        this.nombre=nombre;
        this.color=color;
        this.talle=talle;
        this.estampado=estampado;
        this.precio=parseInt(precio);
    }
    asignarId(array){
        this.id=array.length;
    }
}



const ropa = [
    new Ropita('Remera', 'Azul', 'M', 'Lisa', 500, 1),
    new Ropita('Pantalon', 'Negro', 'L', 'Liso', 1500, 2),
    new Ropita('Pollera', 'Rojo', 'XS', 'Lunares', 850, 3)
]

console.log(ropa);

let opcion=parseInt(prompt('Ingrese una opción:  \n1 - Ingresar prenda. \n2 - Filtrar por criterio. \n3 - Eliminar última prenda.\n4 - Salir '));

while(opcion!=5){
    switch (opcion) {
        case 1:    
            let ingreso = prompt('Ingresa los datos del prenda: nombre, color, talle, estampado, precio) separados por un guión (-).');
            let datos = ingreso.split('-');
            const ropaN = new Ropita(datos[0], datos[1], datos[2], datos[3], datos[4]);
            ropa.push(ropaN);
            ropaN.asignarId(ropa);
            console.log(ropa);
            opcion=parseInt(prompt('Ingrese una opción:  \n1 - Ingresar prenda. \n2 - Filtrar por criterio. \n3 - Eliminar última prenda.\n4 - Salir '));
            break;
        case 2:
            let criterio = prompt('Elegí el criterio deseado:\n1 - Nombre de la prenda alfabeticamente (A a Z). \n2 - Precio (menor a mayor). \n3 - Talle (menor a mayor). \n4');

            function ordenar(criterio, array) {
                let arrayOrdenado = array.slice(0);


                switch (criterio) {
                    case 1:
                        let nombreAscendente = arrayOrdenado.sort((a,b)=>a.nombre.localeCompare(b.nombre));
                        return nombreAscendente;
                    case 2:
                        return arrayOrdenado.sort((a, b) => a.precio - b.precio);
                    case 3:
                        return arrayOrdenado.sort((a, b) => a.talle - b.talle);
                    default:
                        alert('No es un criterio válido');
                        break;
                }
            }

            function crearStringResultado(array){
                let info = '';
            
                array.forEach(elemento=>{
                    info += 'Prenda: ' + elemento.nombre + '\nColor: ' + elemento.color + '\nTalle: ' + elemento.talle + '\nEstampado: ' + elemento.estampado + '\nPrecio: '+ elemento.precio + '\n\n'
                })
            
                return info;
            }
            alert(crearStringResultado(ordenar(criterio, ropa)));
            opcion=parseInt(prompt('Ingrese una opción:  \n1 - Ingresar prenda. \n2 - Filtrar por criterio. \n3 - Eliminar última prenda.\n4 - Salir '));
            break;
        case 4:
            ropa.pop();
            break;  
        default:
            break;
    }
}

