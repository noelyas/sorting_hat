// Creo la clase para las preguntas con su constructor y el método ask

class Question {

    constructor (id, options) {

        // Recibo el id de la pregunta, y un array con la pregunta y las posibles respuestas (siempre el primer elemento del array es la pregunta)

        this.id = id;
        this.options = [];

        for(let i = 0; i < options.length; i++) {

            if(i==0){

                // Sí es el primer elemento del array, lo guardo como pregunta
                this.question = options[i];

            } else {

                // Si no, guardo las posibles respuestas en el array options
                this.options.push(options[i]);

            }

        }

    }


    // Método que arma la pregunta para mostrar en pantalla. Recibe un número de orden, el array pregunta con las posibles preguntas, el id obtenido de forma aleatoria para que al cargar el cuestionario varíen las preguntas

    ask(orden,pregunta,idRandom) {

        // Creo un div que contiene la pregunta y un h2 que va a ser el título de la pregunta (propiedad question de la clase)
        const divQuestion = document.createElement('div');
        divQuestion.className = "question";
        const questionTitle = document.createElement('h2');
        // Inserto el texto de la pregunta en el h2
        questionTitle.textContent = pregunta[idRandom].question;
        // Agrego el h2 adentro del div
        divQuestion.appendChild(questionTitle);

        // Guardo las opciones de la pregunta
        const opciones = pregunta[idRandom].options;

        // Flag que utilizo para verificar si hay respuestas almacenadas en Local Storage
        let hayOpcion = false;

        // Chequeo que haya respuestas en el Local Storage
        if(answersFromStorage.length>0){

            // Chequeo que haya una opción cargada en el item de esa pregunta (el orden es de 1 a n, el array de 0 a n, por eso resto 1)
            if(answersFromStorage[orden-1] != null) {

                // Guardo el valor almacenado en el Local Storage
                hayOpcion = answersFromStorage[orden-1].value;

            }

        }

        // Recorro las opciones de la pregunta

        for (let i = 0; i < opciones.length; i++) {

            // Por cada opción, creo un contenedor, un input y un tag label
            const containerRadio = document.createElement('div');
            const radio = document.createElement('input');
            const label = document.createElement('label');
            // Indico que el input es tipo radio, y le asigno un nombre con el número de orden de la pregunta
            radio.setAttribute('type', 'radio');
            radio.setAttribute('name', `q-${orden}`);

            // Obtengo el valor de la opción y lo separo por espacios, para poder almacenar como value del radio la última palabra
            const val = opciones[i].split(' ');
            // Almaceno la última palabra en minúscula
            radio.value = val[val.length-1].toLowerCase();
            // En el label alamaceno la frase completa de cada opción (es lo que se verá en pantalla)
            label.textContent = opciones[i];

            // Agrego el radio y el label al contenedor, y a su vez el contenedor al div de la pregunta
            containerRadio.appendChild(radio);
            containerRadio.appendChild(label);
            divQuestion.appendChild(containerRadio);

            // Si hay respuestas almacenadas en el Local Storage, dejo chequeado el radio correspondiente
            if(hayOpcion){
                if(radio.value == hayOpcion){
                    radio.checked = true;
                }
            }
            // Función que almacena la opción clickeada de la pregunta en el Local Storage
            radio.onclick = () => {
                
                addAnswer(radio.name,radio.value,idRandom);

            }

        }
        // Obtengo en div en el que voy a insertar la pregunta
        const containerQuestion = document.getElementById("questions");
        // Inserto la pregunta
        containerQuestion.appendChild(divQuestion);

    }     

}

// Creo la clase respuesta para luego almacenarlas en el LocalStorage

class Answer {

    constructor(radioName,radioValue,idRandom) {

        this.name = radioName;
        this.value = radioValue;
        this.idRandom = idRandom;

    }

}