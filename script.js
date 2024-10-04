document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const contactList = document.getElementById("contactList");
    const clearAllButton = document.getElementById("clearAll");


    loadContacts();

    
    // envío del formulario
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        const imageUrl = document.getElementById("imageUrl").value;

        const contact = { name, email, message, imageUrl };
        saveContact(contact);
        contactForm.reset(); // reiniciar el formulario
        loadContacts(); // actualizar la lista
    });

    // // borrar todos los contactos
    clearAllButton.addEventListener("click", function() {
        localStorage.removeItem("contacts");
        loadContacts(); // actualizar la lista
    });

    // //  guardar contacto en Local Storage
    function saveContact(contact) {
        const contacts = getContacts();
        contacts.push(contact);
        localStorage.setItem("contacts", JSON.stringify(contacts));
    }

    //// acceder a contactos en Local Storage
    function getContacts() {
        const contacts = localStorage.getItem("contacts");
        return contacts ? JSON.parse(contacts) : [];
    }

    ////  cargar y mostrar los contactos
    function loadContacts() {
        const contacts = getContacts();
        contactList.innerHTML = ""; // limpiar la lista antes de cargar

        contacts.forEach((contact, index) => {
            const li = document.createElement("li");
            li.className = "contact-item";
            li.innerHTML = `
                <div>
                    ${contact.name} 
                    ${contact.email}
                    ${contact.message}
                    ${contact.imageUrl ? `<img src="${contact.imageUrl}"  "/>` : ''}
                </div>
                <button class="delete-button" data-index="${index}">Borrar </button>
            `;
            contactList.appendChild(li);
        });

        // ///eventos para los botones de borrar
        document.querySelectorAll(".delete-button").forEach(button => {
            button.addEventListener("click", function() {
                const index = this.getAttribute("data-index");
                deleteContact(index);
            });
         });
    }

    //// borrar un contacto específico
    function deleteContact(index) {
        const contacts = getContacts();
        contacts.splice(index, 1);
        localStorage.setItem("contacts", JSON.stringify(contacts));
        loadContacts(); // actualizar la lista
    }
});


//-------------------------------con fallos-------------------------

// console.log("hola");
// let usuarios = [...{}];
// //recoger los datos del formulario

// JSON.stringify()
// JSON.parse()
// document.querySelector("form").addEventListener("submit", function (event) {
//     event.preventDefault();

// const name = event.target.nombre.value;
// const email = event.target.email.value;
// const mensaje = event.target.mensaje.value;
// const url = event.target.url.value;
// localStorage.setItem("name",name);
// localStorage.setItem("email",email);
// localStorage.setItem("mensaje",mensaje);
// localStorage.setItem("url", url);
// console.log(name,email,mensaje,url);
// localStorage.setItem(
//     "usuario",
//     JSON.stringify({
//       nombre: name,
//       email: email,
//       mensaje: mensaje,
//       url: url
//     })
//   );
// localStorage.getItem("usuario");
// //stringify, push y luego set item 
// const contactosJson = JSON.stringify

// });
// document.getElementById("borrarTodo").addEventListener("click", function () {
//     let confirmacion = confirm("Estás seguro?")
    
//     if(confirmacion){
//         localStorage.removeItem("usuario");
//         localStorage.clear();
//        alert("Todos los usuarios han sido borrados");
//     }
// });

// document.getElementById('borrarContacto').addEventListener('click', function() {
//     const contactoId = document.getElementById('contactoId').value;

//     if (!contactoId) {
//         alert("Por favor, ingresa un ID de contacto.");
//         return;
//     }
// //Función para borrar un contacto específico
// function deleteContacto(index) {
//     const contacto = getContacts();
//     contacto.splice(index, 1);
//     localStorage.setItem("contacto", JSON.stringify(contacto));
//     loadContacts(); // Actualizar la lista
// }
// });










// document.addEventListener("DOMContentLoaded", function() {
//     // -------------------obtener referencias a los elementos en HTML--------------------------------
//     let formularioDeContacto = document.getElementById("contactForm");
//     let listaDeContactos = document.getElementById("contactList");
//     let botonBorrarTodos = document.getElementById("clearAll");
    
//     mostrarContactos(); 
//     // envio de formulario
//     formularioDeContacto.addEventListener("submit", function(evento) {
//         evento.preventDefault(); // evitar que la página se recargue automaticamente 
        
//         // obtener los valores del usuario
//         let nombre = document.getElementById("nombre").value;
//         let email = document.getElementById("email").value;
//         let mensaje = document.getElementById("mensaje").value;
//         let urlImagen = document.getElementById("imageUrl").value;
//         /*
//         // crear un objeto con los datos del contacto
//         let contacto = {
//             nombre: nombre,
//             email: email,
//             mensaje: mensaje,
//             urlImagen: urlImagen
//         };
//         */
//        //// array con los objetos
//         const contacto = { nombre, email, mensaje, urlImagen };
//         guardarContacto(contacto);
//         formularioDeContacto.reset(); // reiniciar el formulario
//         mostrarContactos(); // actualizar la lista
//     });
        
//     // función para guardar el contacto en el almacenamiento local
//     function guardarContacto(contacto) {
//         let contactosGuardados = obtenerContactos();
//         contactosGuardados.push(contacto); // añadir el nuevo contacto al array
//         localStorage.setItem("contactos", JSON.stringify(contactosGuardados)); // guardar el array en localStorage
//     }

//     // función para obtener los contactos guardados del almacenamiento local
//     function obtenerContactos() {
//         let contactosEnStorage = localStorage.getItem("contactos");
//         if (contactosEnStorage === null) {
//             return []; // si no hay contactos, devolver un array vacío
//         } else {
//             return JSON.parse(contactosEnStorage); // convertir los contactos de texto a un array
//         }
//     }

//     // función para mostrar los contactos guardados
//     function mostrarContactos() {
//         let contactos = obtenerContactos();
//         listaDeContactos.innerHTML = ""; // Limpiar la lista de contactos antes de mostrar los nuevos

//         // recorrer todos los contactos y mostrarlos
//         for (let i = 0; i < contactos.length; i++) {
//             let contacto = contactos[i];
//             let elementoLista = document.createElement("li");

//             // crear el contenido del contacto
//             let contenidoContacto = "<strong>" + contacto.nombre + "</strong> (" + contacto.email + ")<br>" + contacto.mensaje;
            
//             // mostrar la imagen si hay una URL
//             if (contacto.urlImagen !== "") {
//                 contenidoContacto += "<br><img src='" + contacto.urlImagen + "' alt='Imagen de contacto' width='50'>";
//             }
            
//             elementoLista.innerHTML = contenidoContacto;

//             // este es el botón para borrar
//             let botonBorrar = document.createElement("button");
//             botonBorrar.textContent = "Borrar";
//             botonBorrar.dataset.indice = i; // Guardar el índice del contacto en el botón

//             // cuando se hace clic en el botón de borrar
//             botonBorrar.addEventListener("click", function() {
//                 let indice = this.dataset.indice;
//                 borrarContacto(indice);
//             });

//             // añadir el botón al elemento de la lista
//             elementoLista.appendChild(botonBorrar);

//             // añadir el contacto a la lista
//             listaDeContactos.appendChild(elementoLista);
//         }
//     }

//     // función para borrar un contacto
//     function borrarContacto(indice) {
//         let contactos = obtenerContactos();
//         contactos.splice(indice, 1); // quitar el contacto de la lista
//         localStorage.setItem("contactos", JSON.stringify(contactos)); // guardar la nueva lista en el almacenamiento local
//         mostrarContactos(); // volver a mostrar la lista de contactos actualizada
//     }

//     // evento para borrar todos los contactos
//     botonBorrarTodos.addEventListener("click", function() {
//         localStorage.removeItem("contactos"); 
//         mostrarContactos(); 
//     });
// });








// Inicializar el array de usuarios desde Local Storage
// let usuarios = JSON.parse(localStorage.getItem("contactos")) || [];

// // Mostrar contactos en el DOM
// function mostrarContactos() {
//     const contactList = document.getElementById('contactList');
//     contactList.innerHTML = ''; // Limpiar la lista antes de mostrar

//     usuarios.forEach(usuario => {
//         const contactoDiv = document.createElement('div');
//         contactoDiv.innerHTML = `
//             <p>ID: ${usuario.id}</p>
//             <p>Nombre: ${usuario.nombre}</p>
//             <p>Email: ${usuario.email}</p>
//             <p>Mensaje: ${usuario.mensaje}</p>
//             <p>URL Imagen: <img src="${usuario.url}" alt="Imagen" width="50"></p>
//             <hr>
//         `;
//         contactList.appendChild(contactoDiv);
//     });
// }

// // Recoger los datos del formulario
// document.getElementById("contactForm").addEventListener("submit", function (event) {
//     event.preventDefault();

//     const nombre = event.target.nombre.value;
//     const email = event.target.email.value;
//     const mensaje = event.target.mensaje.value;
//     const url = event.target.url.value;

//     // Crear un nuevo usuario
//     const nuevoUsuario = {
//         id: Date.now(), // Generar un ID único
//         nombre: nombre,
//         email: email,
//         mensaje: mensaje,
//         url: url,
//     };

//     // Agregar el nuevo usuario al array
//     usuarios.push(nuevoUsuario);

//     // Guardar el array de usuarios en Local Storage
//     localStorage.setItem("contactos", JSON.stringify(usuarios));
//     mostrarContactos(); // Actualizar la lista mostrada

//     // Limpiar el formulario
//     event.target.reset();
// });

// // Botón para borrar todos los contactos
// document.getElementById('borrarContactos').addEventListener('click', function() {
//     const confirmacion = confirm("¿Estás seguro de que deseas borrar todos los contactos?");
//     if (confirmacion) {
//         localStorage.removeItem("contactos");
//         usuarios = []; // Resetear la lista en memoria
//         mostrarContactos(); // Actualizar la lista mostrada
//         alert("Todos los contactos han sido borrados.");
//     }
// });

// // Función para borrar un contacto específico
// document.getElementById('borrarContacto').addEventListener('click', function() {
//     const nombreContacto = document.getElementById('contactId').value; // Cambia este id a algo más descriptivo

//     if (!nombreContacto) {
//         alert("Por favor, ingresa el nombre del contacto.");
//         return;
//     }

//     const indice = usuarios.findIndex(usuario => usuario.nombre.toLowerCase() === nombreContacto.toLowerCase()); // Buscar el índice del contacto

//     if (indice !== -1) {
//         usuarios.splice(indice, 1); // Elimina el contacto por índice
//         localStorage.setItem("contactos", JSON.stringify(usuarios)); // Guardar el array actualizado
//         mostrarContactos(); // Actualizar la lista mostrada
//         alert(`Contacto con nombre ${nombreContacto} ha sido borrado.`);
//     } else {
//         alert(`No se encontró ningún contacto con nombre ${nombreContacto}.`);
//     }
// });
// // Mostrar contactos al cargar la página
// mostrarContactos();















//-------------------------------opcion 3-------------------------



    
//     const idNumerico = parseInt(contactId);
//     const indice = usuarios.findIndex(usuario => usuario.id === idNumerico); // Buscar el índice del contacto

//     if (indice !== -1) {
//         usuarios.splice(indice, 1); // Elimina el contacto por índice
//         localStorage.setItem("usuarios", JSON.stringify(usuarios)); // Guardar el array actualizado
//         alert(`Contacto con ID ${contactId} ha sido borrado.`);
//     } else {
//         alert(`No se encontró ningún contacto con ID ${contactId}.`);
//     }
// ;



// console.log("hola");
// let usuarios = [{},{},{},{}];
// //recoger los datos del formulario

// // JSON.stringify()
// // JSON.parse()
// document.querySelector("form").addEventListener("submit", function (event) {
//     event.preventDefault();

// const name = event.target.nombre.value;
// const email = event.target.email.value;
// const mensaje = event.target.mensaje.value;
// const url = event.target.url.value;
// localStorage.setItem("name",name);
// localStorage.setItem("email",email);
// localStorage.setItem("mensaje",mensaje);
// localStorage.setItem("url", url);
// console.log(name,email,mensaje,url);

// localStorage.setItem(
//     "usuario",
//     JSON.stringify({
//       nombre: name,
//       email: email,
//       mensaje: mensaje,
//       url: url,
//     })
//   );
//   document.getElementById('borrarContactos').addEventListener('click', function() {
 
//     const confirmacion = confirm("¿Estás seguro de que deseas borrar todos los contactos?");
//     if (confirmacion) {
//         localStorage.clear();
//         alert("Todos los contactos han sido borrados.");
//     }
// }
// )
// const contactKey = `contacto_${contactId}`;
//     if (localStorage.getItem(contactKey)) {
//         localStorage.removeItem(contactKey);
//         alert(`Contacto con ID ${contactId} ha sido borrado.`);
//     } else {
//         alert(`No se encontró ningún contacto con ID ${contactId}.`);
//     }
// })