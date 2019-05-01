var counter = 0;

const queryURL = "https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple&encode=url3986";

$.ajax({
url: queryURL,
method: "GET"
}).then(function (initialQuestions) {

console.log(initialQuestions);

let answer1 = decodeURIComponent(initialQuestions.results[0].correct_answer);
let answer2 = decodeURIComponent(initialQuestions.results[0].incorrect_answers[0]);
let answer3 = decodeURIComponent(initialQuestions.results[0].incorrect_answers[1]);
let answer4 = decodeURIComponent(initialQuestions.results[0].incorrect_answers[2]);
let question = decodeURIComponent(initialQuestions.results[0].question);
let answers = [answer1, answer2, answer3, answer4];
let questionDiv = $(`<div class="card">`);
questionDiv.append(question);
$("#question").append(questionDiv);
setTimeout(questionAsker, 10000);

for (i=0; i<4; i++) {

let answerDiv = $(`<div class="custom-control custom-radio">`);
answerDiv.append(`<input type="radio" id="question${i}" name="customRadio" class="custom-control-input">`);
answerDiv.append(`<label class="custom-control-label" for="question${i}">${answers[i]}</label>`);
console.log(answerDiv);
$("#question").append(answerDiv);
}

});

setTimeout(checker(), 10000);

function checker () {

    if (counter < 10) {
        questionAsker();
    }

    else if (counter=10) {
   newGame();
    }

}
function questionAsker() {

    questionRender();
    setTimeout(checker(),10000);

}

function newGame() {
    
}

function questionRender() {

    let answer1 = decodeURIComponent(initialQuestions.results[0].correct_answer);
    let answer2 = decodeURIComponent(initialQuestions.results[0].incorrect_answers[0]);
    let answer3 = decodeURIComponent(initialQuestions.results[0].incorrect_answers[1]);
    let answer4 = decodeURIComponent(initialQuestions.results[0].incorrect_answers[2]);
    let question = decodeURIComponent(initialQuestions.results[0].question);
    let answers = [answer1, answer2, answer3, answer4];
    let questionDiv = $(`<div class="card">`);
    questionDiv.append(question);
    $("#question").append(questionDiv);

    for (i=0; i<4; i++) {

        let answerDiv = $(`<div class="custom-control custom-radio">`);
        answerDiv.append(`<input type="radio" id="question${i}" name="customRadio" class="custom-control-input">`);
        answerDiv.append(`<label class="custom-control-label" for="question${i}">${answers[i]}</label>`);
        console.log(answerDiv);
        $("#question").append(answerDiv);

        }

}
