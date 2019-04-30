var counter = 0;

var queryURL = "https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple&encode=url3986";

$.ajax({
url: queryURL,
method: "GET"
}).then(function (initialQuestions) {

console.log(initialQuestions);

answer1 = `initialQuestions.results."0".correct_answer`;
answer2 = `initialQuestions.results."0".incorrect_answers[0]`;
answer3 = `initialQuestions.results."0".incorrect_answers[1]`;
answer4 = `initialQuestions.results."0".incorrect_answers[2]`;
question = `initialQuestions.results."0".question`;
answers = [answer1, answer2, answer3, answer4];

for (i=0; i<4; i++) {


var questionDiv = $(`<div class="custom-control custom-radio">`);
questionDiv.append(`<input type="radio" id="question${i}" name="customRadio" class="custom-control-input">`);
questionDiv.append(`<label class="custom-control-label" for="question${i}">${answers[i]}</label>`);
}

$("#movie-view").append(newDiv);

});

setTimeout(questionAsker(), 10000);

if (counter < 10) {
    questionAsker();
}

else if (counter=10) {
    newGame();
}

function questionAsker() {
    
    setTimeout(questionAsker(), 10000);
}

function newGame() {

}

function radioButtonRender() {

}
