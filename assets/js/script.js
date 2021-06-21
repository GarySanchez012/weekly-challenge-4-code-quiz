var startGameBtn = document.getElementById("start-button");
var introcontainer = document.getElementById("intro");
var questionContainer = document.getElementById("question-container");
var currentIndex = 0;
var questionDisplay = document.getElementById("question");
var answerButtonEl = document.getElementById("answer-button");
var popup = document.getElementById("pop-up");
var timerEl = document.getElementById("countdown");
var gameEndEl = document.getElementById("end-game");
var finalScore = document.getElementById("final-score-info");
var submitBtnEl = document.getElementById("submit-button");
var nameOfPlayerEl = document.getElementById("player-name");

var questions = [
  {
    question: "Which of these are tags?",
    answers: [
      { text: "Element", correct: false },
      { text: "Class", correct: false },
      { text: "Id", correct: false },
      { text: "All of the above", correct: true },
    ],
  },
  {
    question: "Where is the script tagged placed in an HTML document?",
    answers: [
      { text: "Inside the head tag?", correct: false },
      { text: "At the top of the page?", correct: false },
      { text: "At the bottom of the body tag?", correct: true },
      { text: "In the recycle bin?", correct: false },
    ],
  },
  {
    question: "What is the most popular programming language in the world?",
    answers: [
      { text: "JavaScript?", correct: true },
      { text: "HTML", correct: false },
      { text: "Python", correct: false },
      { text: "JQuery", correct: false },
    ],
  },
  {
    question: "What is the element called that can continue to execute a block of code as long as the specified condition remains TRUE?",
    answers: [
      { text: "Repeater", correct: false },
      { text: "Loop", correct: true },
      { text: "Clone", correct: false },
      { text: "Debugger", correct: false },
    ],
  },
  {
    question: "What is a JavaScript element that represents either TRUE or FALSE values?",
    answers: [
      { text: "String", correct: false },
      { text: "Number", correct: false },
      { text: "Event", correct: false },
      { text: "Boolean", correct: true },
    ],
  },
];

var startGame = function () {
  console.log("this function works");
  introcontainer.classList.add("hide");
  questionContainer.classList.remove("hide");
  questionDisplay.textContent = questions[currentIndex].question;
  createAnswer();
  countDown();
};

var createAnswer = function () {
  answerButtonEl.innerHTML = "";
  for (var i = 0; i < questions[currentIndex].answers.length; i++) {
    thisButton = document.createElement("button");
    thisButton.classList.add("btn-btn");
    thisButton.textContent = questions[currentIndex].answers[i].text;
    if (questions[currentIndex].answers[i].correct) {
      thisButton.setAttribute("id", "true");
    }
    answerButtonEl.append(thisButton);
    thisButton.addEventListener("click", nextQuestion);
  }
};

var nextQuestion = function () {
  console.log("this works");
  if (this.getAttribute("id") === "true") {
    popup.classList.remove("hide");
    popup.textContent = "Correct!";
  } else {
    popup.classList.remove("hide");
    popup.textContent = "Incorrect!";
    timeLeft = timeLeft - 15;
  }
  currentIndex++;
  if (currentIndex < questions.length) {
    questionDisplay.textContent = questions[currentIndex].question;
    createAnswer();
  } else {
    gameEnd();
  }
};

var timeLeft = questions.length * 15;
var timeInterval;

var countDown = function () {
  timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerEl.textContent = "Timer: " + timeLeft;
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = "Timer: " + timeLeft;
      timeLeft--;
    } else {
      timerEl.textContent = "Timer: 0";
      alert("Time is up!");
      clearInterval(timeInterval);
      gameEnd();
    }
  }, 1000);
};

var gameEnd = function () {
  console.log("This is the end of the game!");
  score = timeLeft;
  clearInterval(timeInterval);
  questionContainer.classList.add("hide");
  gameEndEl.classList.remove("hide");
  finalScore.innerHTML = "Your score is " + score;
};

var saveScore = function (event) {
  console.log("submit btn works");
  event.preventDefault();
  totalScore = JSON.parse(localStorage.getItem("totalScore")) || [];
  var playerName = document.getElementById("player-name").value;
  var newScore = {
    playerName: playerName,
    score: score,
  };
  if (playerName === "") {
    alert("Name cannot be blank!");
  } else {
    totalScore.push(newScore);
    localStorage.setItem("totalScore", JSON.stringify(totalScore));
  }
};

startGameBtn.addEventListener("click", startGame);
submitBtnEl.addEventListener("click", saveScore);
