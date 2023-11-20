var score = 0;
var initials = document.querySelector(".initials");
var timerCount;
var timerElement = document.getElementById("timer");
var isFinished = false;
var resultMessage = document.querySelector(".result");
var answerButtons = document.querySelectorAll("button");
var submitButton = document.querySelector(".submit");
var submitMessage = document.querySelector(".submitMessage");

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

var currentQuestion = 0;

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
 
        choice.type = "radio";
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
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        loadScore();
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

function storeResults() {
    var scoreAndInitals = {
        score: score,
        initials: initials.value
    };
    localStorage.setItem("quizResults", JSON.stringify(scoreAndInitals));
}

submitButton.addEventListener("click", function() {
    storeResults();
    submitButton.style.display = "none";
    submitMessage.textContent = "Your score has been submitted."
});

function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount + " seconds left.";
        if (timerCount >= 0) //{
        //    if (isFinished && timerCount > 0) {
        //        clearInterval(timer);
        //        loadScore();
        //    }
        //}
        if (timerCount === 0) {
            clearInterval(timer);
            loadScore();
        }
    }, 1000);
}

/* function checkFinished() {
    //figure out some parameter to tell when the quiz is finished
    if (currentQuestion > 4) {
        isFinished = true;
    }
} */