const startButton = document.getElementById("start");
const timerEl = document.getElementById("count");
const description = document.getElementById("description");
const questionText = document.getElementById("question");
const answerBtns = document.getElementById("answer-container");
const scoreContainer = document.getElementById("score-container");
const scoreForm = document.getElementById("score-form");
const highScoresTable = document.getElementById("high-scores");
const tableBody = document.getElementById("high-scores");

const questions = [
    {
    question: "What is the function of the following operator? %",
    answers: [
        "raises the first operand to the power of the second operand.",
        "returns the division remainder.", 
        "compares two values."
        ],
    correct: 1
},
{
    question: "What does the property 'NaN' mean?",
    answers: [
        "Not-A-Number", 
        "None-And-Null", 
        "Null-And-Negative"
        ],
    correct: 1
},
{
    question: "What is the proper syntax for an array?",
    answers: [
    'var students = ["dan", "chris", "sean"]',
    'var students = {"dan", "chris", "sean"]', 
    'var students = [1: "dan", 2: "chris","sean"]'
    ],
    correct: 0
},
{
    question: "What does the method Date.parse() do?",
    answers: ["returns the date on the user's machine", 
    "returns the number of milliseconds from 01/01/1970", 
    "converts a string into a date object"],
    correct: 1
},
{
    question: "Which of the following methods is used to round a number down to its nearest integer?",
    answers: [
        "Math.round(x)", 
    "Math.floor(x)", "Math.ceil(x)"],
    correct: 1
},
{
    question: "What is the data type of NaN?",
    answers: ["object", "undefined", "number"],
    correct: 2
},
{
    question: "What type of scope do variables declared with 'var' have?",
    answers: ["global", "block", "function"],
    correct: 0
},
{
    question: "Which method allows you to merge two arrays?",
    answers: ["push()", "splice()", "concat()"],
    correct: 2
},
{
    question: "What does '===' do?",
    answers: ["checks if two values are equal in value and type", "assigns a value to a variable", "checks if two variables are inequal in value and type"],
    correct: 0
},
{
    question: "What does the keyword 'this' mean?",
    answers: ["refers to the global object", "refers to object executing the function", "refers to parent function of current function"],
    correct: 1
}];

let timeLeft = 60;
let timeInterval;

startButton.addEventListener("click", function () {
    startButton.setAttribute("style", "display: none");
    description.setAttribute("style", "display: none");
    countdown();
    showQuestions();
    createChoices();
});


function countdown () {
    var timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timerEl.textContent = timeLeft + ' seconds remaining...';
            timeLeft--;
        } else if (timeLeft === 1) {
            timerEl.textContent = timeLeft + ' second remaining...';
            timeLeft--;
        } else {
            timerEl.textContent = "Time's out!";
            clearInterval(timeInterval);
            endQuiz();
        }
    }, 1000);
}

let currentQuestionIndex = 0;

function showQuestions () {
    let currentQuestion = questions[currentQuestionIndex];
    questionText.innerHTML = currentQuestion.question;

};

function createChoices () {
 answerBtns.innerHTML = '';

 const currentAnswers = questions[currentQuestionIndex].answers;

 currentAnswers.forEach((answer,index) => {
    const answerBtn = document.createElement("button");
    answerBtn.textContent = answer;
    answerBtn.classList.add("answer-btn");

    answerBtn.setAttribute('data-index', index);
    answerBtn.addEventListener("click", (event => checkAnswer(event, timeLeft)));

    answerBtns.appendChild(answerBtn);
 });
};

let userScore = 0;

function checkAnswer (event) {
    const chosenAnswer = event.target;
    const chosenAnswerIndex = parseInt(chosenAnswer.getAttribute('data-index'));

    const correctAnswer = questions[currentQuestionIndex].correct;

    if (chosenAnswerIndex === correctAnswer) {
        userScore += 10;
        console.log('Correct!');
        currentQuestionIndex++;
    } else {
        console.log('Incorrect!')
        timeLeft -= 10;
        console.log(timeLeft);
        currentQuestionIndex++;
    } if (timeLeft < 0) {
        timeLeft = 0;
        endQuiz ();
    }
    
    if (currentQuestionIndex < questions.length) {
        showQuestions();
        createChoices();
    } else {
        console.log('Done!');
        endQuiz();
    }
}

function endQuiz () {
answerBtns.setAttribute('style','display: none');
questionText.setAttribute('style', 'display: none');
description.textContent = "Game Over!"
description.setAttribute("style", "display: block");
clearInterval(timeInterval);
scoreContainer.style.display = "block";
}
scoreForm.addEventListener("submit", submitScore);

function submitScore(event) {
    event.preventDefault();

    const initials = document.getElementById("initials").value.trim();
    if (!initials) {
        alert("Please enter your initials.");
        return;
    }

    // Save high score to local storage
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials: initials, score: userScore });
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("highScores", JSON.stringify(highScores));

    // Display high scores
    displayHighScores();
}

// Display high scores function
function displayHighScores() {
    highScoresTable.style.display = "block";
    tableBody.innerHTML = ''; // Clear previous entries

    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.forEach((score, index) => {
        if (score.score !== undefined) { // Check if score is defined
            const row = document.createElement("tr");
            row.innerHTML = `<td>${index + 1}</td><td>${score.initials}</td><td>${score.score}</td>`;
            tableBody.appendChild(row);
        }});
    

    highScoresTable.style.display = "block"; // Show the high scores table
};

