const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('nextButton')
const questionContainerElement = document.getElementById('question-container')
const questionsElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const buttonArray = document.querySelectorAll('.btn')
const timer = document.getElementById('timer')
var countDownTimer = 75
var time;
const finalScoreDisplay = document.getElementById('score')
const finalScore =document.querySelector('.finalScore')
const submitScore = document.querySelector('.submitScore')
const initials = document.querySelector('.initials')
const viewScores = document.querySelector('.view-high-scores')
const highScores = document.getElementById('highScores')
const openingParagraph = document.getElementById('openingParagraph')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)

startButton.addEventListener('click', function() {
    openingParagraph.classList.add('hide')
})

function startGame() {
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
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

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
        answer: 'booleans'
    },
    {
        question: 'The condition in an if/else statement is enclosed with _____________.',
        choices: [
            'quotes',
            'curly brackets',
            'parenthesis',
            'square brackets'
        ],
        answer: 'curly brackets'
    },
    //     {
    //         question: 'Arrays in JavaScript can be used to store ____________.',
    //         answers: [
    //             { text: '1. numbers and strings', correct: false },
    //             { text: '2. other arrays', correct: false },
    //             { text: '3. booleans', correct: true },
    //             { text: '4. all of the above', correct: false }
    //         ]
    //     },
    //     {
    //         question: 'String values must be enclosed within ______________ when being assigned to variables.',
    //         answers: [
    //             { text: '1. commas', correct: false },
    //             { text: '2. curly brackets', correct: false },
    //             { text: '3. quotes', correct: true },
    //             { text: '4. parenthesis', correct: false }
    //         ]
    //     },
    //     {
    //         question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
    //         answers: [
    //             { text: '1. JavaScript', correct: true },
    //             { text: '2. terminal/bash', correct: false },
    //             { text: '3. for loops', correct: false },
    //             { text: '4. console.log', correct: false }
    //         ]
    //     }
]

    function endGame() {
        document.querySelector('.countdown').textContent = countDownTimer
        clearInterval(time);
        questionContainerElement.classList.add('hide')
        finalScoreDisplay.classList.remove('hide')
        finalScore.textContent = countDownTimer
    }

    
    submitScore.addEventListener('click', function (e) {
        e.preventDefault()
        let results = JSON.parse(localStorage.getItem("scores")) || []
        results.push ({intials: initials.value, score: countDownTimer})
        localStorage.setItem("scores", JSON.stringify(results))
        
    })

    viewScores.addEventListener('click', function (){
        finalScoreDisplay.classList.add('hide')
        highScores.classList.remove('hide')
        openingParagraph.classList.add('hide')
        startButton.classList.add('hide')
    })