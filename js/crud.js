// CREATE

const createQuestion = (texto,q) => {

    const question = [];

    for (let i = 0; i<q.length; i++){

        question.push(new Question(i,texto,q[i]));
    
    }

    questions.push(question);

}


// READ

const getAllQuestions = () => {

    return questions;

}
