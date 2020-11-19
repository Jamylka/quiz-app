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
    quizStarted: false,
    questionNumber: 0,
    score: 0,
    currentAnswer: '',
    feedbackGiven: true
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
        </form>
        </div>
    `
}    

//feeback page
function generateFeedbackPage() {
    //display feedback
    let feedback = '';
    if (store.currentAnswer === store.questions[store.questionNumber].correctAnswer) {
        feedback = store.questions[store.questionNumber].correct;
    } else {
        feedback = store.questions[store.questionNumber].incorrect;
    }
    return `<div class="mainPage">
    <form id="nextQuestion">
    <div class = "keepScore"> Score:${store.score} of 5</div>
        <h2>Question ${store.questionNumber + 1} of 5</h2>
        <p>${store.questions[store.questionNumber].question}</p>
        <p class="">${feedback}</p>
        <button type="submit">Next Question</button> 
    </form>
    </div>
    `
}

//end page//
function generateFinalPage() { 
    let feedback = '';
    if (store.currentAnswer === store.questions[store.questionNumber].correctAnswer) {
        feedback = store.questions[store.questionNumber].correct;
    } else {
        feedback = store.questions[store.questionNumber].incorrect;
    }
    return `<div class="mainPage">
        <h2>Question ${store.questionNumber + 1} of 5</h2>
        <p>${store.questions[store.questionNumber].question}</p>
        <p class="">${feedback}</p>
        <h2>Congrats, you have reached the end!</h2>
        <p>Final Score: ${store.score} out of 5</p>
        <button id="restartQuiz">Restart Quiz</button>
    </div>
    `;
}
    
//will start the quiz//
function handleStartQuiz(){
   $('main').on('click', '#startQuiz', function(event){
       store.quizStarted = true;
       render();
       console.log(handleStartQuiz)
   });

}


function handleNextQuestion() {
    $('main').on('submit', '#nextQuestion', function (event) {
        event.preventDefault();  
        store.feedbackGiven = true;
        store.currentAnswer = '';
        store.questionNumber++;
        render();
    });
}


//after user submits answer//
function handleAnswerSubmit(){
    $('main').on('submit', '#question', function (event) {
        event.preventDefault(); 
    store.currentAnswer = $("input[name='answer']:checked").val();
        console.log(store.currentAnswer);
        store.feedbackGiven = false;
     if (store.currentAnswer === store.questions[store.questionNumber].correctAnswer){
         //return correct
         console.log(`true`);
         store.score++;
      // return incorrect
    }
     render();
});
}

    
//restart quiz button//
    function handleRestartQuiz(){
        $('main').on('click', '#restartQuiz', function (_event) {
            store.quizStarted = false;
            store.feedbackGiven = true;
            store.currentAnswer = '';
            store.score = 0;
            store.questionNumber = 0;
            render();
            console.log(handleRestartQuiz)
        })
    }
    
    
    
    function render() {
    let html = '';
    if (store.quizStarted === false) {
        html = generateMainPage();
    } else if  (store.feedbackGiven === true) {
        html = generateQuestion();
    } else if (store.feedbackGiven === false && store.questionNumber === store.questions.length -1) {
        html = generateFinalPage();
    } else {  
        html = generateFeedbackPage();
}
    $('main').html(html);
    }






    // function render() {
    //     let html = '';
    //     if (store.quizStarted) {
    //     if(store.questionNumber === store.questions.length){
    //     html = generateFinalPage()
    //       } else {
    //     html = generateQuestion();
    //     }
    //     } else {
    //     html = generateMainPage();
    // }
    //     $('main').html(html);
    //   }

function main() {
    render();
    handleStartQuiz();
    handleAnswerSubmit();
    handleRestartQuiz();
    handleNextQuestion();

}
$(main);

    
    /**
     * 
     * Technical requirements:
     * 
     * Your app should include a render() function, that regenerates the view each time the store is updated. 
     * See your course material and access support for more details.
     *
     * NO additional HTML elements should be added to the index.html file.
     *
     * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
     *
     * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
     * 
     */

    /********** TEMPLATE GENERATION FUNCTIONS **********/

    // These functions return HTML templates

    /********** RENDER FUNCTION(S) **********/

    // This function conditionally replaces the contents of the <main> tag based on the state of the store

    /********** EVENT HANDLER FUNCTIONS **********/
