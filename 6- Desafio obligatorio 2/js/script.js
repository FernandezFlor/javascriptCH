let IVA=0.21;

function calcular() {
    
    //Obtenemos los valores del HTML
    const monto = document.querySelector("#monto").value;

    const cuotas = document.querySelector("#cuotas").value;


    //Determinamos los valores finales
    const montoIva = Number(monto) * Number(IVA);
    const montoTotal= Number(monto)+Number(montoIva)
    const precioCuota= Number(montoTotal)/Number(cuotas);
      
    //Mostramos valores de forma dinamica en <li>
    document.querySelector("#pCuota").innerHTML="Precio por cuota: $"+precioCuota
    document.querySelector("#pIVA").innerHTML="Precio IVA: $"+montoIva
    document.querySelector("#pTotal").innerHTML="Precio total: $"+montoTotal
    }  

