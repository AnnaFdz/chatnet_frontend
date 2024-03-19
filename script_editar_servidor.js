// console.log("outside servidor_id: ", localStorage.getItem("servidor_id"));
// console.log("outside nombre servidor: ", localStorage.getItem("nombre_servidor"));
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
    const editarServidorForm = document.getElementById("editar-servidor-form");

    if (editarServidorForm) {
        const nombre_servidor = localStorage.getItem("nombre_servidor");
        const servidor_id = localStorage.getItem("servidor_id");
        fetch(`http://127.0.0.1:5000/servidor/${nombre_servidor}`, {
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
                    // console.log(data.servidor);
                    const nombreServidorElement = document.getElementById("nombre_servidor");
                    const descripcionElement = document.getElementById("descripcion");
                    const imagenServidorElement = document.getElementById("imagen_servidor");

                    if (nombreServidorElement) {
                        nombreServidorElement.value = data.servidor.nombre_servidor;
                    }

                    if (descripcionElement) {
                        descripcionElement.value = data.servidor.descripcion || 'No hay descripcion disponible';
                    }

                    if (imagenServidorElement) {
                        imagenServidorElement.value= data.servidor.imagen_servidor;
                        imagenServidorElement.src = `http://127.0.0.1:5000/servidor/img`;
                        // imagenServidorElement.src = `http://127.0.0.1:5000/usuario/img`;
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

        editarServidorForm.addEventListener("submit", function (event) {
            event.preventDefault();
            console.log("servidor_id:", servidor_id);
            
            const nombre_servidor = document.getElementById("nombre_servidor");
            const descripcion = document.getElementById("descripcion");
            const imagen_servidor = document.getElementById("formFile");
            const imagenServidorElement = document.getElementById("imagen_servidor");

            if (nombre_servidor && descripcion && imagen_servidor) {
                const formData = new FormData();
                imgServidor = imagenServidorElement.value;
                formData.append("nombre_servidor", nombre_servidor.value);
                formData.append("descripcion", descripcion.value);
                formData.append("imagen_servidor", imagen_servidor.files[0]|| imgServidor);

                // const servidor_id = localStorage.getItem("servidor_id");

                fetch(`http://127.0.0.1:5000/servidor/update/${servidor_id}`, {
                    method: 'POST',
                    // headers: {
                    //     'Content-Type': 'application/json',
                    //     'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'
                    // },
                    
                    body: formData,
                   
                    credentials: 'include'
                })
                .then(response => {
                    if (response.status === 201) {
                        return response.json().then(data => {
                            alert(data.message);
                            window.location.href = `inicio.html`;
                        });
                    } else {
                        return response.json().then(data => {
                            document.getElementById("message").innerHTML = data.message;
                        });
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    document.getElementById("message").textContent = 'An error occurred while processing the request.';
                });
            } else {
                console.log("Some form elements do not exist.");
            }
        });
    } else {
        console.log("Edit server form not found.");
    }
});
// 