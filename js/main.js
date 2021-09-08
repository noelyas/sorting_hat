// Creo la clase con su constructor y el método preguntar

class Question {

    constructor (id, question, options) {

        this.id = id;
        this.question = question;
        this.options = [];

        for(const option of options) {
           
            this.options.push(option);

        }

    }

    ask(n,pregunta,qId) {

        const question = document.createElement('div');
        const qTitle = document.createElement('h2');
        qTitle.textContent = pregunta[qId].question;
        question.appendChild(qTitle);

        const opciones = pregunta[qId].options;

        for (let i = 0; i < opciones.length; i++) {

            const radio = document.createElement('input');
            const label = document.createElement('label');
            radio.setAttribute('type', 'radio');
            radio.setAttribute('name', `q-${n}`);
            radio.value = opciones[i].toLowerCase();
            label.textContent = opciones[i];

            question.appendChild(radio);
            question.appendChild(label);

        }
        
        const containerQuestion = document.getElementById("questions");
        containerQuestion.appendChild(question);

    }     

}


// Creo las preguntas, que se guardan en el array questions

const questions = [];

createQuestion('Elegí la opción',set1);
createQuestion('Elegí la opción',set2);


// Invoco al método preguntar de la clase Question tantas veces como haya preguntas en el array questions

let n = 0;

for (const pregunta of questions) {

    n++;

    // Elijo un número random entre la cantidad preguntas posibles por set

    const qId = Math.floor(Math.random() * pregunta.length);

    // Llamo al método ask que arma la pregunta y la muestra en pantalla

    pregunta[qId].ask(n,pregunta,qId);

}

// Evento del botón Sort
const btnSort = document.getElementById('sort');
btnSort.onclick = getAnswers;


function getAnswers() {

    // Creo un array para almacenar las respuestas del usuario
    const respuestas = [];

    const nombre = document.getElementById('input-name');

    for (let i = 1; i < 3; i++){

        const radio = document.getElementsByName('q-'+i);

        respuestas.push(checkedRadio(radio));

    }

    sortingHat(respuestas,nombre.value)

}

// Función que devuelve el valor seleccionado del radio

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
function sortingHat(answers,nombre){

    // variables de cada casa para sumar puntos de acuerdo a las respuestas
    let gryff = 0;
    let raven = 0;
    let huff = 0;
    let sly = 0;

    // Recorro el array de respuestas y le sumo puntos a las casas de acuerdo a las opciones elegidas

    for (let i = 0; i < answers.length; i++){

        switch(answers[i]){

            case 'amanecer':
                gryff++;
                raven++;
                break;

            case 'atardecer':
                huff++;
                sly++;
                break;

            case 'bosque':
                gryff++;
                raven++;
                break;

            case 'río':
                huff++;
                sly++;
                break;

            case 'luna':
                raven++;
                sly++;
                break;

            case 'estrellas':
                gryff++;
                huff++;
                break;

            case 'blanco':
                raven++;
                huff++;
                break;

            case 'negro':
                gryff++;
                sly++;
                break;

            case 'cara':
                raven++;
                huff++;
                break;

            case 'seca':
                gryff++;
                sly++;
                break;

            case 'izquierda':
                raven++;
                sly++;
                break;

            case 'derecha':
                gryff++;
                huff++;
                break;

        }

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