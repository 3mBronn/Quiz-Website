const startBtn = document.querySelector('.start-btn');
const quizInfo = document.querySelector('.quiz-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const nextBtn = document.querySelector('.next-btn');
const revealButton = document.getElementById('revealButton');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const homePageBtn = document.querySelector('.homePage-btn');



startBtn.onclick = () => {
    quizInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    quizInfo.classList.remove('active'); 
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    quizInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');
    
    
    showQuestions(0);
    questionCounter(1);
    headerScore();
}

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active'); 
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

    headerScore();
}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

homePageBtn.onclick = () => {
    quizSection.classList.remove('active');
}



function questionCounter(index){
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`; 
}





nextBtn.onclick = () => {
    if(questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');
        revealButton.classList.remove('acvtive');
    }
    else{
        console.log('Quiz done.');
        showResult();
    }
}

const optionList = document.querySelector('.option-list');
//getting questions and options from array

function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;
    

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>
    <div class="option"><span>${questions[index].options[4]}</span></div>`;
    
    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for(let x = 0; x < option.length; x++){
        option[x].setAttribute('onclick', 'optionSelected(this)');
    }
}


function optionSelected(answer) {
   let userAnswer = answer.textContent;
   let correctAnswer = questions[questionCount].answer;
   let allOptions = optionList.children.length;

   if(userAnswer == correctAnswer){
       answer.classList.add('correct');
       userScore += 10;
       headerScore(); 
    }
   else{
     answer.classList.add('wrong'); 
     showAnswer();
     //for(let x = 0; x < allOptions; x++) {
        //   if(optionList.children[x].textContent == correctAnswer){
        //   option.children[x].classList.add('correct');
        //   }
       //}
   }    
   for(let x = 0; x < allOptions; x++){
       optionList.children[x].classList.add('disabled');
   }
   
   nextBtn.classList.add('active');
   revealButton.classList.add('active');
}


const correctAnswers = [ "B. Perro" ,
"A. Senorita",
"E. ¿A donde esta el bano?",
"C. Voy a casa de mi novia.",
"B. Cinco",
"E. Gusto en conocerte.",
"A. He estado en Espana.",
"C. Tengo 20 anos de edad.",
"E. Me gustaría tener una carne y una cerveza, por favor.",
"C. ¿Cuanto es eso?"
]

function showAnswer(){
let correctAnswer = questions[questionCount].answer;
let allOptions = optionList.children.length;
revealButton.onclick = () =>{
    for(x = 0; x <= allOptions; x++){
        if(optionList.children[x].textContent == correctAnswer){
            option.children[x].classList.add('correct');
        }
        else{
        alert("Correct Answer is " + correctAnswers[x]);
        console.log('User has requested the correct answer.');
        }
    }        

}
}





function headerScore(){
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length * 10}`;
}


function showResult(){
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length * 10}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -10;
    let progressEndValue = (userScore);
    let speed = 10;
    let progress = setInterval(() => {
        progressStartValue += 10;
        console.log(progressStartValue);

        progressValue.textContent = `${progressStartValue}% `;
        circularProgress.style.background = `conic-gradient(#fc1d1d ${progressStartValue * 3.6}deg, rgba(255,255,255,.1) 0deg)`;

        if(progressStartValue == progressEndValue){
            clearInterval(progress);
        }
    }, speed);
}