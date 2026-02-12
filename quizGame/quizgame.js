//DOM ELEMENTS
const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");
const quizScreen = document.getElementById("quizScreen");
const questoinText = document.getElementById("questionText");
const currentQuestionSpan = document.getElementById("currentQuestionSpan");
const totalQuestionSpan = document.getElementById("totalQuestoin");
const scoreSpan = document.getElementById("score");
const progress = document.getElementById("progress");
const resultInfo = document.getElementById("resultInfo");
const finalScore = document.getElementById("finalScore");
const maxScore = document.getElementById("maxScore");
const resultMessege = document.getElementById("resultMessege");
const answerContainer = document.getElementById("answerContainer");
const restartButton = document.getElementById("restartBtn");

const quizQuestion = [
  {
    question: "What's the capital of Cambodia?",
    answers: [
      { text: "Phnom Penh", correct: true },
      { text: "Siem Reap", correct: false },
      { text: "Battambong", correct: false },
      { text: "Kohkong", correct: false },
    ],
  },
  {
    question: "Which province that has Angkor Wat temple?",
    answers: [
      { text: "Phnom Penh", correct: false },
      { text: "Siem Reap", correct: true },
      { text: "Battambong", correct: false },
      { text: "Kohkong", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];
//Quiz state var
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionSpan.textContent = quizQuestion.length;
maxScore.textContent = quizQuestion.length;

//Eventlistener
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);
function startQuiz() {
  //reset var
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestoin();
}

function showQuestoin() {
  //reset state
  answerDisabled = false;
  const currentQuestion = quizQuestion[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  const progressPercent = (currentQuestionIndex / quizQuestion.length) * 100;
  progress.style.width = progressPercent + "%";
  questoinText.textContent = currentQuestion.question;

  answerContainer.innerHTML = "";

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answerBtn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answerContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answerDisabled) return;
  answerDisabled = true;
  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  Array.from(answerContainer.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });
  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestion.length) {
      showQuestoin();
    } else {
      showResult();
    }
  }, 1000);
}
function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScore.textContent = score;

  const percentage = (score / quizQuestion.length) * 100;
  if (percentage === 100) {
    resultMessege.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessege.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessege.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessege.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessege.textContent = "Keep studying! You'll get better!";
  }
}
function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}
