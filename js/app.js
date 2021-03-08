let contenedorMascotas = document.querySelector('.contenedor-mascotas');
let agregarMascotaBtn = document.querySelector('.agregar-mascota');
let contenedorAgregar = document.querySelector('.contenedor-agregar');
let confirmarAgregarBtn = document.querySelector('.confirmar-agregar');
let cerrarContenedorAgregar = document.querySelector('.cerrar-agregar');
let contenedorActualizar = document.querySelector('.contenedor-actualizar');
let cerrarContenedorActualizar = document.querySelector('.cerrar-actualizar');
let confirmarActualizarBtn = document.querySelector('.confirmar-actualizar');
let objeto={};
let mascotas=[];
let contador = 9;

capturarDatos();

function capturarDatos(){

    let xhr = new XMLHttpRequest();

    xhr.open('GET','data.json',true);

    xhr.onload = function (){
        mascotas = JSON.parse(this.responseText);
        llenarDatos(mascotas,contenedorMascotas);
    
    }

    xhr.send();
}


function llenarDatos(Rmascotas, Rcontenedor){
    Rmascotas.forEach(mascota => {
        Rcontenedor.insertAdjacentHTML('beforeend',`
        
        <article class="contenedor-mascota" id="${mascota.ID}">
            <header>
                <button class="actualizar">Edit</button>
                <button class="eliminar">Delt</button>
            </header>
            <img src="${mascota.Foto}" alt="" class="foto-mascota">
            <div>
                <p class="nombre">${mascota.Nombre}</p>
                <p><span class="telefono">${mascota.Telefono}</span> | <span class="email">${mascota.Email}</span></p>
                <p class="pais">${mascota.Pais}</p>
                <p class="descripcion">${mascota.Descripcion}</p>
            </div>
        </article>
        `)
    });
}

agregarMascotaBtn.addEventListener('click', (e) =>{

    e.preventDefault();

    contenedorAgregar.classList.toggle('contenedor-agregar-active');
    contenedorMascotas.classList.toggle('contenedor-mascotas-active');

});

confirmarAgregarBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    let nuevaMascota = {
        "Nombre": document.getElementById('agregar-nombre').value,
        "Telefono": document.getElementById('agregar-telefono').value,
        "Email": document.getElementById('agregar-email').value,
        // "Foto": document.getElementById('agregar-foto').value,
        "Foto": "images/mascota1.jpg",
        "Pais": document.getElementById('agregar-pais').value,
        "Descripcion": document.getElementById('agregar-descripcion').value,
        "ID": contador+1
    }

    
    insertarYMostrar(mascotas,nuevaMascota,contenedorMascotas);
    contenedorAgregar.classList.toggle('contenedor-agregar-active');
    contenedorMascotas.classList.toggle('contenedor-mascotas-active');

    
});

function limpiarContenedor(Rcontenedor){
    Rcontenedor.innerHTML='';
}

cerrarContenedorAgregar.addEventListener('click', (e)=>{
    e.preventDefault();

    contenedorAgregar.classList.toggle('contenedor-agregar-active');
    contenedorMascotas.classList.toggle('contenedor-mascotas-active');

});

function insertarYMostrar(Rmascotas, RnuevaMascota,Rcontenedor){
    Rmascotas.push(RnuevaMascota);
    limpiarContenedor(Rcontenedor);
    llenarDatos(Rmascotas,Rcontenedor);
}

function insertarYMostrarNuevo(Rmascotas,Rcontenedor){
    limpiarContenedor(Rcontenedor);
    llenarDatos(Rmascotas,Rcontenedor);
}

contenedorMascotas.addEventListener('click', (e)=>{
    e.preventDefault();
    let elemento;

    if(e.target.classList.contains('eliminar')){
        elemento=e.target.parentElement.parentElement;
        mascotas=mascotas.filter(mascota => mascota.ID!==parseInt(elemento.getAttribute('id')));
        insertarYMostrarNuevo(mascotas,contenedorMascotas);
    }
    
    if(e.target.classList.contains('actualizar')){
        elemento=e.target.parentElement.parentElement;
        CajaActualizarInicial(elemento,mascotas);
        contenedorActualizar.classList.toggle('contenedor-actualizar-active');
        contenedorMascotas.classList.toggle('contenedor-mascotas-active');
    }

});


cerrarContenedorActualizar.addEventListener('click', (e)=>{
    e.preventDefault();

    contenedorActualizar.classList.toggle('contenedor-actualizar-active');
    contenedorMascotas.classList.toggle('contenedor-mascotas-active');

});

function CajaActualizarInicial(Relemento,Rmascotas){
    
    contenedorActualizar.querySelector('#actualizar-nombre').value=Relemento.querySelector('.nombre').textContent;
    contenedorActualizar.querySelector('#actualizar-pais').value=Relemento.querySelector('.pais').textContent;
    contenedorActualizar.querySelector('#actualizar-telefono').value=Relemento.querySelector('.telefono').textContent;
    contenedorActualizar.querySelector('#actualizar-email').value=Relemento.querySelector('.email').textContent;
    contenedorActualizar.querySelector('#actualizar-descripcion').value=Relemento.querySelector('.descripcion').textContent;

    objeto=Rmascotas.find(mascota => mascota.ID == Relemento.getAttribute('id'));

}

confirmarActualizarBtn.addEventListener('click', () =>{

    objeto.Nombre= contenedorActualizar.querySelector('#actualizar-nombre').value;
    objeto.Telefono= contenedorActualizar.querySelector('#actualizar-telefono').value;
    objeto.Email= contenedorActualizar.querySelector('#actualizar-email').value;
    objeto.Pais= contenedorActualizar.querySelector('#actualizar-pais').value;
    objeto.Descripcion= contenedorActualizar.querySelector('#actualizar-descripcion').value;
    
    insertarYMostrarNuevo(mascotas, contenedorMascotas);
    objeto={};
    contenedorActualizar.classList.toggle('contenedor-actualizar-active');
    contenedorMascotas.classList.toggle('contenedor-mascotas-active');
});
