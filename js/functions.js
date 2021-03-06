/* Funciones */

// Función que muestra el test y oculta la portada

const showTest = () => {

    const cover = document.getElementById('cover');
    cover.classList.add('d-none');

    const test = document.getElementById('test');
    test.classList.remove('d-none');

}

// Función que recibe un array de n preguntas y crea una instancia de la clase Question por cada pregunta del set

const createQuestion = (arrayQuestions) => {

    const question = [];

    for (let i = 0; i<arrayQuestions.length; i++){

        // Inserto en el array cada instancia

        question.push(new Question(i,arrayQuestions[i]));
    
    }

    // Inserto cada array de preguntas en un array principal (questions)

    questions.push(question);

}


// Función que almacena las respuesta clickeada en el Local Storage

const addAnswer = (radioName,radioValue,idRandom) => {

    if(answersFromStorage.length==0){

        // Si el LS está vacío agrego una nueva respuesta al array answersFromStorage (instanciando la clase Answer) y almaceno el array en el LS

        answersFromStorage.push(new Answer(radioName,radioValue,idRandom));
    
        localStorage.setItem('answers', JSON.stringify(answersFromStorage));

    } else {

        // Si ya hay respuestas almacenadas en el LS, obtengo el índice que coincida con la respuesta clickeada

        const answerIndex = findIndex(radioName);
        
        if(answerIndex >= 0){

            // Si el índice exste, reemplazo el valor

            answersFromStorage[answerIndex].value = radioValue;

            localStorage.setItem('answers', JSON.stringify(answersFromStorage));

        } else {

            // Si el índice no existe, creo una nueva respuesta y la almaceno en el LS

            answersFromStorage.push(new Answer(radioName,radioValue,idRandom));

            localStorage.setItem('answers', JSON.stringify(answersFromStorage));

        }

    }

}

const saveName = () => {

    nameFromStorage = inputName.value;

    localStorage.setItem('userName', inputName.value);

}


// Función que obtiene el índice del array answersFromStorage que coincida con el name que le paso por parámetro

const findIndex = (name) => {

    const index = answersFromStorage.findIndex( answer => answer.name == name );

    return index;

}


// Función que devuelve el valor seleccionado del radio

const checkedRadio = (radio) => {

    let val = 0;

    // Recorro las opciones del radio y almaceno el valor del que está chequeado

    for (let i = 0; i < radio.length; i++){

        if(radio[i].checked){

            val = radio[i].value;
            
        }

    }

    return val;

}

// Función que valida el formulario

const validateForm = () => {

    let valid = true;

    let x = 0;

    const inputs = document.getElementsByTagName('input');

    for(let i = 0; i<inputs.length; i++){
        
        if(inputs[i].type == 'text') {

            if (inputs[i].value == ''){

                valid = false;

            }

        } else {

            if(inputs[i].checked){
				x++;
			}

        }
        
    }

    if( x<3 ) {

        valid = false;

    }
    
    if(valid) {

        getAnswers();

    } else {

        Swal.fire({
            title: 'Por favor, completá todas las preguntas',
            width: 600,
            padding: '1em',
            icon: 'error',
            background: '#fff'
        })

    }

}


// Función que obtiene las respuestas y llama a la función que obtiene el resultado del test

const getAnswers = () => {

    // Creo un array para almacenar las respuestas del usuario
    const respuestas = [];

    // Almaceno el nombre que ingreso el usuario en el input-name
    const nombre = document.getElementById('input-name');

    // Itero por la cantidad de preguntas del cuestionario (questions.length) y guardo cada respuesta en un array

    for (let i = 1; i <= questions.length; i++){

        // Le asigno a la constante radio cada pregunta
        const radio = document.getElementsByName('q-'+i);

        // Obtengo el valor de la opción seleccionada 
        respuestas.push(checkedRadio(radio));

    }

    // Llamo a la función que determina la casa de Hogwarts a la que pertenece el usuario, que recibe el array de valores de las respuestas y el nombren del usuario
    sortingHat(respuestas,nombre.value);    

}


// Función que determina la casa a la que pertenece el usuario
const sortingHat = (answers,nombre) => {

    // variables de cada casa para sumar puntos de acuerdo a las respuestas
    let gryff = 0;
    let raven = 0;
    let huff = 0;
    let sly = 0;

    // Recorro el array de respuestas y le sumo puntos a las casas de acuerdo a las opciones elegidas (cada opción suma puntos a alguna(s) de las casas)

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

            case 'ordinario':
                sly++;
                break;

            case 'ignorante':
                raven++;
                break;

            case 'cobarde':
                gryff++;
                break;

            case 'egoista':
                huff++;
                break;

            case 'sonríe':
                huff++;
                break;

            case 'aventuras':
                gryff++;
                break;

            case 'logros':
                raven++;
                break;

            case 'cuenta':
                sly++;
                break;
            
            case 'sabio':
                raven++;
                break;
            
            case 'bueno':
                huff++;
                break;
            
            case 'grande':
                sly++;
                break;
            
            case 'audaz':
                gryff++;
                break;
            
            case 'gloria':
                gryff++;
                break;
            
            case 'sabiduría':
                raven++;
                break;
            
            case 'amor':
                huff++;
                break;
            
            case 'poder':
                sly++;
                break;
            
            case 'molidos':
                raven++;
                break;
            
            case 'ciruelas':
                huff++;
                break;
            
            case 'habitación':
                gryff++;
                break;
            
            case 'visiones':
                sly++;
                break;
            
            case 'violin':
                sly++;
                break;
            
            case 'tambores':
                gryff++;
                break;
            
            case 'piano':
                raven++;
                break;
            
            case 'trompeta':
                huff++;
                break;
            
            case 'doradas':
                raven++;
                break;
            
            case 'sí':
                huff++;
                break;
            
            case 'luminoso':
                sly++;
                break;
            
            case 'ojos':
                gryff++;
                break;
            
            case 'criatura':
                huff++;
                break;
            
            case 'merlín':
                sly++;
                break;
            
            case 'dentro':
                raven++;
                break;
            
            case 'dignos':
                gryff++;
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

    // Inicializo la variable que va a guardar el resultado
    let resultado = "";
    let house = "";

    // Defino la casa del usuario
    if(HOUSES[0].value == HOUSES[1].value){ 
        
        // Si las primeras dos posiciones tienen el mismo puntaje, se define al azar
        
        const RANDOM = Math.floor(Math.random() * 2);
        resultado = `${nombre}, tu casa de Hogwarts es ${HOUSES[RANDOM].name.toUpperCase()}`;
        house = HOUSES[RANDOM].name.toLowerCase();
    
    } else { 
        
        // Si no, su casa es la que tiene el mayor puntaje
        // <span class="${HOUSES[RANDOM].name.toLowerCase()}">

        resultado = `${nombre}, tu casa de Hogwarts es ${HOUSES[0].name.toUpperCase()}`;
        house = HOUSES[0].name.toLowerCase();
    
    }

    // Obtengo el div con id resultado y le inserto el resultado para verlo en pantalla

    Swal.fire({
        title: resultado,
        width: 600,
        padding: '1em ',
        imageUrl: 'images/'+house+'.png',
        imageAlt: 'Custom image',
        background: '#fff',
        backdrop: `
          rgba(255,255,255,0.1)
          url("images/sparkles.gif")
          left top
          no-repeat
        `
    })

    const body = document.getElementsByTagName('body');
    const currentClasses = body[0].classList.value;
    const currentClass = currentClasses.split(' ');
    body[0].classList.remove(currentClass[0]);
    body[0].classList.add(house);
    
    /*const containerResult = document.getElementById('resultado');
    containerResult.innerHTML = resultado;*/

}

// Función para limpiar el formulario y el Local Storage

const clearAll = () => {

    // Obtengo un array con todos los inputs

    const inputs = document.getElementsByTagName('input');

    // Recorro el array

    for (let i = 0; i < inputs.length; i++) {

        if(inputs[i].type == 'text'){

            // Limpio el input de texto
            inputs[i].value = '';


        } 
        
        if(inputs[i].type == 'radio'){

            // Limpio los radios
            inputs[i].checked = false;

        } 

        localStorage.clear();

    }

    // Reseteo la paleta de colores

    const body = document.getElementsByTagName('body');
    const currentClass = body[0].classList.value;
    body[0].classList.remove(currentClass);
    body[0].classList.add('neutral');
   

}