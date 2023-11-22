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

var highScores = [];

function toggleScreen(id, toggle) {
    var element = document.getElementById(id);
    var display = (toggle) ? "block" : "none";
    element.style.display = display;
}

function startGame() {
    this.toggleScreen("startScreen", false);
    this.toggleScreen("quiz", true);
    isFinished = false;
    timerCount = 60;
    startTimer();
}

function loadQuestion() {
    const question = document.querySelector(".question")
    const answer = document.querySelector(".answers")
 
    question.textContent = questions[currentQuestion].q;
    answer.innerHTML = ""
 
    for (let i = 0; i < questions[currentQuestion].a.length; i++) {
        const choice = document.createElement("button");
 
        //choice.type = "radio";
        choice.name = "answer";
        choice.value = i;
 
        choice.textContent = questions[currentQuestion].a[i].text;
 
        answer.appendChild(choice);
    }
}

loadQuestion();

function loadScore() {
    this.toggleScreen("quiz", false);
    this.toggleScreen("endScreen", true);
    document.querySelector(".score").textContent = score;
    checkFinished();
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        finishValue = 1;
        loadScore();
        currentQuestion = 0;
        loadQuestion();
        resultMessage.innerHTML = "";
    }
}

const answer = document.querySelector(".answers")

answer.addEventListener("click", function(event) {
    event.preventDefault();
    function checkAnswer() {
        var target = event.target.value;
    
        if (questions[currentQuestion].a[target].isCorrect) {
            score++;
            resultMessage.textContent = "Correct!";
            nextQuestion();
        } else {
            resultMessage.textContent = "Incorrect.";
            timerCount-=10;
            nextQuestion();
        }
    };
    checkAnswer();
});


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
    initials.innerHTML = "";
    toggleScreen("endScreen", false);
    toggleScreen("header", false);
    toggleScreen("scoreScreen", true);
    }
    /* if (errorMessage !== null) {
        errorMessage.textContent = "";
    }; */
});

scoreButton.addEventListener("click", function(event) {
    event.preventDefault;
    renderHighscores();
    toggleScreen("startScreen", false);
    toggleScreen("endScreen", false);
    toggleScreen("header", false);
    toggleScreen("scoreScreen", true);
})

function storeResults() {
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

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

function init() {
    var storedScores = JSON.parse(localStorage.getItem("highScores"));
    highScores = storedScores;
    renderHighscores();
}

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

function checkFinished() {
    if (finishValue === 1) {
        isFinished = true;
    }
}

init();

returnButton.addEventListener("click", function(event) {
    event.preventDefault();
    toggleScreen("scoreScreen", false);
    toggleScreen("header", true);
    toggleScreen("startScreen", true);
    isFinished = false;
    score = 0;
    finishValue = 0;
    timerElement.textContent = "60 seconds left.";
    document.getElementById("header").style.display = "flex";
})

clearButton.addEventListener("click", function(event) {
    event.preventDefault();
    highScores = [];
    localStorage.clear();
    renderHighscores();
})