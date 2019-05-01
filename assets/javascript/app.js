var counter = 0;
var correct = 0;
var incorrect = 0;
var answer1;

const queryURL = "https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple&encode=url3986";

questionRender();

function checker () {

    if (counter < 10) {

        questionRender();

    }

    else if (counter = 10) {

        $("#question").clear();
        $("#question").append($(`<div class="card" You got ${correct} correct answers and ${incorrect} incorrect answers>`))
        $("#question").append($(`<button type="button" onclick="newGame()" class="btn btn-outline-dark">New Game?</button>`));

    }

}

function answerChecker() {

    if (answer1 === $(this).val()) {

        correct += 1;
        counter += 1;
        $("#question").clear();
        $("#question").append(`<div class="card">Correct! The answer was ${answer1}.</div>`);
        setTimeout(checker, 3000);

    }

    else {

        incorrect += 1;
        counter += 1;
        $("#question").clear();
        $("#question").append(`<div class="card">Sorry, incorrect answer. The answer was ${answer1}.</div>`);
        setTimeout(checker, 3000);
    }

}

function newGame() {

    counter = 0;
    correct = 0;
    incorrect = 0;
    questionRender();

}

function questionRender() {

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function (initialQuestions) {
        
        $("#question").clear();
        answer1 = decodeURIComponent(initialQuestions.results[0].correct_answer);
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
        answerDiv.append(`<input type="radio" id="question${i}" onclick="answerChecker" name="customRadio" class="custom-control-input">`);
        answerDiv.append(`<label class="custom-control-label" for="question${i}">${answers[i]}</label>`);
        $("#question").append(answerDiv);

        }
    
        setTimeout(timedOut(), 10000);
    
        });

}

function timedOut() {

    incorrect += 1;
    counter += 1;
    $("#question").clear();
    $("#question").append(`<div class="card">Sorry, you ran out of time. The answer was ${answer1}.</div>`);
    setTimeout(checker, 3000);

}