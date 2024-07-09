export class UI{
    constructor(){}

    displayCurrentQuestion(question,questionNumber,numberOfQuestions){
        let listOfAnswers = question.incorrect_answers;
        if(listOfAnswers.length < 4){
            let correct_answer_index = Math.floor(Math.random()*4);
            listOfAnswers.splice(correct_answer_index,0,question.correct_answer);
        }
        return `
            <h5 class="align-self-end fs-6 text-white rounded-5 bg-wave p-2"><span>${questionNumber+1}</span> of <span>${numberOfQuestions}</span> Question</h5>
            <div class="text-white">
                <h4 class="fs-5">Q: ${question.question}</h4>
                <div class="mb-2">
                    <input type="radio" class="form-check-input" name="question-answer" value="${listOfAnswers[0]}" id="answer1">
                    <label for="answer1">${listOfAnswers[0]}</label>
                </div>
                <div class="mb-2">
                    <input type="radio" class="form-check-input" name="question-answer" value="${listOfAnswers[1]}" id="answer2">
                    <label for="answer2">${listOfAnswers[1]}</label>
                </div>
                <div class="mb-2">
                    <input type="radio" class="form-check-input" name="question-answer" value="${listOfAnswers[2]}" id="answer3">
                    <label for="answer3">${listOfAnswers[2]}</label>
                </div>
                <div class="mb-2">
                    <input type="radio" class="form-check-input" name="question-answer" value="${listOfAnswers[3]}" id="answer4">
                    <label for="answer4">${listOfAnswers[3]}</label>
                </div>
            </div>
        `
    }
};


// category: "Entertainment: Books"
// correct_answer: "Falcon"
// difficulty: "easy"
// incorrect_answers: (3) ['Eagle', 'Kyte', 'Swallow']
// question: "What was Sir Handel&#039;s original name in &quot;The Railway Series&quot; and it&#039;s animated counterpart &quot;Thomas and Friends?&quot;"
// type: "multiple"