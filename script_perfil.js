window.addEventListener('load', function () {
    getProfile();
});
// Agrega el event listener para la opción "Mi Perfil"
document.getElementById("miPerfil").addEventListener("click", function () {
    // Redirige a la página de perfil del usuario actual
    // const usuario_id = 1; // Cambia esto al ID del usuario actual
    window.location.href = `profile.html`; // Cambia la URL según tu ruta de perfil
});
// Agrega el event listener para la opción "Logout"
document.getElementById("logout").addEventListener("click", logout);
function logout() {
    const url = "http://127.0.0.1:5000/usuario/logout";
    
    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                window.location.href = "index.html";
            });
        } else {
            return response.json().then(data => {
                document.getElementById("message").innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        document.getElementById("message").innerHTML = "An error occurred.";
    });
}
// Agrega el event listener para la opción "Editar Perfil"
document.getElementById("editarPerfil").addEventListener("click", function () {
 
    window.location.href = `editar_perfil.html`; // Cambia la URL según tu ruta de edición de perfil
});
function getProfile() {
    const url = "http://127.0.0.1:5000/usuario/profile";

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'
        },
        credentials: 'include'
    })
    .then(response => {
        if (response.ok) {

            return response.json().then(data => {
                const usernameElement = document.getElementById("username");
                const emailElement = document.getElementById("email");
                const nombreCompletoElement = document.getElementById("nombre_completo");
                const imagenDePerfilElement = document.getElementById("imagen_de_perfil");

                if (usernameElement) {
                    usernameElement.innerText = data.username;
                }

                if (emailElement) {
                    emailElement.innerText = data.email;
                }

                if (nombreCompletoElement) {
                    nombreCompletoElement.innerText = data.nombre_completo;
                }

                if (imagenDePerfilElement) {
                    imagenDePerfilElement.src = "http://127.0.0.1:5000/usuario/img";
                }
            });
        } else {
            return response.json().then(data => {
                const messageElement = document.getElementById("message");
                if (messageElement) {
                    messageElement.innerHTML = data.message;
                }
            });
        }
    })
    .catch(error => {
        const messageElement = document.getElementById("message");
        if (messageElement) {
            messageElement.innerHTML = "An error occurred: " + error;
        }
    });
}