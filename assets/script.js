var score = 0
var initials = document.querySelector(".initials");
var currentQuestion = 0

var questions = [{
    q: "Why do developers use loops such as for and while?",
    a: [{text: "To rearrange an array.", isCorrect: false},
        {text: "To repeat a block of code.", isCorrect: true},
        {text: "To store data to the browser", isCorrect: false},
        {text: "To convert an object to a string", isCorrect: false}]
    },
    {
    q: "Inside which HTML element do we put the JavaScript?",
    a: [{text: "<js>", isCorrect: false},
        {text: "<scripting>", isCorrect: false},
        {text: "<javascript>", isCorrect: false},
        {text: "<script>", isCorrect: true}]    
    },
    {
    q: "How would you start a while statement in JavaScript?",
    a: [{text: "while (i <= 10)", isCorrect: true},
        {text: "while (i <= 10, i++)", isCorrect: false},
        {text: "while i = 1 to 10", isCorrect: false},
        {text: "while (i = 0; i < 5; i++)", isCorrect: false}] 
    },
    {
    q: "How do you create a function in JavaScript?",
    a: [{text: "function:myFunction()", isCorrect: false},
        {text: "function = myFunction()", isCorrect: false},
        {text: "function myFunction()", isCorrect: true},
        {text: "None of these.", isCorrect: false}]
    },
    {
    q: "Which event occurs when the user clicks on an HTML element?",
    a: [{text: "onchange", isCorrect: false},
        {text: "onmouseclick", isCorrect: false},
        {text: "onclick", isCorrect: true},
        {text: "onmouseover", isCorrect: false}]
    }
];


function generateQuestion() {
    var question = document.querySelector(".question");
    var answers = document.querySelector(".answers");
    question.textContent = question[currentQuestion].q;
    answers.innerHTML = "";
    
    for (let i=0; i <= questions[currentQuestion].a.length; i++) {
        var answersButton = document.createElement("button");
        answersButton.textContent = questions[currentQuestion].a[i].text;

        answers.appendChild(answersButton);
    }
}

function startGame() {
    this.toggleScreen("startScreen", false);
    this.toggleScreen("quiz", true);
}

function toggleScreen(id, toggle) {
    var element = document.getElementById(id);
    var display = (toggle) ? "block" : "none";
    element.style.display = display;
}