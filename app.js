const store = {
    // 5 or more questions are required
    questions: [{
            question: 'What family do domestic dogs belong to?',
            answers: [
                'Amphibians',
                'Canidae',
                'Arthropods',
                'Birds'
            ],
            correctAnswer: 'Canidae',
            correct: "Yay! Thats right.",
            incorrect: "Uh-oh, not quite. The correct answer was, Canidae."
        },
        {
            question: 'How big do chihuahuas get?',
            answers: [
                '6-9 inches tall',
                '1-3 inches tall',
                '4-7 inches tall',
                '10-14 inches tall'
            ],
            correctAnswer: '6-9 inches tall',
            correct: "Yay! Thats right.",
            incorrect: "Uh-oh, not quite. The correct answer was, 6-9 inches tall."
        },
        {
            question: 'How many teeth on average does a huskey have?',
            answers: [
                '1',
                '68',
                '42',
                '1000'
            ],
            correctAnswer: '42',
            correct: "Yay! Thats right.",
            incorrect: "Uh-oh, not quite. The correct answer was, 42."
        },
        {
            question: 'Which climate do pugs enjoy being in?',
            answers: [
                'dry but warm',
                'blazing heat',
                'cool weather with little to no humidity',
                'humid and cool'
            ],
            correctAnswer: 'cool weather with little to no humidity',
            correct: "Yay! Thats right.",
            incorrect: "Uh-oh, not quite. The correct answer was, cool weather with little to no humidity."
        },
        {
            question: 'What is the best show dog breed?',
            answers: [
                'Beagle',
                'German Sheppard',
                'Pitbull',
                'Poodle'
            ],
            correctAnswer: 'Poodle',
            correct: "Yay! Thats right.",
            incorrect: "Uh-oh, not quite. The correct answer was, Poodle."
        },
    ],
    feedback: "",
    quizStarted: false,
    questionNumber: 0,
    score: 0,
};
//home page//
function generateMainPage() { 
    return `<div class="mainPage">
        <h2>Take the Dog Quiz</h2>   
        <p>This quiz will hopefully teach you some fun facts about dogs!</p>
        <button id="startQuiz">Start Quiz</button>
    </div>
    `;
}

// all questions//
function generateQuestion() { 
    //create 2 variables for answers and question//
    let question = store.questions[store.questionNumber];
    let answers = question.answers.map((answer, idx)=>{
        if (idx === 0){
            return `<input type="radio" id="answer${idx}" name="answer" value="${answer}" required>
        <label for="answer${idx}">${answer}</label><br>`;
        }   
        return `<input type="radio" id="answer${idx}" name="answer" value="${answer}">
        <label for="answer${idx}">${answer}</label><br>`;
    });
    return `<div class="mainPage">
        <form id="question">
        <div class = "keepScore"> Score:${store.score} of 5</div>
            <h2>Question ${store.questionNumber + 1} of 5</h2>
            <p>${question.question}</p>
            ${answers.join("")}
            <button type="submit">Submit Answer</button> 
            <p class="">${store.feedback}</p>
        </form>
        </div>
    `
}    

//end page//
function generateFinalPage() { 
    return `<div class="mainPage">
        <h2>Congrats, you have reached the end!</h2>
        <p>Final Score: ${store.score} out of 5</p>
        <button id="restartQuiz">Restart Quiz</button>
    </div>
    `;
}
    
//will start the quiz//
function handleStartQuiz(){
   $('main').on('click', '#startQuiz', function(_event){
       store.quizStarted = true;
       render();
       console.log(handleStartQuiz)
   });

}

//after user submits answer//
function handleAnswerSubmit(){
    $('main').on('submit', '#question', function (event) {
        event.preventDefault(); 
    let chosenAnswer = $("input[name='answer']:checked").val();
        console.log(chosenAnswer);
     if (chosenAnswer === store.questions[store.questionNumber].correctAnswer){
         //return correct
         store.feedback = store.questions[store.questionNumber].correct ;
         console.log(`true`);
         store.score++;
      // return incorrect
    } else {
    store.feedback = store.questions[store.questionNumber].incorrect;
    }
    store.questionNumber++;
     render();
});
}

    
//restart quiz button//
    function handleRestartQuiz(){
        $('main').on('click', '#restartQuiz', function (_event) {
            store.quizStarted = false;
            render();
            location.reload()
            console.log(handleRestartQuiz)
        })
    }



    function render() {
        let html = '';
    if (store.quizStarted) {
        if(store.questionNumber === store.questions.length){
        html = generateFinalPage()
          } else {
        html = generateQuestion();
        }
        } else {
        html = generateMainPage();
    }
        $('main').html(html);
      }

function main() {
    render();
    handleStartQuiz();
    handleAnswerSubmit();
    handleRestartQuiz();
}
$(main);

   
