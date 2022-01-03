const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionsElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const buttonArray = document.querySelectorAll('.btn')
const timer = 75
const penaltytime = 20

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)

function startGame() {
    debugger 
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    debugger
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    debugger
    questionsElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    debugger
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    debugger
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++; 
        setNextQuestion();
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
} 

function setStatusClass(element, correct) {
    debugger
    if (correct) {
        element,classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

const questions = [
    {
        question: 'Commonly used data types DO NOT include:',
        answers: [
            { text: '1. strings', correct: false },
            { text: '2. booleans', correct: false },
            { text: '3. alerts', correct: true },
            { text: '4. numbers', correct: false }
        ]
    },
    {
        question: 'The condition in an if/else statement is enclosed with _____________.',
        answers: [
            { text: '1. quotes', correct: false },
            { text: '2. curly brackets', correct: false },
            { text: '3. parenthesis', correct: true },
            { text: '4. square brackets', correct: false }
        ]
    },
    {
        question: 'Arrays in JavaScript can be used to store ____________.',
        answers: [
            { text: '1. numbers and strings', correct: false },
            { text: '2. other arrays', correct: false },
            { text: '3. booleans', correct: true },
            { text: '4. all of the above', correct: false }
        ]
    },
    {
        question: 'String values must be enclosed within ______________ when being assigned to variables.',
        answers: [
            { text: '1. commas', correct: false },
            { text: '2. curly brackets', correct: false },
            { text: '3. quotes', correct: true },
            { text: '4. parenthesis', correct: false }
        ]
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers: [
            { text: '1. JavaScript', correct: false },
            { text: '2. terminal/bash', correct: false },
            { text: '3. for loops', correct: true },
            { text: '4. console.log', correct: false }
        ]
    }
]