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

        $("#question").empty();
        $("#question").append($(`<div class="card" You got ${correct} correct answers and ${incorrect} incorrect answers>`))
        $("#question").append($(`<button type="button" class="btn btn-outline-dark">New Game?</button>`));

    };

};

function timedOut() {

    incorrect += 1;
    counter += 1;
    $("#question").empty();
    $("#question").append(`<div class="card">Sorry, you ran out of time. The answer was ${answer1}.</div>`);
    const checking = setTimeout(checker, 3000);
    checking();

};

    function questionRender() {

        // ajax call below populates screen with a question and creates data for button creation

        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function (initialQuestions) {
            
            $("#question").empty();
            answer1 = decodeURIComponent(initialQuestions.results[0].correct_answer);
            let answer2 = decodeURIComponent(initialQuestions.results[0].incorrect_answers[0]);
            let answer3 = decodeURIComponent(initialQuestions.results[0].incorrect_answers[1]);
            let answer4 = decodeURIComponent(initialQuestions.results[0].incorrect_answers[2]);
            let question = decodeURIComponent(initialQuestions.results[0].question);
            let answers = [answer1, answer2, answer3, answer4];
            let questionDiv = $(`<div class="card">`);
            questionDiv.append(question);
            $("#question").append(questionDiv);

            // answers do not currently randomize, need that functionality... correct answer always shows up first currently
    
            // for-loop generates buttons below, for answer selection

            for (i=0; i<4; i++) {
    
                let answerDiv = $(`<div class="custom-control custom-radio">`);
                answerDiv.append(`<input type="radio" id="answer${i}" name=${answers[i]} class="custom-control-input">`);
                answerDiv.append(`<label class="custom-control-label" for="answer${i}">${answers[i]}</label>`);
                $("#question").append(answerDiv);
    
            };
    
            // on-click function below for when answer is selected by user, which works except answers are always wrong even when they shouldn't be b/c i dont know how to capture value from label...

            $(".custom-control-input").click(function() {

                if (answer1 === $(this).val()) {
            
                    clearTimeout();
                    correct += 1;
                    counter += 1;
                    $("#question").empty();
                    $("#question").append(`<div class="card">Correct! The answer was ${answer1}.</div>`);
                    const checking = setTimeout(checker, 3000);
                    checking();
                }
            
                else {
            
                    clearTimeout();
                    incorrect += 1;
                    counter += 1;
                    $("#question").empty();
                    $("#question").append(`<div class="card">Sorry, incorrect answer. The answer was ${answer1}.</div>`);
                    const checking = setTimeout(checker, 3000);
                    checking();
                };
            
                });

            // insert timed-out function call here... it doesnt work if I put it right now, acts like it is timing out pre-emptively...

        });

    };

    // restart button below

    $(".btn btn-outline-dark").click(function() {

        counter = 0;
        correct = 0;
        incorrect = 0;
        questionRender();

    });