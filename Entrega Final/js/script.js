//fetch
const fetchData = async () => {
  const res = await fetch('./js/data.json');
  const data = await res.json();
  mostrarCards(data)
}

fetchData();

const cards = document.getElementById('cards')
const items = document.getElementById('items')
const carritobtn = document.getElementById('carritobtn')
const templateCard = document.getElementById('template-card').content
const templateRopa = document.getElementById('template-ropa').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment();


let carrito = {}

// Eventos
cards.addEventListener('click', e => { addCarrito(e) });
items.addEventListener('click', e => { btnAumentarDisminuir(e) })
window.addEventListener('load',function(){

    traerDatos();
})

function traerDatos(){}

const mostrarCards = data => {
    
    data.forEach(item => {
        templateCard.querySelector('.titulo').innerHTML = item.Producto
        templateCard.querySelector('.precio').innerHTML = parseInt(item.Precio);
        templateCard.querySelector('button').dataset.Codigo = item.Codigo
        templateCard.querySelector('img').setAttribute("src",item.thumbnailUrl)
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}


// Agregar al carrito
const addCarrito = e => {
    
    e.target.classList.contains('btn-dark') && setCarrito(e.target.parentElement);
    e.stopPropagation()
}

const setCarrito = item => {
    const producto = {
        Producto: item.querySelector('h5').textContent,
        Precio: item.querySelector('p').textContent,
        Codigo: item.querySelector('button').dataset.Codigo,
        Cantidad: 1
    }

    //AND
    carrito.hasOwnProperty(producto.Codigo) && producto.Cantidad == carrito[producto.Codigo].Cantidad + 1
    //Spread
    carrito[producto.Codigo] = { ...producto }
    
    actualizarCarrito()
}

const actualizarCarrito = () => {
    items.innerHTML = ''

    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.Codigo
        templateCarrito.querySelectorAll('td')[0].textContent = producto.Producto
        templateCarrito.querySelectorAll('td')[1].textContent = producto.Cantidad
        templateCarrito.querySelector('span').textContent = producto.Precio * producto.Cantidad
        
        //botones
        templateCarrito.querySelector('.btn-info').dataset.Codigo = producto.Codigo
        templateCarrito.querySelector('.btn-danger').dataset.Codigo = producto.Codigo

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

}

const actualizarCarritobtn = () => {
    
    // sumar cantidad y precio
    const nCantidad = Object.values(carrito).reduce((acc, { Cantidad }) => acc + Cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {Cantidad, Precio}) => acc + Cantidad * precio ,0)

    templateRopa.querySelectorAll('td')[0].textContent = nCantidad
    templateRopa.querySelector('span').textContent = nPrecio

    const clone = templateRopa.cloneNode(true)
    fragment.appendChild(clone)

    carritobtn.appendChild(fragment)

}

const btnSwal= document.getElementById("comp");
const btnSwal2=document.getElementById("verc");
const btnVac=document.getElementById("vac");

//Finalizar compra
btnSwal.onclick = () => {
  //Carrito vacio    
  if(Object.keys(carrito).length===0){

    Swal.fire(

      {
        title:'Compra fallida!',
        text:'No seleccionaste ningun producto',
        icon:'error',
        confirmButtonText:'Ok!',
        position:'center'
      }
  ) 
  //carrito con productos
  }else{
    //se guardan datos en localstorage
    const compraAnt=localStorage.setItem("carrito", JSON.stringify(carrito));
    Swal.fire(

      {
        title:'Gracias por elegirnos!',
        text:'Compra finalizada',
        icon:'success',
        iconColor:'#81f40e',
        confirmButtonText:'Ok!',
        position:'center'
  
      }
    ) 
    //se vacia el carrito al finalizar compra    
    carrito = {}
    actualizarCarrito()
  }
  
}

// Ticket compra anterior
btnSwal2.onclick=()=>{
  
  let claves = Object.keys(localStorage);
        claves.forEach(clave => {
          let valor = localStorage.getItem(clave);
          valor= valor.replace(/[{}"]/g, '');
          valor= valor.replace(/[,]/g, '\n');
          const ticketcomp=("Ticket: última compra\n\n"+valor+"\n" );
          alert(ticketcomp);
          
        })

}

//Vaciar carrito
btnVac.onclick=()=>{
  carrito = {}
  actualizarCarrito()
}

//Sumar o restar prenda
const btnAumentarDisminuir = e => {
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.Codigo]
        producto.Cantidad++
        carrito[e.target.dataset.Codigo] = { ...producto }
        actualizarCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.Codigo]
        producto.Cantidad--
        
        //Operador ternario + spread
        producto.Cantidad===0? delete carrito[e.target.dataset.Codigo] : carrito[e.target.dataset.Codigo] = {...producto}

        actualizarCarrito()
    }
    e.stopPropagation()
}