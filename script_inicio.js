
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

// Agrega el event listener para la opción "Editar Perfil"
document.getElementById("editarPerfil").addEventListener("click", function () {
    // Redirige a la página de edición de perfil del usuario actual
    // const usuario_id = 1; // Cambia esto al ID del usuario actual
    // usuario = JSON.parse(localStorage.getItem("usuario"));
    // const usuario_id = usuario.usuario_id;
    window.location.href = `editar_perfil.html`; // Cambia la URL según tu ruta de edición de perfil
});


// function getProfile() {
//     const url = "http://127.0.0.1:5000/usuario/profile";

//     fetch(url, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             // 'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'
//         },
//         credentials: 'include'
//     })
//     .then(response => {
//         if (response.ok) {

//             return response.json().then(data => {
//                 const usernameElement = document.getElementById("username");
//                 const emailElement = document.getElementById("email");
//                 const nombreCompletoElement = document.getElementById("nombre_completo");
//                 const imagenDePerfilElement = document.getElementById("imagen_de_perfil");

//                 if (usernameElement) {
//                     usernameElement.innerText = data.username;
//                 }

//                 if (emailElement) {
//                     emailElement.innerText = data.email;
//                 }

//                 if (nombreCompletoElement) {
//                     nombreCompletoElement.innerText = data.nombre_completo;
//                 }

//                 if (imagenDePerfilElement) {
//                     imagenDePerfilElement.src = "http://127.0.0.1:5000/usuario/img";
//                 }
//             });
//         } else {
//             return response.json().then(data => {
//                 const messageElement = document.getElementById("message");
//                 if (messageElement) {
//                     messageElement.innerHTML = data.message;
//                 }
//             });
//         }
//     })
//     .catch(error => {
//         const messageElement = document.getElementById("message");
//         if (messageElement) {
//             messageElement.innerHTML = "An error occurred: " + error;
//         }
//     });
// }


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

// localStorage.setItem("usuario", JSON.stringify(usuario));

console.log("id: ", localStorage.getItem("id_usuario")); // Verifica si el valor se estableció correctamente
console.log("email: ", localStorage.getItem("email"));

// console.log("server id: ", localStorage.getItem("servidor_id")); // Verifica si el valor se estableció correctamente
// console.log("nombre servidor: ", localStorage.getItem("nombre_servidor"));
window.addEventListener('load', function () {
    // Fetch and display user's servers
    getServersXUsers();



    const crearServidorBtn = document.getElementById('crear-servidor');
    const modal = document.getElementById('crearServidorModal');
    
    const closeModalBtn = document.getElementById('closeModal1');
    const confirmServerBtn = document.getElementById('confirmServer');
    const nombre_servidorInput = document.getElementById('nombre_servidor');
    
    const messageDiv = document.getElementById('messageCrear');
    
    crearServidorBtn.addEventListener('click', function () {
        // Show the modal
        modal.style.display = 'flex';
    });

    closeModalBtn.addEventListener('click', function () {
        
        // Close the modal
        console.log('Close button clicked1');
        modal.style.display = 'none';
        
        
    });

    confirmServerBtn.addEventListener('click', function () {
        // Get the server name from the input
        const newServerName = nombre_servidorInput.value;

        // Check if the input is not empty
        if (newServerName.trim() !== '') {
            // Call a function to handle the creation of a new server
            createServer(newServerName);

            // Clear the input and close the modal
            nombre_servidorInput.value = '';
            modal.style.display = 'none';
        }else{
            messageDiv.textContent = 'Por favor ingresa un nombre para el servidor.';
        
        }
    });


    function getServersXUsers() {
        fetch("http://127.0.0.1:5000/servidor/usuario_servidor", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'
            },
            credentials: 'include'
        })
        .then(response => {
            if (response.ok) {
                return response.json().then(data1 => {
                    //si el usuario esta vinculado a otro/s servidores
                    const listaServidores = document.getElementById('lista-servidores');
                    listaServidores.innerHTML = '';
                    
                    
                    if (data1.length > 0) {
                        let selectedServer = null;
                        
                        for (const servidor of data1) {
                            // localStorage.setItem("servidor_id", servidor.servidor_id);
                            // localStorage.setItem("nombre_servidor", servidor.nombre_servidor);
                            // console.log("server id: ", localStorage.getItem("servidor_id")); // Verifica si el valor se estableció correctamente
                            // console.log("nombre servidor: ", localStorage.getItem("nombre_servidor"));
                            
                            const servElement = document.createElement('div');
                            servElement.classList.add('sxuc');
                            servElement.dataset.nombreServidor = servidor.nombre_servidor;

                            const imgElement = document.createElement('img');
                            
                            //imgElement.src = "icons\\icon server.png";
                            // imgElement.src = "http://127.0.0.1:5000/servidor/img";
                            imgElement.src =`http://127.0.0.1:5000/servidor/imgserv/${servidor.nombre_servidor}`||"icons\\icon server.png";
                            
                            imgElement.alt = servidor.nombre_servidor;
                            imgElement.title = servidor.descripcion;
                            imgElement.classList.add('icon_server');
                            const spanElement = document.createElement('span');
                            spanElement.textContent = servidor.nombre_servidor;
                            spanElement.classList.add('nombre_servidor');
                            const spanIcon = document.createElement('img');
                            spanIcon.src ="icons\\settings.png";
                            spanIcon.classList.add('icon_settings');
                            servElement.appendChild(imgElement);
                            servElement.appendChild(spanIcon);
                            servElement.appendChild(spanElement);
                              // Add click event listener to each server element
                            imgElement.addEventListener('click', () => {
                               
                                const msjs = document.getElementById('canal_mensajes');
                                msjs.style.display ='none';
                                // Remove border from previously selected server
                                if (selectedServer !== null) {
                                    selectedServer.classList.remove('selected');
                                }

                                // Add border to the clicked server
                                servElement.classList.add('selected');

                                // Set the selected server
                                selectedServer = servElement;
                                


                                getCanales(servidor.servidor_id);


                            });
                            
                             // Add click event listener to each server element
                            spanIcon.addEventListener('click', () => {
                                // Retrieve data from the clicked server element
                                const nombreServidor = servElement.dataset.nombreServidor;
    
                                // Perform actions based on the server data
                                // console.log("Clicked Nombre Servidor:", nombreServidor);
    
                                // Call a function to display server information
                                //displayServerInformation({ nombreServidor });
                               getServerInformation(nombreServidor)
                            });
                            listaServidores.appendChild(servElement);
                        }
                        
                    } else {
                        
                        // Muestra si no se ha unido a un servidor
                        const messageElement = document.createElement('span');
                        messageElement.classList.add('message');
                        messageElement.textContent = 'Aún no te has unido a un servidor.';
                        listaServidores.appendChild(messageElement);
                    }
                })
            } else {
                return response.json().then(data1 => {
                    console.log(data1.message);
                })
            }
        })
        .catch(error => {
            console.log("An error occurred.")
        })
    }

});

document.addEventListener('DOMContentLoaded', function () {
    // ... Other code ...

    const crearServidorBtn = document.getElementById('crear-servidor');
    const modal = document.getElementById('crearServidorModal');
   
    const closeModalBtn = document.getElementById('closeModal1');
    const confirmServerBtn = document.getElementById('confirmServer');
    const serverNameInput = document.getElementById('nombre_servidor');
    const descripcionInput = document.getElementById('descripcion');
    const listaServidores = document.getElementById('lista-servidores');
    const messageDiv = document.getElementById('messageCrear');
    

    crearServidorBtn.addEventListener('click', function () {
        // muestra modal
        modal.style.display = 'flex';
    });
    
    
    
    closeModalBtn.addEventListener('click', function () {
        console.log('Close button clicked2');
        // Cierra modal
        modal.style.display = 'none';
        
       
    });

    confirmServerBtn.addEventListener('click', function () {
        // trae el nombre del servidor del input
        const newServerName = serverNameInput.value;
        const newServerDescripcion = descripcionInput.value;

        // ve q el input no este vacio
        if (newServerName.trim() !== '') {
            // llama a la funcion para crear el nuevo servidor
            //createServer(newServerName);
            createServer(newServerName, newServerDescripcion);

            // Limpia los input y cierra el modal
            serverNameInput.value = '';
            descripcionInput.value = '';
            modal.style.display = 'none';
        }
    });
//funcion q agrega el nombre del nuevo server a la lista de servers pero no impacta en el backend
//     function createServer(serverName) {
//         // Create a new server element
//         const newServer = document.createElement('li');
//         newServer.textContent = serverName;

//         // Append the new server to the list of servers
//         listaServidores.appendChild(newServer);
//     }
// });
function createServer(nombre_servidor, descripcion) {
    // console.log(nombre_servidor, descripcion);
    const dataCrearServer = {
        nombre_servidor: nombre_servidor,
        descripcion: descripcion
        
    };
  

    fetch('http://127.0.0.1:5000/servidor/crear', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'
            // 'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(dataCrearServer),
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 201) {
            return response.json().then(dataCrearServer => {
                alert(dataCrearServer.message);
                const servElement = document.createElement('div');
                servElement.classList.add('sxuc');
                servElement.dataset.nombre_servidor = nombre_servidor;  // Use the server name
                const imgElement = document.createElement('img');
                // imgElement.src = "http://127.0.0.1:5000/servidor/img";
                imgElement.src =`http://127.0.0.1:5000/servidor/imgserv/${nombre_servidor}`;
                imgElement.alt = nombre_servidor;  
                imgElement.title = descripcion;    
                imgElement.classList.add('icon_server');
                const spanElement = document.createElement('span');
                spanElement.textContent = nombre_servidor;  
                spanElement.classList.add('nombre_servidor');
                servElement.appendChild(imgElement);
                servElement.appendChild(spanElement);
                listaServidores.appendChild(servElement);
                //lleva ala funcion      hace q sea clickeable el servidor creado para mostrar su info
                //no es necesario
                // addClickEventToServer(servElement);
            });
        } else {
            return response.json().then(dataCrearServer => {
                console.error('Error creating server:', dataCrearServer.message);
                // Handle the error as needed, e.g., display an error message to the user
            });
        }
    })
    .catch(error => {
        console.error('Error creating server:', error);
        // Handle the error as needed, e.g., display an error message to the user
    });
}

});
//funcion para agregar la funcionalidad de click al servidor creado, para mostrar su info|| no es necesario
// function addClickEventToServer(serverElement) {
//     serverElement.addEventListener('click', function () {
//         const nombre_servidor = serverElement.dataset.nombre_servidor;
        
//         getServerInformation(nombre_servidor);
//     });
// }

function getServerInformation(nombre_servidor) {
    fetch(`http://127.0.0.1:5000/servidor/${nombre_servidor}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'
        },
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(serverInfo => {
                // console.log('Server Information getServerI:', serverInfo);
                // Call the displayServerInformation function with the retrieved serverInfo
                displayServerInformation(serverInfo);
            });
        } else {
            return response.json().then(data => {
                console.error('Error fetching server information:', data.message);
            });
        }
    })
    .catch(error => {
        console.error('Error fetching server information:', error);
    });
}


function displayServerInformation(serverInfo) {
    // console.log('Server Information:', serverInfo);

  

     // extrae informacion relevante
     const servidor = serverInfo.servidor;
     const allUsersData = serverInfo.allUsers[0];
 
     // remplaza'creador_id' por 'creador_username'
     const replaceCreadorUsername = (server) => {
         const creadorId = server.creador_id;
 
         // Usa allUsersData para encontrar al usuario creador
         const creador = allUsersData.find(usuario => usuario.usuario_id === creadorId);
 
         if (creador) {
             return { ...server, creador_username: creador.username };
         }
         return server;
     };
 
     // aplica la funcion al servidor
     const updatedServer = replaceCreadorUsername(servidor);
     
    // Actualiza el contenido del modal 
    document.getElementById('serverName').textContent = `Nombre: ${updatedServer.nombre_servidor}`;
    
    
    document.getElementById('serverDescription').textContent = `Descripción: ${updatedServer.descripcion || 'No hay descripción disponible'}`;
    document.getElementById('creadorId').textContent = `Creador :  ${updatedServer.creador_username}`;
  
    // Actualiza la imagen del servidor
    localStorage.setItem('servidor_id', updatedServer.servidor_id);
    localStorage.setItem('nombre_servidor', updatedServer.nombre_servidor);
    const nombre_servidor = localStorage.getItem('nombre_servidor');
    const serverImageElement = document.getElementById('serverImage');
    serverImageElement.src =`http://127.0.0.1:5000/servidor/imgserv/${nombre_servidor}`; 
   
    document.getElementById("editarServidor").addEventListener("click", function () {
        
        
        window.location.href = `editar_server.html`; // Cambia la URL según tu ruta de edición de perfil
    });
    // Abre modal
    const modal = M.Modal.getInstance(document.getElementById('serverModal'));
    modal.open();
}


document.addEventListener('DOMContentLoaded', function () {
    
    const iconBuscar = document.getElementById('icon-buscar');
    
    iconBuscar.addEventListener('click', function () {
        
        displaySearchServer();
        
    });
       


function displaySearchServer() {
   
    // Abre modal
    const modalS = M.Modal.getInstance(document.getElementById('search-container'));
    modalS.open();
    const closeModalBtn = document.getElementById('closeModal');
    closeModalBtn.addEventListener('click', function () {
        const searchResultsContainer = document.querySelector('.searchResultsContainer');
            //Limpia la busqueda
        searchResultsContainer.innerHTML = '';
        // Cierra  modal
        modalS.close();
        // modal.style.display = 'none';
        
    });
    const mostrarTodosBtn = document.getElementById('mostrar-todos');
    mostrarTodosBtn.addEventListener('click', function () {
        
        fetchAllServers()
            .then((servers) => {
                //console.log("servers fetch all in", servers)
                // Limpia la busqueda
                const searchResultsContainer = document.querySelector('.searchResultsContainer');
                // console.log('Container Element:', searchResultsContainer);
                searchResultsContainer.innerHTML = '';

                // agrega cada servidor ak container
                servers.forEach((server) => {
                    // console.log("for each  server");
                    // const serverElement = createServerElement(server);
                    const serverElement = document.createElement('div');
                    const serverName = document.createElement('p');
                    serverName.textContent = server.nombre_servidor;

                    const serverImage = document.createElement('img');
                    serverImage.src = `http://127.0.0.1:5000/servidor/imgserv/${server.nombre_servidor}`;
                    serverImage.alt = server.nombre_servidor;
                    serverImage.title= server.nombre_servidor;
                    serverImage.classList.add('icon_settings');

                    serverElement.appendChild(serverName);
                    serverElement.appendChild(serverImage);
                    serverElement.classList.add('server-element');
                    serverImage.addEventListener('click', () => {
                        const modalS = M.Modal.getInstance(document.getElementById('search-container'));
                        
                        searchInput.value = server.nombre_servidor; 
                            searchServer();
                                       
                            searchInput.value = '';
                            modalS.close();
                        
                    //     const nombreServidor = server.nombre_servidor;

                    //    getServerInformation(nombreServidor)
                    });
                    searchResultsContainer.appendChild(serverElement);
                });
            })
            .catch((error) => {
                console.error('Error fetching servers:', error);
            });
    });

    document.getElementById("searchInput").addEventListener("keypress", function(event) {
        const modalS = M.Modal.getInstance(document.getElementById('search-container'));
        if (event.key === "Enter") {
            event.preventDefault();
            
            searchServer();
            searchInput.value = '';            
            modalS.close();
        }
       
    });
    
    }

function fetchAllServers() {
    return  fetch("http://127.0.0.1:5000/servidor/servidores", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'
        },
        credentials: 'include'
    })
        .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log("feach all servers data",data);
        
        return data || [];
    })
    .catch((error) => {
        console.error('Error fetching servers:', error);
        return [];
    });
    
}


});

function searchServer() {
    const nombre_servidor = document.getElementById("searchInput").value;

    fetch(`http://127.0.0.1:5000/servidor/buscar/${nombre_servidor}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'
        },
        credentials: 'include'
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.error('Server returned an error:', response.status);
            throw new Error('Server error');
        }
    })
    .then(data => {
        // console.log('Server data:', data);
        // remplaza 'creador_id' por 'creador_username'
        const replaceCreadorUsername = (server) => {
            
            const allUsersData = data.allUsers[0];
        
            // console.log('server re place', server);
            const creadorId = server.creador_id;
            // console.log('creadorId', creadorId);
            
            // Use allUsersData to find the user
            const creador = allUsersData.find(usuario => usuario.usuario_id === creadorId);
            // console.log('creador', creador);
        
            if (creador) {
                return { ...server, creador_username: creador.username };
            }
            return server;
        };
        
        // aplica la funcion a cada server del array servodores
        const updatedServidores = data.servidores.map(replaceCreadorUsername);
        
        // Replaza servidores original con el actualizado
        data.servidores = updatedServidores;
        // console.log('data servidores', data.servidores);
        
        const modalContent = document.getElementById("modalBusqueda");
        modalContent.innerHTML = ''; // limpia

        if (data.servidores.length > 0) {
            const ulUsers = document.createElement('ul');
            data.servidores.forEach(servidor => {
                const servElement = document.createElement('div');
                servElement.classList.add('sxuc');
                const imgElement = document.createElement('img');
                imgElement.src = `http://127.0.0.1:5000/servidor/imgserv/${servidor.nombre_servidor}`;
                imgElement.alt = servidor.nombre_servidor;
                imgElement.classList.add('icon');
                const spanElement = document.createElement('span');
                spanElement.textContent = `Nombre del Servidor: ${servidor.nombre_servidor}`;
                spanElement.classList.add('nombre_servidor');
                const spanDescription = document.createElement('span');
                spanDescription.textContent = `Descripcion: ${servidor.descripcion}` || 'No hay descripcion disponible';
                spanDescription.classList.add('descripcion');
                const spanCreador = document.createElement('span');
                spanCreador.textContent = `Creador: ${servidor.creador_username}`; 
                spanCreador.classList.add('creador_id');

                const liUsers = document.createElement('li');
                const spanUsers = document.createElement('span');
                spanUsers.textContent = `Usuarios vinculados: ${data.num_users.length}`; 
                spanUsers.classList.add('num_users');
                liUsers.appendChild(spanUsers);
                ulUsers.appendChild(liUsers);
                const imgAdd = document.createElement('img');
                imgAdd.src = 'icons//add server.png';
                imgAdd.alt = 'unirse a servidor';
                imgAdd.title = 'unirse a servidor';
                imgAdd.classList.add('icon_settings');

                servElement.appendChild(imgElement);
                servElement.appendChild(spanElement);
                servElement.appendChild(spanDescription);
                servElement.appendChild(spanCreador);

                servElement.appendChild(ulUsers);
                servElement.appendChild(imgAdd);
                imgAdd.addEventListener('click', () => {

                    // console.log('Clicked "unirse a servidor" button');
                    const modalJoin =document.getElementById("modalJoin");
                    // console.log('modalJoin:', modalJoin); 
                    modalJoin.style.display = "flex";
                    
                    });
                    document.getElementById("messageAdd").innerHTML = `Quieres unirte a ${servidor.nombre_servidor}?`;
                    document.getElementById("accept").addEventListener('click',() => {
                        console.log('Clicked "accept" button in modal');
                        fetch("http://127.0.0.1:5000/servidor/usuario_servidor", {

                            method: "GET",
                            credentials: 'include'
                        })
                        .then(response => {
                            if (response.status === 200) {
                                return response.json().then(data3 => {
                                    const exist = registered(data3, servidor.nombre_servidor);
                                    if (data3.length === 0 || exist === false) {
                                        registeruxs(servidor.nombre_servidor);
                                        
                                    } else {
                                        document.getElementById("messageAdd").innerHTML = 'Ya esta unido a este servidor';
                                    }
                                })
                            } else {
                                return response.json().then(data3 => {
                                    document.getElementById("messageAdd").innerHTML = data3.message;
                                });
                            }
                        })
                        .catch(error => {
                            document.getElementById("messageAdd").innerHTML = "An error occurred."+error;
                        })
                    })
                    const closeModalBtn = document.getElementById('closeModal3');
                    closeModalBtn.addEventListener('click', () => {
                        modalJoin.style.display = 'none';
                });
                modalContent.appendChild(servElement);
            });
           
               
                                   
        } else {
            const spanElement = document.createElement('span');
            spanElement.classList.add('message');
            spanElement.textContent = 'No se encontraron coincidencias de búsqueda';
            modalContent.appendChild(spanElement);
        }

        
            const searchModal = document.getElementById("searchModal");
            
            searchModal.style.display = "block";
            const closeModalBtn = document.getElementById('closeModal2');
            
            closeModalBtn.addEventListener('click', function () {
                // Cierra modal
                // console.log('Close button clicked3');
                searchModal.style.display = 'none';
            });
    })
    .catch(error => {
        console.error('Error during fetch:', error);
    });
}
function registered(list, name) {
    for (datos of list) {
        if (datos.nombre_servidor === name) {
            return true
        }
    }
    return false
}
function registeruxs(nombre_servidor) {
  
    const data4 = {
        nombre_servidor: nombre_servidor,
    }
    console.log(data4);
    fetch("http://127.0.0.1:5000/servidor/usuario_servidor", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'
        },
        body: JSON.stringify(data4),
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 201) {
            console.log(data4);
            getServerInformation(data4.nombre_servidor);
        } else {
            return response.json().then(data4 => {
                console.log(data4.message);
            });
        }
    })
    .catch(error => {
        console.log("An error occurred." + error);
    });
}
function getCanales(servidor_id) {
    fetch(`http://127.0.0.1:5000/canal/canales/${servidor_id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'
        },
        credentials: 'include'
    })
    .then(response => {
        if (response.ok) {
            return response.json().then(datac => {
                // console.log("DataC:", datac)
                const listaCanales = document.getElementById('lista-canales');
                const messageC= document.getElementById('messageC');
                messageC.textContent = '';
                listaCanales.innerHTML = '';
                const crearCanal = document.getElementById('crear-canal');
                crearCanal.style.display = "block";
                crearCanal.addEventListener('click', () => {
                    const modalCreate = document.getElementById("createChannelModal");
                    modalCreate.style.display = "flex";
                    const messageDivC = document.getElementById('messageCrearC');
                    const closeModalBtn = document.getElementById('closeModal4');
                    const confirmCanalBtn = document.getElementById('confirmCanal');
                    const canalNameInput = document.getElementById('nombre_canal');
                    const descripcionInput = document.getElementById('descripcion');
                    confirmCanalBtn.addEventListener('click', function () {
                       // trae el nombre del canal del input
                        const newCanalName = canalNameInput.value;
                        const newCanalDescripcion = descripcionInput.value;
                
                        // ve q el input no este vacio
                        if (newCanalName.trim() !== '') {
                            // llama a la funcion para crear el nuevo canal
                            // console.log('newCanalName:', newCanalName);
                            // console.log('newCanalDescripcion:', newCanalDescripcion);
                            createCanal(newCanalName, newCanalDescripcion, servidor_id);
                
                            // Limpia los input y cierra el modal
                            canalNameInput.value = '';
                            descripcionInput.value = '';
                            modalCreate.style.display = 'none';
                        }else{
                            messageDivC.textContent = 'Por favor ingresa un nombre para el canal.';
                        
                        }
                    });
                    closeModalBtn.addEventListener('click', function () {
                        // Cierra modal
                        // console.log('Close button clicked3');
                        modalCreate.style.display = 'none';
                    });
                    
                });
                if (datac.length > 0) {
                    let selectedChannelId = null;
                    for (const canales of datac) {
                      
                        const canElement = document.createElement('div');
                        canElement.classList.add('canal');
                        canElement.dataset.canalId = canales.canal_id;

                        
                        
                        const cElement = document.createElement('a');
                        cElement.textContent = canales.nombre_canal;
                        cElement.title = canales.descripcion;
                        cElement.id = canales.nombre_canal;
                        cElement.classList.add('canal');
                        
                        cElement.addEventListener('click', () => {
                            const canalId = canales.canal_id;
                              // Remove border from previously selected channel
                              if (selectedChannelId !== null) {
                                const prevSelectedChannel = document.querySelector(`[data-canal-id="${selectedChannelId}"] a`);
                                prevSelectedChannel.style.border = 'none';
                            }

                            // Add border to the clicked channel
                            cElement.style.border = '2px solid  #dc7f5f';
                            cElement.style.borderRadius = '5px';

                            // Set the selected channel ID
                            selectedChannelId = canalId;
                            localStorage.setItem("canal_id", canales.canal_id);
                            
                            // Perform actions based on the channel ID
                            
                            getMensajes(canalId);
                        });
                        canElement.appendChild(cElement);
                        
                        listaCanales.appendChild(canElement);
                    }
                    
                } else {
                    // Muestra si no hay canales
                   
                    
                    const messageElement = document.createElement('span');
                    messageElement.classList.add('message');
                    messageElement.textContent = 'Aún no has creado ningun canal.';
                    messageC.appendChild(messageElement);
                }
            })
        } else {
            return response.json().then(datac => {
                console.log(datac.message);
                const messageC = document.getElementById('messageC');
                messageC.textContent = datac.message;
            })
        }
    })
    .catch(error => {
        console.log("An error occurred.")
    })
}

function createCanal(nombre_canal, descripcion, servidor_id) {
    console.log(nombre_canal, descripcion, servidor_id);
    const dataCrearCanal = {
        nombre_canal: nombre_canal,
        descripcion: descripcion,
        servidor_id: servidor_id
    }; 
  

    fetch('http://127.0.0.1:5000/canal/crear', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'
            // 'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(dataCrearCanal),
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 201) {
            return response.json().then(dataCrearCanal => {
                alert(dataCrearCanal.message);
                const mensajC = document.getElementById('messageC');
                mensajC.textContent = dataCrearCanal.message;
                const listaCanales = document.getElementById('lista-canales');
                const canElement = document.createElement('div');
                canElement.classList.add('canal');
                canElement.dataset.servidor_id = dataCrearCanal.servidor_id;

                
                
                const aElement = document.createElement('a');
                aElement.textContent = dataCrearCanal.nombre_canal;
                aElement.title = dataCrearCanal.descripcion;
                aElement.id = dataCrearCanal.nombre_canal;
                aElement.classList.add('canal');
                canElement.appendChild(aElement);
                        
                listaCanales.appendChild(canElement);
            });
        } else {
            return response.json().then(dataCrearCanal => {
                console.error('Error creando el canal:', dataCrearCanal.message);
                // Handle the error as needed, e.g., display an error message to the user
            });
        }
    })
    .catch(error => {
        console.error('Error creando el canal:', error);
        // Handle the error as needed, e.g., display an error message to the user
    });
}

function getMensajes(canal_id) {
    const msjs = document.getElementById('canal_mensajes');
    msjs.style.display ='block';
    canalId = canal_id;
    fetch(`http://127.0.0.1:5000/mensaje/mensajes/${canal_id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'
        },
        credentials: 'include'
    })
    .then(response => {
        if (response.ok) {
            return response.json().then(dataM => {
                
                const listaMensajes = document.getElementById('lista-mensajes');
                const messageM = document.getElementById('messageM');
                messageM.innerHTML = '';
                listaMensajes.innerHTML = '';
                
                
                if (dataM.length > 0) {
                    
                    for (const mensajes of dataM) {
                        
                        
                        const divElement = document.createElement('div');
                        divElement.classList.add('containerMensajes');
                        const div2Element = document.createElement('div');
                        div2Element.classList.add('profile');
                        
                        getChatProfile(mensajes.usuario_id, mensajes.fecha_hora, div2Element)
                        const div3Element = document.createElement('div');
                        div3Element.classList.add('chatmessage');
                        div3Element.textContent = mensajes.contenido_mensaje;
                        /* borrar mensaje */
                        const btnDelete = document.createElement('img');
                        btnDelete.src = 'icons//delete.png';
                        btnDelete.alt = 'delete';
                        btnDelete.title= 'eliminar mensaje'
                        btnDelete.classList.add('icon_delete');
                        btnDelete.addEventListener('click', () => {
                            uID = localStorage.getItem("id_usuario");
                            if (mensajes.usuario_id == uID){
                                if (confirm('¿Estás seguro de que deseas eliminar este mensaje?')) {
                                    deleteMensaje(mensajes.mensaje_id, canal_id)
                                    // console.log("Clicked on message:");
                                }
                            } else{
                                alert("No puedes eliminar este mensaje, solo el creador del mensaje puede hacerlo.")
                        
                            // const messageElement = document.createElement('span');
                            // messageElement.classList.add('message');
                            // messageElement.textContent = 'No puedes eliminar este mensaje, solo el creador del mensaje puede hacerlo.';
                            // messageM.appendChild(messageElement);
                            }
                           
                           
                        });
                        div3Element.appendChild(btnDelete);
                        divElement.appendChild(div2Element);
                        divElement.appendChild(div3Element);
                       

                        listaMensajes.appendChild(divElement);
                    }
                    
                } else {
                    // Muestra si no hay msjs
                    // listaMensajes.style.display='none'
                    const messageElement = document.createElement('span');
                    messageElement.classList.add('message');
                    messageElement.textContent = 'Aún no has creado ningun mensaje.';
                    messageM.appendChild(messageElement);
                }
            })
        } else {
            return response.json().then(dataM => {
                
                
                const messageM = document.getElementById('messageM');
                messageM.textContent = dataM.message;

            })
        }
    })
    .catch(error => {
        console.log("An error occurred.")
    })
}
document.getElementById("enviar-mensaje").addEventListener('click', () => {
    const userMessage = document.getElementById("mensaje-nuevo").value;
    const uName= localStorage.getItem("username");
    if (userMessage.trim() !== '') {
        
        const msj = {
            canal_id: localStorage.getItem("canal_id"),
            
            contenido_mensaje: userMessage,
        }
        fetch("http://127.0.0.1:5000/mensaje/crear", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(msj),
            credentials: 'include'
        })
        .then(response => {
            if (response.status === 201) {
                const divElement = document.createElement('div');
                divElement.classList.add('lista-mensaje');
                const div2Element = document.createElement('div');
                div2Element.classList.add('profile');
                const usDivElement = document.createElement('div');
                usDivElement.classList.add('user')
                const uIElement = document.createElement('img');
                uIElement.classList.add('avatar');
                uIElement.src = "http://127.0.0.1:5000/usuario/img";
                const uSElement = document.createElement('span');
                uSElement.classList.add('usernameChat');
                
                uSElement.textContent = uName;
                
                const spanElement = document.createElement('span');
                spanElement.classList.add('date');
                const now = new Date();
                // const date = now.toLocaleDateString();
                // const hour = now.toLocaleTimeString();
                
                // spanElement.textContent = date + ' ' + hour;
                spanElement.textContent = formatDate(now);
                const div3Element = document.createElement('div');
                div3Element.classList.add('chatmessage');
                div3Element.textContent = msj.contenido_mensaje;
                
                /* aqui deberia controlar los mensajes del usuario para permitir edicion */
                usDivElement.appendChild(uIElement);
                usDivElement.appendChild(uSElement);
                div2Element.appendChild(usDivElement);
                div2Element.appendChild(spanElement);
                divElement.appendChild(div2Element);
                divElement.appendChild(div3Element);
                document.getElementById("lista-mensajes").appendChild(divElement);
                document.getElementById("mensaje-nuevo").value = "";
            } else {
                return response.json().then(msj => {
                    console.log(msj.message);
                });
            }
        })
        .catch(error => {
            console.log("An error occurred." + error);
        })
    }
})
function getChatProfile(usuario_id, fecha_hora, element) {
  
    
    fetch(`http://127.0.0.1:5000/usuario/${usuario_id}`, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                const usDivElement = document.createElement('div');
                usDivElement.classList.add('user')
                
                const uIElement = document.createElement('img');
                uIElement.classList.add('avatar');
                uIElement.src = `http://127.0.0.1:5000/usuario/img_user/${data.usuario_id}`;
                const uSElement = document.createElement('span');
                uSElement.classList.add('usernameChat');
                uSElement.textContent = data.username;
                localStorage.setItem("username",  data.username);
                const spanElement = document.createElement('span');
                spanElement.classList.add('date');
                const formattedDate = formatDate(fecha_hora);
                spanElement.textContent = formattedDate;
                // console.log(fecha_hora);
               
                usDivElement.appendChild(uIElement);
                usDivElement.appendChild(uSElement);
                element.appendChild(usDivElement);
                
                element.appendChild(spanElement);
            })
        }
    })
}
function getProfile() {
    const url = "http://127.0.0.1:5000/usuario/profile";

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'
        },
        credentials: 'include'
    })
    .then(response => {
        if (response.ok) {

            return response.json().then(data => {
                const usernameElement = document.getElementById("username");
                
                
                const imagenDePerfilElement = document.getElementById("imagen_de_perfil");

                if (usernameElement) {
                    usernameElement.innerText = data.username;
                }


                if (imagenDePerfilElement) {
                    imagenDePerfilElement.src = "http://127.0.0.1:5000/usuario/img"|| "users\\profile.png";
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
function formatDate(fecha_hora) {
    const date = new Date(fecha_hora);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // January is 0!
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}
function deleteMensaje(mensajeId, canal_id) {
   
  
    fetch(`http://127.0.0.1:5000/mensaje/delete/${mensajeId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'
        },
        
        credentials: 'include'
    })
    .then(response => {
        if (response.ok) {
            // Message successfully deleted
            alert('Message deleted successfully');
            // Optionally, you can remove the message from the UI
            getMensajes(canal_id);
        } else {
            // Failed to delete message
            console.error('Failed to delete message');
        }
    })
    .catch(error => {
        console.error('An error occurred while deleting message:', error);
    });
}

