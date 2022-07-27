let numeroProductos = parseInt(prompt('Cuantros productos desea llevar?'));
let producto=0;
let sumPrecios=0;
const IVA = x=>x*0.21;
const precioCuota = (a, b) => a / b;
while(producto<numeroProductos){
    let n=parseInt(prompt('Ingrese el precio del producto número '+(producto+1)));
    sumPrecios=sumPrecios+n;
    producto=producto+1;
}

let precioTotal=sumPrecios+IVA(sumPrecios);
let cuotas;
cuotas=parseInt(prompt('En cuantas cuotas desea pagar?'));

if(precioTotal>5000){
    precioTotal=precioTotal-500;
    alert('Como tu compra es superior a $5000 ganaste un descuento de $500, teniendo que pagar '+cuotas+" cuotas: de $"+precioCuota(precioTotal,cuotas)+", siendo el precio total de: $"+precioTotal);
}else{
    alert("Tenes que pagar "+cuotas+" cuotas de: $"+precioCuota(precioTotal,cuotas)+", siendo el precio total de: $"+precioTotal);
}





