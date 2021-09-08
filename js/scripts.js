// Creo la clase pregunta con su constructor y sus métodos
class Pregunta {

    constructor(opcion1, opcion2) {
        this.op1 = opcion1;
        this.op2 = opcion2;
    }

    preguntar(id){
        
        const question = document.createElement('div');
        const qTitle = document.createElement('h2');
        qTitle.textContent = `Pregunta ${id}`;
        question.appendChild(qTitle);
        const opciones = [];
        opciones[0] = this.op1;
        opciones[1] = this.op2;

        for (let i = 0; i < 2; i++) {

            const radio = document.createElement('input');
            const label = document.createElement('label');
            radio.setAttribute('type', 'radio');
            radio.setAttribute('name', `q-${id}`);
            radio.value = i+1;
            label.textContent = opciones[i];

            question.appendChild(radio);
            question.appendChild(label);

        }
        
        const questions = document.getElementById("questions");
        questions.appendChild(question);

    }

    imprimir(){
        const PRINT = this.op1 + " or " + this.op2 + "?";
        return PRINT;
    }

}



// Creo el array para la primera pregunta y le almaceno las tres instancias de la clase Pregunta
const pregunta1 = [];
pregunta1.push(new Pregunta("Dawn", "Dusk"));
pregunta1.push(new Pregunta("Forest", "River"));
pregunta1.push(new Pregunta("Moon", "Stars"));
const q1 = Math.floor(Math.random() * 3);
// Llamo al método preguntar() con un número al azar q1  y guardo la respuesta en el array
pregunta1[q1].preguntar(1);


// Creo el array para la segunda pregunta y le almaceno las tres instancias de la clase Pregunta
const pregunta2 = [];
pregunta2.push(new Pregunta("Black", "White"));
pregunta2.push(new Pregunta("Heads", "Tails"));
pregunta2.push(new Pregunta("Left", "Right"));
const q2 = Math.floor(Math.random() * 3);
// Llamo al método preguntar() con un número al azar q2 y guardo la respuesta en el array
pregunta2[q2].preguntar(2);

const btnSort = document.getElementById('sort');
btnSort.onclick = getAnswers;


function getAnswers() {

    const nombre = document.getElementById('input-name');

    const radio1 = document.getElementsByName('q-1');
    const radio2 = document.getElementsByName('q-2');

    // Creo un array para almacenar las respuestas del usuario
    const respuestas = [];
    respuestas.push(checkedRadio(radio1));
    respuestas.push(checkedRadio(radio2));

    sortingHat(respuestas,q1,q2,nombre.value)

}

function checkedRadio(radio){

    let val = 0;

    for (let i = 0; i < radio.length; i++){

        if(radio[i].checked){
            val = radio[i].value;
        }

    }

    return val;

}


// Función que determina la casa a la que pertenece el usuario
function sortingHat(arr,p1,p2,nombre){

    // variables de cada casa para sumar puntos de acuerdo a las respuestas
    let gryff = 0;
    let raven = 0;
    let huff = 0;
    let sly = 0;

    // Muestro por consola las preguntas que le tocaron al usuario y sus respuestas
    console.log("Pregunta 1: "+pregunta1[p1].imprimir());
    console.log("Respuesta 1: "+arr[0]);
    console.log("Pregunta 1: "+pregunta2[p2].imprimir());     
    console.log("Respuesta 1: "+arr[1]);

    // Sumo los puntos de la respuesta 1
    switch(p1) {

        case 0:
            if(arr[0]==1){
                gryff++;
                raven++;
            } else {
                if(arr[0]==2) {
                    huff++;
                    sly++;
                }
            }
            break;
        
        case 1: 
            if(arr[0]==1){
                gryff++;
                raven++;
            } else {
                if(arr[0]==2) {
                    huff++;
                    sly++;
                }
            }
            break;

        case 2: 
            if(arr[0]==1){
                raven++;
                sly++;
            } else {
                if(arr[0]==2) {
                    gryff++;
                    huff++;
                }
            }
            break;
        
        default:

    }

    // Sumo los puntos de la respuesta 2
    switch(p2) {

        case 0:
            if(arr[1]==1){
                gryff++;
                sly++;
            } else {
                if(arr[1]==2) {
                    raven++;
                    huff++;
                }
            }
            break;
        
        case 1: 
            if(arr[1]==1){
                raven++;
                huff++;
            } else {
                if(arr[1]==2) {
                    gryff++;
                    sly++;
                }
            }
            break;

        case 2: 
            if(arr[1]==1){
                raven++;
                sly++;
            } else {
                if(arr[1]==2) {
                    gryff++;
                    huff++;
                }
            }
            break;
        
        default:

    }

    // Creo un array con los puntos de cada casa
    const HOUSES = [
        { name:'Gryffindor', value: gryff },
        { name:'Ravenclaw', value: raven },
        { name:'Hufflepuff', value: huff },
        { name:'Slytherin', value: sly }
    ];
    // Ordeno el array de forma descendente    
    HOUSES.sort((a,b)=>b.value-a.value);

    // Muestro el array ordenado por consola
    console.log(HOUSES);

    let resultado = "";

    // Defino la casa del usuario
    if(HOUSES[0].value == HOUSES[1].value){ // si las primeras dos posiciones tienen el mismo puntaje, se define al azar
        const RANDOM = Math.floor(Math.random() * 2);
        resultado = nombre + ", tu casa de Hogwarts es: "+HOUSES[RANDOM].name.toUpperCase();
    } else { // si no, su casa es la que tiene el mayor puntaje
        resultado = nombre + ", tu casa de Hogwarts es: "+HOUSES[0].name.toUpperCase();
    }

    // Devuelvo el resultado
    const res = document.getElementById('resultado');
    res.innerHTML = resultado;
    
}

//const SORTED = sortingHat(RESPUESTAS,q1,q2);


// Imprimo el resultado por consola y lo inserto en el div
//console.log(SORTED);
//document.getElementById("contenedor").innerHTML += SORTED;