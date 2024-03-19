const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const regitrarLink = document.querySelector('.registrar-link');
const regiskterLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');

const iconClose = document.querySelector('.icon-close');

regiskterLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
  
})

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
   

})
regitrarLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
    if (wrapper.classList.contains('active-popup')) {
        wrapper.classList.remove('active-popup');
        
    }else {
        wrapper.classList.add('active-popup');
    }
    wrapper.classList.add('active');
    
})
btnPopup.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
    if (wrapper.classList.contains('active-popup')) {
        wrapper.classList.remove('active-popup');
                
    }else {
        wrapper.classList.add('active-popup');
        
        
    }
    wrapper.classList.remove('active');
})

iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
})

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    login();
});

function login() {
    const data = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    fetch("http://127.0.0.1:5000/usuario/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            // Redirect to profile page if login is successful
            return response.json().then(usuario => {
                // localStorage.setItem("usuario", JSON.stringify(usuario));
                //console.log(usuario); // Asegúrate de que usuario tenga el valor esperado
                localStorage.setItem("id_usuario", usuario.usuario_id);
                localStorage.setItem("email", usuario.email);
                //console.log(localStorage.getItem("usuario")); // Verifica si el valor se estableció correctamente

                window.location.href = "inicio.html";
            });
        } else {
            return response.json().then(data => {
                document.getElementById("message").innerHTML = data.message;
            });
        }
    })
    // .catch(error => {
    //     document.getElementById("message").innerHTML = "An error occurred.";
    //});
    .catch(error => {
        console.error('Error:', error);})
}
document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registration-form');
    const messageDiv = document.getElementById('message');

    registrationForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password1').value;
        const nombre_completo = document.getElementById('nombre_completo').value;
        const email = document.getElementById('mail').value;
        
        

        const usuarioData = {
            username: username,
            password: password,
            nombre_completo,
            email: email
            
        };

        fetch('http://127.0.0.1:5000/usuario/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'
            },
            body: JSON.stringify(usuarioData)
        })
        .then(response => {
            if (response.status === 201) {
                // Registro exitoso, puedes redirigir al usuario a otra página
                window.location.href = "inicio.html";
            } else {
                return response.json();
            }
        })
        .then(data => {
            if (data.message) {
                messageDiv.textContent = data.message;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            messageDiv.textContent = 'Ocurrió un error al procesar la solicitud.';
        });
    });
});

// JavaScript to toggle between English and Spanish welcome messages
const languageToggleBtn = document.getElementById('language-toggle');
let isEng = true;
const welcomeMessage = document.getElementById('welcome-message');
const tituloH1 = document.createElement('h1');
const pElement = document.createElement('p');
tituloH1.textContent = "Hola!";
        
pElement.textContent = "¡Bienvenido a ChatNet, donde las conexiones florecen y las conversaciones cobran vida! Estamos encantados de que se una a nuestra comunidad de mentes vibrantes y caras amigables. Ya sea que esté aquí para conocer nuevos amigos, compartir ideas o simplemente relajarse después de una jornada ocupada, día, ChatNet es su destino ideal para interacciones significativas. Sumérgete, explora y deja que comiencen las conversaciones. ¡Bienvenido a bordo!";
languageToggleBtn.textContent = "Eng";
languageToggleBtn.title = "Change Language";
welcomeMessage.appendChild(tituloH1);
welcomeMessage.appendChild(pElement);

languageToggleBtn.addEventListener('click', () => {
    const welcomeMessage = document.getElementById('welcome-message');
    tituloH1.textContent = "";
    pElement.textContent = "";
    if (isEng) {
        tituloH1.textContent = "Hello!";
        
        pElement.textContent = "Welcome to ChatNet, where connections flourish and conversations come to life! We're thrilled to have you join our community of vibrant minds and friendly faces. Whether you're here to meet new friends, share ideas, or simply unwind after a busy day, ChatNet is your go-to destination for meaningful interactions. Dive in, explore, and let the conversations begin. Welcome aboard!";
        languageToggleBtn.textContent = "Esp";
        languageToggleBtn.title = "Cambiar Idioma";
        welcomeMessage.appendChild(tituloH1);   
        welcomeMessage.appendChild(pElement);
        
        
    } else {
        
        tituloH1.textContent = "Hola!";
        
        pElement.textContent = "¡Bienvenido a ChatNet, donde las conexiones florecen y las conversaciones cobran vida! Estamos encantados de que se una a nuestra comunidad de mentes vibrantes y caras amigables. Ya sea que esté aquí para conocer nuevos amigos, compartir ideas o simplemente relajarse después de una jornada ocupada, día, ChatNet es su destino ideal para interacciones significativas. Sumérgete, explora y deja que comiencen las conversaciones. ¡Bienvenido a bordo!";
        languageToggleBtn.textContent = "Eng";
        languageToggleBtn.title = "Change Language";
        welcomeMessage.appendChild(tituloH1);
        welcomeMessage.appendChild(pElement);
    }
    isEng = !isEng;
});
