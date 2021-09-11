// Almaceno las respuestas seleccionadas que se encuentran en el Local Storage

let answersFromStorage = JSON.parse(localStorage.getItem('answers'));

// Si el LocalStorage no tiene nada almacenado, inicializo un array

if (!answersFromStorage) {

    answersFromStorage = [];

}

// Almaceno el nombre del usuario que se encuentra en el LS

let nameFromStorage = localStorage.getItem('userName');

// Si el LocalStorage no tiene nada almacenado, inicializo string vacío 

if (!nameFromStorage) {

    nameFromStorage = '';

}

// Creo las preguntas con la función createQuestion, que se guardan en el array questions

const questions = [];

createQuestion(set1);
createQuestion(set2);
createQuestion(set3);


// Invoco al método ask de la clase Question tantas veces como haya preguntas en el array questions

let orden = 0;

for (const pregunta of questions) {

    orden++;

    if( answersFromStorage.length == 0 ){

        // Si NO hay respuestas en el Local Storage

        // Elijo un número random entre la cantidad preguntas posibles por set de preguntas

        const idRandom = Math.floor(Math.random() * pregunta.length);

        // Llamo al método ask que arma la pregunta y la muestra en pantalla

        pregunta[idRandom].ask(orden,pregunta,idRandom); 

    } else {

        // Si HAY respuestas en el Local Storage

        // En todos los casos utilizo orden-1 porque el orden va de 1 a n y el array de 0 a n

        if(answersFromStorage[orden-1]==null){

            // Si la pregunta no se respondió antes de recargar la página, tengo que crearla de manera aleatoria

            const idRandom = Math.floor(Math.random() * pregunta.length);
            pregunta[idRandom].ask(orden,pregunta,idRandom); 
            
        } else {

            // En cambio si la respuesta se almacenó en el Local Storage, tengo que llamar al método con el idRandom que almacené en el LS (para que la pregunta sea la misma que ya respondió y no genere una nueva)

            pregunta[answersFromStorage[orden-1].idRandom].ask(orden,pregunta,answersFromStorage[orden-1].idRandom);   
        
        }

    }

}

// Evento click del botón Calcular que llama a la función que obtiene las respuestas

const btnSort = document.getElementById('sort');
btnSort.onclick = getAnswers;

// Evento click del botón Limpiar que resetea todo el formulario

const btnClear = document.getElementById('clear');
btnClear.onclick = clearAll;


// Evento blur del input-name que llama a la función que almacena el nombre del usuario

const inputName = document.getElementById('input-name');
inputName.onblur = saveName;
inputName.value = nameFromStorage;