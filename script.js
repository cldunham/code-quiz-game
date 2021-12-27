const startButton = document.getElementById('startbtn')
const questionContainerElement = document.getElementById('question-container')

startButton.addEventListener('click', startGame)

function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    questionContainerElement.classList.remove('hide')
}

function setNextQuestion() {

}