import { questions } from "./questions.js";

const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const endScreen = document.getElementById("end-screen");
const endMessage = document.getElementById("end-message");
const restartButton = document.getElementById("restart-btn");
const questionCounterElement = document.getElementById("question-counter");
const startContainer = document.getElementById("start-container");

let shuffledQuestions, currentQuestionIndex;
let score = 0;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  resetState();
  questionElement.innerText = question.question;
  questionCounterElement.innerText = `Question ${currentQuestionIndex + 1} of ${
    questions.length
  }`;
  questionCounterElement.classList.remove("hide");
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";

  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct === "true");
    button.disabled = true;
  });

  if (correct) score++;

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    showEndScreen();
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

function showEndScreen() {
  questionContainerElement.classList.add("hide");
  nextButton.classList.add("hide");
  endScreen.classList.remove("hide");
  endMessage.innerText = `Your Score: ${score} / ${shuffledQuestions.length}`;
}

restartButton.addEventListener("click", restartGame);
function restartGame() {
  score = 0;
  currentQuestionIndex = 0;
  endScreen.classList.add("hide");
  questionContainerElement.classList.add("hide");
  answerButtonsElement.innerHTML = "";
  questionCounterElement.classList.add("hide");
  startButton.classList.remove("hide");
  startContainer.classList.remove("hide");
  nextButton.classList.add("hide");

  clearStatusClass(document.body);
}
