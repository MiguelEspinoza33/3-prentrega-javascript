const formulario = document.querySelector('#formulario');
const tareasAgregadas = document.querySelector('#tareasAgregadas');
let tareas = [];

eventos();


function eventos(){
    formulario.addEventListener('submit', agregarTarea)

    document.addEventListener('DOMContentLoaded', () =>{

        tareas = JSON.parse( localStorage.getItem('tareas')) || [] ;

        crearhtml(); 

    })
}



function agregarTarea(evt){
    evt.preventDefault();

    const tarea = document.querySelector('#tarea').value;
    
    

    if(tarea  === ""){
        alert(' El campo no puede ir vacio ');
        return
    }


    tareas = [...tareas, tarea ];

    crearhtml();
    sincronizacion();
    
    formulario.reset();

}



function crearhtml(){

    tareasAgregadas.innerHTML = '';

    if(tareas.length > 0){
        tareas.forEach( (tarea, indice ) =>{
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrarTarea');
            btnEliminar.innerText = ' X ';

            btnEliminar.onclick = () => {
                borrarTarea(indice);
            } 




            const li = document.createElement('li')
            li.innerText = tarea
            li.classList.add('lista')

            li.appendChild(btnEliminar);
            tareasAgregadas.appendChild(li)

            

        })
    }

    sincronizacion();
}

function sincronizacion(){
    localStorage.setItem('tareas' , JSON.stringify(tareas));
}

function borrarTarea(indice){
    tareas = tareas.filter((tarea, i) => i !== indice);
    crearhtml();
    sincronizacion();

}