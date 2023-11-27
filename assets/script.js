var score = 0;
var initials = document.querySelector(".initials");
var timerCount;
var timerElement = document.getElementById("timer");
var currentQuestion = 0;
var isFinished = false;
var resultMessage = document.querySelector(".result");
var answerButtons = document.querySelectorAll("button");
var submitButton = document.querySelector(".submit");
var scoreButton = document.querySelector(".scoreButton");
var submitMessage = document.querySelector(".submitMessage");
var highScoresList = document.querySelector(".highScores");
var clearButton = document.querySelector(".clear");
var returnButton = document.querySelector(".return");
var finishValue = 0;

var questions = [{
    q: "Why do developers use loops such as for and while?",
    a: [{text: "1. To rearrange an array.", isCorrect: false},
        {text: "2. To repeat a block of code.", isCorrect: true},
        {text: "3. To store data to the browser", isCorrect: false},
        {text: "4. To convert an object to a string", isCorrect: false}]
    },
    {
    q: "Inside which HTML element do we put the JavaScript?",
    a: [{text: "1. <js>", isCorrect: false},
        {text: "2. <scripting>", isCorrect: false},
        {text: "3. <javascript>", isCorrect: false},
        {text: "4. <script>", isCorrect: true}]    
    },
    {
    q: "How would you start a while statement in JavaScript?",
    a: [{text: "1. while (i <= 10)", isCorrect: true},
        {text: "2. while (i <= 10, i++)", isCorrect: false},
        {text: "3. while i = 1 to 10", isCorrect: false},
        {text: "4. while (i = 0; i < 5; i++)", isCorrect: false}] 
    },
    {
    q: "How do you create a function in JavaScript?",
    a: [{text: "1. function:myFunction()", isCorrect: false},
        {text: "2. function = myFunction()", isCorrect: false},
        {text: "3. function myFunction()", isCorrect: true},
        {text: "4. None of these.", isCorrect: false}]
    },
    {
    q: "Which event occurs when the user clicks on an HTML element?",
    a: [{text: "1. onchange", isCorrect: false},
        {text: "2. onmouseclick", isCorrect: false},
        {text: "3. onclick", isCorrect: true},
        {text: "4. onmouseover", isCorrect: false}]
    }
];
//Array that holds saved scores
var highScores = [];
//Toggle function to change display of certain html elements
function toggleScreen(id, toggle) {
    var element = document.getElementById(id);
    var display = (toggle) ? "block" : "none";
    element.style.display = display;
}
//Starts game, event listener is in the html
function startGame() {
    this.toggleScreen("startScreen", false);
    this.toggleScreen("quiz", true);
    isFinished = false;
    timerCount = 60;
    resultMessage.textContent = "";
    startTimer();
}
//Loads the question and answers onto the page from the questions array
function loadQuestion() {
    const question = document.querySelector(".question")
    const answer = document.querySelector(".answers")
 
    question.textContent = questions[currentQuestion].q;
    answer.innerHTML = ""
 
    for (let i = 0; i < questions[currentQuestion].a.length; i++) {
        const choice = document.createElement("button");
 
        choice.name = "answer";
        choice.value = i;
 
        choice.textContent = questions[currentQuestion].a[i].text;
 
        answer.appendChild(choice);
    }
}

loadQuestion();
//Toggle screen to score submission screen, prints score
function loadScore() {
    this.toggleScreen("quiz", false);
    this.toggleScreen("endScreen", true);
    document.querySelector(".score").textContent = score;
    checkFinished();
}
//Moves to the next question in the array, or ends the quiz
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        finishValue = 1;
        loadScore();
        currentQuestion = 0;
        loadQuestion();
    }
}

const answer = document.querySelector(".answers")
//Checks if selected answer is correct, adjusts score, and prints message
answer.addEventListener("click", function(event) {
    event.preventDefault();
    function checkAnswer() {
        var target = event.target.value;
    
        if (questions[currentQuestion].a[target].isCorrect) {
            score++;
            resultMessage.textContent = "Correct!";
            submitMessage.textContent = "Correct!";
            nextQuestion();
        } else {
            resultMessage.textContent = "Incorrect.";
            submitMessage.textContent = "Incorrect.";
            timerCount-=10;
            nextQuestion();
        }
    };
    checkAnswer();
});

//Submit button prints error message if input is empty, adds new score to score array, updates stored array, resets input field, toggles display to high scores list
submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    if (initials.value === "") {
        var errorMessage = document.getElementById("endScreen").appendChild(document.createElement("p"));
        errorMessage.textContent = "Please enter your initials.";
    } else {
    newScoreText = [score, initials.value];
    highScores.push(newScoreText);
    storeResults();
    renderHighscores();
    initials.value = "";
    toggleScreen("endScreen", false);
    toggleScreen("header", false);
    toggleScreen("scoreScreen", true);
    }
});
//This is the view high scores button in header, toggles display to high score list, loads scores, and stops timer
scoreButton.addEventListener("click", function(event) {
    event.preventDefault;
    renderHighscores();
    toggleScreen("startScreen", false);
    toggleScreen("endScreen", false);
    toggleScreen("header", false);
    toggleScreen("quiz", false);
    toggleScreen("scoreScreen", true);
    clearInterval(timer);
})
//stores highscores array
function storeResults() {
    localStorage.setItem("highScores", JSON.stringify(highScores));
}
//renders each score in highscores array to the page
function renderHighscores() {
    highScoresList.innerHTML = "";

    for (var i = 0; i < highScores.length; i++) {
        var highScore = highScores[i].join(" - ");
        var li = document.createElement("li");

        li.textContent = highScore;
        li.setAttribute("data-index", i);
        highScoresList.appendChild(li);
    }
}
//parses the stored array values and assigns highscores array this value so stored scores will be rendered even after refresh
function init() {
    var storedScores = JSON.parse(localStorage.getItem("highScores"));
    if (storedScores !== null) {
        highScores = storedScores;
        renderHighscores();
    }
}
//function to start timer, display countdown, end timer, and load score submission screen
function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount + " seconds left.";
        if (timerCount >= 0) {
            if (isFinished && timerCount > 0) {
                clearInterval(timer);
                loadScore();
            }
        }
        if (timerCount === 0) {
            clearInterval(timer);
            loadScore();
        }
    }, 1000);
}
//function to change isFinished value to true for the timer to load score submission screen when all questions have been answered
function checkFinished() {
    if (finishValue === 1) {
        isFinished = true;
    }
}

init();
//Return button: resets values and takes users back to start screen
returnButton.addEventListener("click", function(event) {
    event.preventDefault();
    toggleScreen("scoreScreen", false);
    toggleScreen("header", true);
    toggleScreen("startScreen", true);
    isFinished = false;
    score = 0;
    finishValue = 0;
    currentQuestion = 0;
    loadQuestion();
    timerElement.textContent = "60 seconds left.";
    document.getElementById("header").style.display = "flex";
})
//Clear scores button: resets highscores array, clears local storage, removes previous scores' elements from page
clearButton.addEventListener("click", function(event) {
    event.preventDefault();
    highScores = [];
    localStorage.clear();
    renderHighscores();
})