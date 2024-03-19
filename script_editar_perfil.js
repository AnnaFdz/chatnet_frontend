
console.log("id: ", localStorage.getItem("id_usuario")); // Verifica si el valor se estableció correctamente
console.log("email: ", localStorage.getItem("email"));
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
document.addEventListener('DOMContentLoaded', function () {
    const editarForm = document.getElementById("editar-form");
    // console.log(editarForm);
    if (editarForm) {
        // Fetch informacion preexistente del usuario
        const usuario_id = localStorage.getItem("id_usuario");
        fetch("http://127.0.0.1:5000/usuario/profile", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'
            },
            credentials: 'include'
        })
        .then(response => {
            // if (response.status === 200 || response.status === 304) {
            if (response.ok) {
                return response.json().then(data => {
                    const usernameElement = document.getElementById("username");
                    const emailElement = document.getElementById("email");
                    const nombreCompletoElement = document.getElementById("nombre_completo");
                    const imagenDePerfilElement = document.getElementById("imagen_de_perfil");
    
                    if (usernameElement) {
                        usernameElement.value = data.username;
                    }
    
                    if (emailElement) {
                        emailElement.value = data.email;
                    }
    
                    if (nombreCompletoElement) {
                        nombreCompletoElement.value = data.nombre_completo;
                    }
    
                    if (imagenDePerfilElement) {
                        imagenDePerfilElement.value = data.imagen_de_perfil;
                       
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


        editarForm.addEventListener("submit", function (event) {
            event.preventDefault();
            
            const username = document.getElementById("username");
            const email = document.getElementById("email");
            const nombre_completo = document.getElementById("nombre_completo");
            const password = document.getElementById("password");
            const imagen_de_perfil = document.getElementById("formFile");
            const imagenDePerfilElement = document.getElementById("imagen_de_perfil");

            if (username && email && nombre_completo && password && imagen_de_perfil) {
                const formData = new FormData();
                imgPerfil=imagenDePerfilElement.value;
                // console.log(imgPerfil);
                formData.append("username", username.value);
                formData.append("email", email.value);
                formData.append("nombre_completo", nombre_completo.value);
                formData.append("password", password.value);
                formData.append("imagen_de_perfil", imagen_de_perfil.files[0]||imgPerfil);

                const usuario_id = localStorage.getItem("id_usuario");

                fetch(`http://127.0.0.1:5000/usuario/update/${usuario_id}`, {
                    method: 'POST',
                    // headers: {
                    //     'Content-Type': 'application/json',
                    //     'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'
                    //     // 'Access-Control-Allow-Origin': '*'
                    // },
                    body: formData,
                    credentials: 'include'
                })
                .then(response => {
                    if (response.status === 201) {
                        return response.json().then(data => {
                            alert(data.message);
                            window.location.href = `profile.html`;
                        });
                    } else {
                        return response.json().then(data => {
                            document.getElementById("message").innerHTML = data.message;
                        });
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    document.getElementById("message").textContent = 'Ocurrió un error al procesar la solicitud.';
                });
            } else {
                console.log("Algunos elementos del formulario no existen.");
            }
        });
    } else {
        console.log("Formulario de edición no encontrado.");
    }
});