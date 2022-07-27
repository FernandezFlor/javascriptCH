let numeroNotas = parseInt(prompt('Cuántas notas necesita promediar?'))
let nota=0;
let sumNota=0;
let prom;

while (nota<numeroNotas) {
    let n=parseInt(prompt('Ingrese la nota número '+(nota+1)))
    sumNota=sumNota+n
    nota=nota+1

}

prom=sumNota/numeroNotas

if (prom>=6) {
    alert("El alumno aprobo :)")
}else{
    alert("el alumno desaprobo :(")
}

