const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.answer'));
const progressbar = document.querySelector('#progress-text');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswer = true;
let score = 0;
let questionCount = 0;
let availableQuestions = 0;

let questions = [{
    question: "You want to run a code block at least once, then loop as longas a condition remains true. Which kind of loop would you use?",
    choices1: "A for statement",
    choices2: "A nested for loop",
    choices3: "A do...while statement",
    choices4: "A while statement",
    answer: 3,
  },
  {
    question: "What do nested for loops do?",
    choices1: "Nested for  loops allow us to double check our if...else statements.",
    choices2: "Nested for loops are bad because they run forever.",
    choices3: "Nested for loops allow us to run multiple for loops at onece.",
    choices4: "Nested for loops run the same code twice.",
    answer: 3,
  },
  {
    question: "Which statement is true about while loops?",
    choices1: "while loops evaluate a condition for however long it's true and the looping stops when the condition is false.",
    choices2: "while loops always loop over a code block a know amount of times.",
    choices3: "while loops only run while the condition is false.",
    choices4: "while loops will run at least once, then will run again if their condition is true.",
    answer: 1,
  },
  {
    question: "Which statement is true about for loops?",
    choices1: "for loops always count from 0 upwards.",
    choices2: "for loops are appropriate when looping a predetermined number of times.",
    choices3: "for loops can never result in an infinite loop.",
    choices4: "for loops always run an unknown number of times.",
    answer: 2,
  },
  {
    question: "What is the general purpose of a loop?",
    choices1: "Loops read and recreatee code automatically.",
    choices2: "All loops help the computer make desicisions automatically.",
    choices3: "Loops iterate through arrays to find elements.",
    choices4: "Loops automatically iterate a block of code based on conditions.",
    answer: 4,
  }
];

const maxScores = 100;
const maxQuestions = 5;

  function startGame () {
  questionCount = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
}

function getNewQuestion() {
  if (availableQuestions.lenght === 0 || questionCount > maxScores) {
    localStorage.setItem('recentScore', score);
    return winndow.location.assign('/end.html');
  }

  questionCount++;
  progressbar.innerHTML = `Question ${questionCount} of ${maxQuestions}`;
  progressBarFull.style.width = `${(questionCount / maxQuestions) * 100}%`;
  
  const questionIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionIndex];
  question.innerrText = currentQuestion.question;

  choices.forEach(choices => {
    const number = choices.dataset['number'];
    choices.innerText = currentQuestion['choices' + number];
  })

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswer = true;
}

choices.forEach(choices => {
  choices.addEventListener('click', function(e) {
    if (!acceptingAnswer)
      return;
    acceptingAnswer = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    let classToApply = selectedAnswer== currentQuestion.answer ? 'correct' : 'incorrect';
  
    if (classToApply === 'correct') {
      score(maxScores);
    }

    selectedChoice.parentElement.classList.add(classToApply)
  
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion();
    }, 1000);
  })
});

incrmentScore = num => {
  score += num;
  scoreText.innerText = score;
}

console.log(startGame ());