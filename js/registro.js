const register = document.querySelector(".register"),
  
  userReg = document.querySelector("#registro_de_usuario"),
  passReg = document.querySelector("#registro_de_constraseña"),
  email = document.querySelector("#registro_de_email"),
  btnRegistrar = document.querySelector("#crear");


// Operador lógico "or"
const usuarios = JSON.parse(localStorage.getItem("usuario")) || []

// Constructor de usuario - Probar función constructora
class Usuario {
    constructor (usuario, password, email) {
        this.usuario = usuario;
        this.pass = password;
        this.email = email;
    }
 }

// Funciones
function limpiarCampos () {
    userReg.value = "";
    passReg.value = "";
    email.value = "";
}

function guardarUsuario (usuario) {
    // Código a ejecutar
    return usuarios.push (usuario)
}

function guardarEnStorage (elemento) {
    // Código a ejecutar
    return localStorage.setItem("usuarios", JSON.stringify(elemento)) // Lo convierto en string
}

btnRegistrar.addEventListener ("click", (e) =>{
    e.preventDefault();
    let newUser = new Usuario (
        userReg.value,
        passReg.value,
        email.value,
    );
    guardarUsuario (newUser);
    limpiarCampos ();
    guardarEnStorage (usuarios);
    console.log(usuarios);
});

// Con esto, el usuario queda guardado en el local Storage

