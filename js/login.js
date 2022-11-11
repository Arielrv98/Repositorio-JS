// Variables
const user = document.querySelector ("#nombreusuario"),
   pass = document.querySelector ("#passusuario"),
   btn = document.querySelector ("#ingresar");



// Funciones
function inicioSesion(usuarios) {
// Código de sesión
let userFound = usuarios.find((usuario) => { // Método de filtrado
    return usuario.usuario === user.value && usuario.pass === pass.value
})

if (userFound) {
    window.location.href = "../index.html"
} else {
    document.querySelector("#mensaje").innerText = "Usuario no registrado"
}
return userFound;
}

// Recuperamos los datos del Local Storage
function recuperarLS () {
    let datos = JSON.parse (localStorage.getItem ("usuarios"));
    return datos;
}

const usuariosLS = recuperarLS ();

btn.addEventListener ("click", (e) => {
    // Código a ejecutar
    e.preventDefault();
    inicioSesion(usuariosLS) 
});