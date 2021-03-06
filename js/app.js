let contenedorMascotas = document.querySelector('.contenedor-mascotas');
let agregarMascotaBtn = document.querySelector('.agregar-mascota');
let contenedorAgregar = document.querySelector('.contenedor-agregar');
let confirmarAgregarBtn = document.querySelector('.confirmar-agregar');
let mascotas=[];
let contador = 8;

capturarDatos();

function capturarDatos(){

    let xhr = new XMLHttpRequest();

    xhr.open('GET','data.json',true);

    xhr.onload = function (){
        mascotas = JSON.parse(this.responseText);
        llenarDatos(mascotas);
    
    }

    xhr.send();
}


function llenarDatos(Cmascotas){
    Cmascotas.forEach(mascota => {
        contenedorMascotas.insertAdjacentHTML('beforeend',`
        
        <article class="contenedor-mascota" id="${mascota.ID}">
            <header>
                <button class="editar">Edit</button>
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

});

confirmarAgregarBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    let nuevaMascota = {
        "Nombre": document.getElementById('agregar-nombre').value,
        "Telefono": document.getElementById('agregar-telefono').value,
        "Email": document.getElementById('agregar-email').value,
        "Foto": document.getElementById('agregar-foto').value,
        "Pais": document.getElementById('agregar-pais').value,
        "Descripcion": document.getElementById('agregar-descripcion').value,
        "ID": contador+1
    }
    if(mascotas.push(nuevaMascota)){
        llenarDatos(mascotas);
        alert(`Mascota agregada`);
    }else{
        console.log(`Error`);
    }
    
});