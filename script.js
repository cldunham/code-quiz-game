const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('nextButton')
const questionContainerElement = document.getElementById('question-container')
const questionsElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const buttonArray = document.querySelectorAll('.btn')
const timer = document.getElementById('timer')
let countDownTimer = 75
var time;
const finalScoreDisplay = document.getElementById('score')
const finalScore =document.querySelector('.finalScore')
const submitScore = document.querySelector('.submitScore')
const initials = document.querySelector('.initials')
const viewScores = document.querySelector('.view-high-scores')
const highScores = document.getElementById('highScores')
const openingParagraph = document.getElementById('openingParagraph')
const clear = document.getElementById('clear')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)

function startGame() {
    countDownTimer = 75
    time = setInterval(() => {
        countDownTimer = countDownTimer - 1
        if (countDownTimer <= 0) {
            endGame()
        }
        else {
        document.querySelector('.countdown').textContent = countDownTimer
        }
    }, 1000);
    startButton.classList.add('hide')
    openingParagraph.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

document.getElementById('goBack').addEventListener("click", function(){
    startButton.classList.remove('hide')
    openingParagraph.classList.remove('hide')
    highScores.classList.add('hide')
})

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionsElement.innerText = question.question
    question.choices.forEach(answer => {
        const button = document.createElement('button')
        button.textContent = answer
        button.classList.add('btn')
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
            (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {

    const selectedButton = e.target.textContent
    var correctAnswer = shuffledQuestions[currentQuestionIndex].answer
    if (selectedButton === correctAnswer) {
        document.querySelector('.result').textContent = 'Correct'
    }
    else {
        document.querySelector('.result').textContent = 'Wrong'
        countDownTimer=countDownTimer-20
    }
    setTimeout(() => {
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            currentQuestionIndex++;
            setNextQuestion();
        } else {
            endGame()
        }
        document.querySelector('.result').textContent = ''
    }, 2000);

}

const questions = [
    {
        question: 'Commonly used data types DO NOT include:',
        choices: [
            'strings',
            'booleans',
            'alerts',
            'numbers'
        ],
        answer: 'alerts'
    },
    {
        question: 'The condition in an if/else statement is enclosed with _____________.',
        choices: [
            'quotes',
            'curly brackets',
            'parenthesis',
            'square brackets'
        ],
        answer: 'parenthesis'
    },
    {
         question: 'Arrays in JavaScript can be used to store ____________.',
         choices: [
             'numbers and strings',
             'other arrays',
             'booleans',
             'all of the above'
         ],
        answer: 'all of the above'
    },
    {
        question: 'String values must be enclosed within ______________ when being assigned to variables.',
        choices: [
            'commas',
            'curly brackets',
            'quotes',
            'parenthesis'
        ],
        answer: 'quotes'
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        choices: [
            'JavaScript',
            'terminal/bash',
            'for loops',
            'console.log'
            ],
        answer: 'console.log'
    }
]

    function endGame() {
        debugger
        document.querySelector('.countdown').textContent = ""
        clearInterval(time);
        questionContainerElement.classList.add('hide')
        finalScoreDisplay.classList.remove('hide')
        finalScore.textContent = countDownTimer
    }

    
    submitScore.addEventListener('click', function (e) {
        debugger
        e.preventDefault()
        let results = JSON.parse(localStorage.getItem("scores")) || []
        results.push ({initials: initials.value, score: countDownTimer})
        localStorage.setItem("scores", JSON.stringify(results))
        
    })

    viewScores.addEventListener('click', viewHighScores)

    clear.addEventListener('click', function (){
        localStorage.clear() 
        viewHighScores()
    })

    function viewHighScores (){
        debugger
        if (time) endGame()
        finalScoreDisplay.classList.add('hide')
        highScores.classList.remove('hide')
        openingParagraph.classList.add('hide')
        startButton.classList.add('hide')
        let results = JSON.parse(localStorage.getItem("scores")) || []
        document.querySelector(".results").textContent=""
        for (let i=0; i<results.length; i++) {
            var initials = results[i].initials
            var score = results[i].score
            var div = document.createElement('div')
           // var displayInitials = document.createElement('p')
            var displayScores = document.createElement('p')
            //div.appendChild(displayInitials)
            div.appendChild(displayScores)
            //displayInitials.textContent=initials
            displayScores.textContent=`${initials} - ${score}`
            document.querySelector(".results").appendChild(div)
        }
    }