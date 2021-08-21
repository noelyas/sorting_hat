// Creo la clase pregunta con su constructor y sus métodos
class Pregunta {

    constructor(opcion1, opcion2) {
        this.op1 = opcion1;
        this.op2 = opcion2;
    }

    preguntar(){
        const QUESTION = prompt(this.op1 + " or " + this.op2 + "?","0");
        return QUESTION;
    }

    imprimir(){
        const PRINT = this.op1 + " or " + this.op2 + "?";
        return PRINT;
    }

}

const NOMBRE = prompt("Ingresá tu nombre","Nombre");

// Creo un array para almacenar las respuestas del usuario
const RESPUESTAS = [];

// Creo el array para la primera pregunta y le almaceno las tres instancias de la clase Pregunta
const pregunta1 = [];
pregunta1.push(new Pregunta("Dawn (1)", "Dusk (2)"));
pregunta1.push(new Pregunta("Forest (1)", "River (2)"));
pregunta1.push(new Pregunta("Moon (1)", "Stars (2)"));
const q1 = Math.floor(Math.random() * 3);
// Llamo al método preguntar() con un número al azar q1  y guardo la respuesta en el array
const r1 = pregunta1[q1].preguntar();
RESPUESTAS.push(r1);

// Creo el array para la segunda pregunta y le almaceno las tres instancias de la clase Pregunta
const pregunta2 = [];
pregunta2.push(new Pregunta("Black (1)", "White (2)"));
pregunta2.push(new Pregunta("Heads (1)", "Tails (2)"));
pregunta2.push(new Pregunta("Left (1)", "Right (2)"));
const q2 = Math.floor(Math.random() * 3);
// Llamo al método preguntar() con un número al azar q2 y guardo la respuesta en el array
const r2 = pregunta2[q2].preguntar();
RESPUESTAS.push(r2);

// Función que determina la casa a la que pertenece el usuario
function sortingHat(arr,p1,p2){

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
        { name:'Slyterin', value: sly }
    ];
    // Ordeno el array de forma descendente    
    HOUSES.sort((a,b)=>b.value-a.value);

    // Muestro el array ordenado por consola
    console.log(HOUSES);

    let resultado = "";

    // Defino la casa del usuario
    if(HOUSES[0].value == HOUSES[1].value){ // si las primeras dos posiciones tienen el mismo puntaje, se define al azar
        const RANDOM = Math.floor(Math.random() * 2);
        resultado = NOMBRE + ", tu casa de Hogwarts es: "+HOUSES[RANDOM].name;
    } else { // si no, su casa es la que tiene el mayor puntaje
        resultado = NOMBRE + ", tu casa de Hogwarts es: "+HOUSES[0].name;
    }
    // Devuelvo el resultado
    return resultado;
    
}

const SORTED = sortingHat(RESPUESTAS,q1,q2);
// Imprimo el resultado por consola y lo inserto en el div
console.log(SORTED);
document.getElementById("contenedor").innerHTML += SORTED;