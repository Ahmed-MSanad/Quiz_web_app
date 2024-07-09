/// <reference types="../@types/jquery" />

import {GenerateQuestions} from './generate_questions.js'
import {UI} from './display_questions.js'

const generateQuestions = new GenerateQuestions();
const Ui = new UI();


// pages:
const quizWelcomePage = document.querySelector('.quiz-welcome-page');
const quizQuestionsPage = document.querySelector('.quiz-questions-page');
const quizFinishPage = document.querySelector('.quiz-finish-page');
// buttons:
const startButton = document.querySelector('.quiz-welcome-page button');
const nextButton = document.querySelector('.quiz-questions-page .nextBtn');
const finishButton = document.querySelector('.quiz-questions-page .finishBtn');
const tryAgainButton = document.querySelector('.tryAgainBtn');
// current Question:
let currentQuestionIndex = 0;
let trueAnswerCount = 0;
// input fields:
const selectCategory = document.querySelector(`select[name='category']`);
const numberOfQuestions = document.querySelector(`input[type='number']`);
// alert: all inputs are required:
const wrongAnswer = $('.wrong-answer');
const trueAnswer = $('.true-answer');
const noAnswerAlert = $('.no-answer-alert');
const spinner = document.querySelector('.spinner');
// list of questions:
let listOfQuestions = []




function validateInputs(){
    const difficulty = document.querySelector(`.difficulty input[name='difficulty']:checked`);
    if(selectCategory.value == '' ||
        numberOfQuestions.value == '' ||
        !difficulty
    ){
        $('.all-inputs-required').show(500);
        return false;
    }
    else if(numberOfQuestions.value > 45){
        $('.max-number-questions').show(500);
        $('.all-inputs-required').hide(500);
        return false;
    }
    else{
        $('.all-inputs-required').hide(500);
        $('.max-number-questions').hide(500);
    }
    return true;
}


function checkAnswer(){
    const userChoice = document.querySelector(`.questionAndAnswersContainer input[type='radio']:checked`);
    if(!userChoice){ // userChoice is undefined
        noAnswerAlert.show(500);
        return false;
    }
    else if(userChoice.value == listOfQuestions[currentQuestionIndex-1].correct_answer){
        trueAnswer.show(500);
        setTimeout(()=>{trueAnswer.hide(500);},1000);
        trueAnswerCount++;
    }
    else{
        wrongAnswer.show(500);
        setTimeout(()=>{wrongAnswer.hide(500);},1000);
    }
    noAnswerAlert.hide(500);
    return true;
}


startButton.addEventListener('click',async function(e){
    if(validateInputs()){
        $('.all-inputs-required').hide(500);
        $('.max-number-questions').hide(500);
        finishButton.classList.add('d-none');
        nextButton.classList.remove('d-none');
        quizQuestionsPage.children[0].children[3].innerHTML = spinner.outerHTML;
        quizWelcomePage.classList.add('d-none');
        quizQuestionsPage.classList.remove('d-none');
        const difficulty = document.querySelector(`.difficulty input[name='difficulty']:checked`);
        listOfQuestions = await generateQuestions.getQuiz(numberOfQuestions.value,selectCategory.value,difficulty.value);
        quizQuestionsPage.children[0].children[3].innerHTML = Ui.displayCurrentQuestion(listOfQuestions[currentQuestionIndex],currentQuestionIndex,numberOfQuestions.value);
        currentQuestionIndex++;
        if(currentQuestionIndex == numberOfQuestions.value){
            nextButton.classList.add('d-none');
            finishButton.classList.remove('d-none');
        }
    }
});


nextButton.addEventListener('click',function(e){
    if(checkAnswer()){
        setTimeout(() => {
            quizQuestionsPage.children[0].children[3].innerHTML = Ui.displayCurrentQuestion(listOfQuestions[currentQuestionIndex],currentQuestionIndex,numberOfQuestions.value);
            currentQuestionIndex++;
            if(currentQuestionIndex == numberOfQuestions.value){
                nextButton.classList.add('d-none');
                finishButton.classList.remove('d-none');
            }
        }, 1000);
    }
});

finishButton.addEventListener('click',function(e){
    if(checkAnswer()){
        setTimeout(function(){
            quizQuestionsPage.classList.add('d-none');
            quizFinishPage.classList.remove('d-none');
            document.querySelector('.setScore').innerHTML = trueAnswerCount;
            currentQuestionIndex = 0;
            trueAnswerCount = 0;
        },1000);
    }
});

tryAgainButton.addEventListener('click',function(eventInfo){
    quizFinishPage.classList.add('d-none');
    quizWelcomePage.classList.remove('d-none');
});


// dark mode:


const darkModeContainer = '.dark-mode';
const modeIcon = '.dark-mode h6 i';
const modeLightOrDark = '.dark-mode h6 span';
const mainPage = 'main';
const welcomePageContainer = '.quiz-welcome-page .container';
const questionsPageContainer = '.quiz-questions-page .container';
const finishPageContainer = '.quiz-finish-page .container';

let currentModeState = 0; // 0 > light mode , 1 > dark mode
$(darkModeContainer).on('click',function(e){
    if(currentModeState == 0){ // change to dark mode
        $(modeIcon).addClass('fa-toggle-on');
        $(modeLightOrDark).html('dark');
        $(mainPage).css({backgroundImage: 'url(images/wave-haikei.png)'});
        $(welcomePageContainer).css({backgroundImage: 'linear-gradient(0deg , rgb(115 115 115), rgb(10 10 10))'});
        $(questionsPageContainer).css({backgroundImage: 'linear-gradient(0deg , rgb(115 115 115), rgb(10 10 10))'});
        $(finishPageContainer).css({backgroundImage: 'linear-gradient(0deg , rgb(115 115 115), rgb(10 10 10))'});
        currentModeState = 1;
    }
    else{ // change to light mode
        $(modeIcon).removeClass('fa-toggle-on');
        $(modeLightOrDark).html('light');
        $(mainPage).css({backgroundImage: 'url(images/waves.png)'});
        $(welcomePageContainer).css({backgroundImage: 'linear-gradient(0deg , rgba(3, 109, 171, 0.711), #13c391)'});
        $(questionsPageContainer).css({backgroundImage: 'linear-gradient(0deg , rgba(3, 109, 171, 0.711), #13c391)'});
        $(finishPageContainer).css({backgroundImage: 'linear-gradient(0deg , rgba(3, 61, 94, 0.711), #0685c5)'});
        currentModeState = 0;
    }
});

