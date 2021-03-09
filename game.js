// Grabing all the elements we need to manipulate
const question = document.querySelector('.question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswer = true
let score = 0
let questionCounter = 0
let availableQuestions = []

// Great array of the quiz questions with the answer choices
let questions = [{
    question: "What do nested for loops do?",
    choice1: "Nested for  loops allow us to double check our if...else statements.",
    choice2: "Nested for loops are bad because they run forever.",
    choice3: "Nested for loops allow us to run multiple for loops at onece.",
    choice4: "Nested for loops run the same code twice.",
    answer: 3,
  },
  {
    question: "Which statement is true about while loops?",
    choice1: "while loops evaluate a condition for however long it's true and the looping stops when the condition is false.",
    choice2: "while loops always loop over a code block a know amount of times.",
    choice3: "while loops only run while the condition is false.",
    choice4: "while loops will run at least once, then will run again if their condition is true.",
    answer: 1,
  },
  {
    question: "Which statement is true about for loops?",
    choice1: "for loops always count from 0 upwards.",
    choice2: "for loops are appropriate when looping a predetermined number of times.",
    choice3: "for loops can never result in an infinite loop.",
    choice4: "for loops always run an unknown number of times.",
    answer: 2,
  },
  {
    question: "What is the general purpose of a loop?",
    choice1: "Loops read and recreatee code automatically.",
    choice2: "All loops help the computer make desicisions automatically.",
    choice3: "Loops iterate through arrays to find elements.",
    choice4: "Loops automatically iterate a block of code based on conditions.",
    answer: 4,
  }
]

// Set up a scorecounter
const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

// Initial function to start off the  quiz
startGame = () => {
  questionCounter = 0
  score = 0
  availableQuestions = [...questions]
  getNewQuestion()
}

// function to grab new question 
getNewQuestion = () => {
  if (availableQuestions.length == 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)
    return window.location.assign('/finish.html')
  }

  questionCounter++
  // take question count and update onto the viewport
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
  const newLocal = 100;
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * newLocal}%`

  const questionIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionIndex]
  question.innerText = currentQuestion.question

  // check it the right answer is being picked
  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionIndex, 1)

  acceptingAnswers = true
}

// create eventlistener to listen for click of of the answer options
choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers)
      return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)
    //TIme between question
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()
    }, 500)
  })
});

incrementScore = num => {
  score += num
  scoreText.innerText = score
}

startGame()