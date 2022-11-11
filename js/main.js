class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre; 
        this.precio = precio;
        this.img = img;
        this.cantidad = 1; 
    }
}

// Array con todos los productos
const productos = [
    {id: 1, nombre: "Cuadro de Halloween", precio: 2200, img: "../img/halloween.jpg", cantidad: 1},
    {id: 2, nombre: "Cuadro de Scream 1", precio: 2200, img: "../img/scream.jpg", cantidad: 1},
    {id: 3, nombre: "Cuadro de El Exorcista", precio: 2200, img: "../img/exorcista_3.jpg", cantidad: 1},
    {id: 4, nombre: "Cuadro de Alien", precio: 2200, img: "../img/alien.jpg", cantidad: 1},
    {id: 5, nombre: "Cuadro de Silent Hill 2", precio: 2200, img: "../img/sillent_hill_2.jpg", cantidad: 1},
    {id: 6, nombre: "Cuadro de Fatal Frame 2", precio: 2200, img: "../img/fatal_frame_2.jpg", cantidad: 1},
    {id: 7, nombre: "Cuadro de Saw 1", precio: 2200, img: "../img/saw_1.jpg", cantidad: 1},
    {id: 8, nombre: "Cuadro de The Quarry", precio: 2200, img: "../img/the_quarry.jpg", cantidad: 1},
    {id: 9, nombre: "Cuadro de Among The Sleep", precio: 2200, img: "../img/among_the_sleep.jpg", cantidad: 1},
    {id: 10, nombre: "Cuadro de Outlast", precio: 2200, img: "../img/outlast.jpg", cantidad: 1} 
];


// Array carrito 

let carrito = [];

// Localstorage //
if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const contenedor_productos = document.getElementById("contenedor_productos");

// Función para mostrar los productos 
const mostrarProductos = () => {
    productos.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                  <h5 class="card-title"> ${producto.nombre} </h5>
                  <p class="card-text"> ${producto.precio} </p>
                  <button class="btn colorBoton" id="boton${producto.id}"> Agregar al Carrito </button>
                </div>
            </div>
        `
        contenedor_productos.appendChild(card);
      
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id)
        })
    })
}

// Función agregar al carrito
const agregarAlCarrito = (id) => {
    const producto = productos.find((producto) => producto.id === id);
    const productoEnCarrito = carrito.find((producto) => producto.id === id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
    }else {
        carrito.push(producto);
        localStorage.setItem("carrito",JSON.stringify(carrito));
    }
    calcularTotal();
}

mostrarProductos();

// Mostrar carrito de compras

const contenedorCarrito = document.getElementById("contenedorCarrito");

const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
});

// Función mostrar carrito 
const mostrarCarrito = () => {
    contenedorCarrito.innerHTML="";
    carrito.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                <h5 class="card-title"> ${producto.nombre} </h5>
                <p class="card-text"> ${producto.precio} </p>
                <p class="card-text"> ${producto.cantidad} </p>
                <button class="btn colorBoton" id="eliminar${producto.id}"> Eliminar Producto </button>
                </div>
            </div>
        `
        contenedorCarrito.appendChild(card);

        //Eliminar productos del carrito: 
        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })
    })
    calcularTotal();
}

// Función eliminar producto
const eliminarDelCarrito = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Vaciar carrito
const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
    // Librería Sweetalert2
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: 'Estás seguro que querés vaciar el carrito?',
        text: "No se puede deshacer esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar todo!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Carrito vaciado!'
          )
          eliminarTodoElCarrito();
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
    
})

// Función eliminar todo el carrito

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();
    localStorage.clear();
}

const total = document.getElementById("total");
const calcularTotal = () => {
    let totalCompra = 0; 
    carrito.forEach((producto) => {
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = ` Total: $${totalCompra}`;
}
