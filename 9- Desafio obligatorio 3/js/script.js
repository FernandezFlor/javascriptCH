const productos = [
    {
      precio: '500',
      id: 1,
      title: "Remera",
      thumbnailUrl: "https://picsum.photos/id/5/600"
    },
    {
      precio: 300,
        id: 2,
      title: "Pantalon",
      thumbnailUrl: "https://picsum.photos/id/9/600"
    },
    {
      precio: 100,
      id: 3,
      title: "Buzo",
      thumbnailUrl: "https://picsum.photos/id/20/600"
    },
    {
      precio: 50,
      id: 4,
      title: "Bufanda",
      thumbnailUrl: "https://picsum.photos/id/42/600"
    },
    {
      precio: 10,
      id: 5,
      title: "Polera",
      thumbnailUrl: "https://picsum.photos/id/25/600"
    },
    {
      precio: 150,
      id: 6,
      title: "Pollera",
      thumbnailUrl: "https://picsum.photos/id/21/600"
    }
  ];


const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()


let carrito = {}

// Eventos
cards.addEventListener('click', e => { addCarrito(e) });
items.addEventListener('click', e => { btnAumentarDisminuir(e) })
window.addEventListener('load',function(){

    traerDatos();
})
// Traer productos
function traerDatos(){
    pintarCards(productos)
}

const pintarCards = data => {
    
    data.forEach(item => {
        templateCard.querySelector('.titulo').innerHTML = item.title
        templateCard.querySelector('.precio').innerHTML = item.precio
        templateCard.querySelector('button').dataset.id = item.id
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
        title: item.querySelector('h5').textContent,
        precio: item.querySelector('p').textContent,
        id: item.querySelector('button').dataset.id,
        cantidad: 1
    }

    //AND
    carrito.hasOwnProperty(producto.id) && producto.cantidad == carrito[producto.id].cantidad + 1
    //Spread
    carrito[producto.id] = { ...producto }
    
    pintarCarrito()
}

const pintarCarrito = () => {
    items.innerHTML = ''

    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('span').textContent = producto.precio * producto.cantidad
        
        //botones
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

}


console.log(Object.keys(carrito).length)


const pintarFooter = () => {
    footer.innerHTML = 'asd'
    
    
    if (Object.keys(carrito).length === 0) {
      footer.innerHTML = `
      <th scope="row" colspan="5">Carrito vacío con innerHTML</th>
      `
      return
    }
    
    
    // sumar cantidad y sumar totales
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })

}


// aiuda ;-;


const btnSwal= document.getElementById("comp");

btnSwal.onclick = () => {
  if(Object.keys(carrito).length===0){

    Swal.fire(

      {
        title:'Compra fallida!',
        text:'No seleccionaste ningun producto',
        icon:'error',
        confirmButtonText:'Ok!',
        position:'top-center'
      }
  ) 

  }else{
    Swal.fire(

      {
        title:'Gracias por elegirnos!',
        text:'Compra finalizada',
        icon:'success',
        iconColor:'#81f40e',
        confirmButtonText:'Ok!',
        position:'top-center'
  
      }
    ) 
  }
  
}
/*if(Object.keys(carrito).length===0){
  document.getElementById("comp").addEventListener("click", asdd)
}else{
  document.getElementById("comp").addEventListener("click", popeye)
}


function asdd(){
  Swal.fire(
    'Compra finalizada!',
    'Gracias por elegirnos!',
    'Aceptar'
  )
}


function popeye(){
  Swal.fire(
    'Compra finalizakjbghjggda!',
    'Gracias por elegirnos!',
    'Aceptar'
  )
}*/

const btnAumentarDisminuir = e => {
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = { ...producto }
        pintarCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        
        //Operador ternario + spread
        producto.cantidad===0? delete carrito[e.target.dataset.id] : carrito[e.target.dataset.id] = {...producto}

        pintarCarrito()
    }
    e.stopPropagation()
}