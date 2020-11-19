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
            correctAnswer: 'Canidae'
        },
        {
            question: 'How big do chihuahuas get?',
            answers: [
                '6-9 inches tall',
                '1-3 inches tall',
                '4-7 inches tall',
                '10-14 inches tall'
            ],
            correctAnswer: '6-9 inches tall'
        },
        {
            question: 'How many teeth on average does a huskey have?',
            answers: [
                '1',
                '68',
                '42',
                '1000'
            ],
            correctAnswer: '42'
        },
        {
            question: 'Which climate do pugs enjoy being in?',
            answers: [
                'dry but warm',
                'blazing heat',
                'cool weather with little to no humidity',
                'humid and cool'
            ],
            correctAnswer: 'cool weather with little to no humidity'
        },
        {
            question: 'What is the best show dog breed?',
            answers: [
                'Beagle',
                'German Sheppard',
                'Pitbull',
                'Poodle'
            ],
            correctAnswer: 'Poodle'
        },
    ],
    feedback: true,
    quizStarted: false,
    questionNumber: 0,
    score: 0,
    currentAnswer: ''
};

function generateMainPage() { 
    return `<div class="mainPage">
        <h2>Hipster Ipsum</h2>
        <p>This quiz will hopefully teach you some fun facts about dogs!</p>
        <button id="startQuiz">Start Quiz</button>
    </div>
    `;
}


function generateQuestion() {
    const question = store.questions[store.questionNumber];
    const answers = question.answers.map((answer, index) => {
            if (index === 0) {
                return `
            <input type="radio" id="answer${index}" name="answer" value="${answer}" required>
            <label for="answer${index}">${answer}</label><br>
            `;
            }
            return `
        <input type="radio" id="answer${index}" name="answer" value="${answer}">
          <label for="answer${index}">${answer}</label></br>`;
        });
    return `
    <div class="mainPage">
      <form id="question">
        <h2>${question.question}</h2>
        ${answers.join('')}
        <button type="form">Submit Answer</button>
      </form>
  
        <div class="quiz-info">
          <p>${store.questionNumber+1}/5</p>
          <p>${store.score}/${store.questionNumber} Correct</p>
        </div>
    `;
    }

function generateFeedbackPage(){
    let feedback = '';
    if(store.currentAnswer===store.questions[store.questionNumber].correctAnswer){
      feedback = `Awesome, thats the right answer!`;
    } else{
      feedback = `Oops, not quite!`;
    }
    return`
    <div class="mainPage">
        <h2>Feedback Question ${store.questionNumber+1}</h2>
        <img src="images/${store.questions[store.questionNumber].imgName}" alt="${store.questions[store.questionNumber].correctAnswer}">
        <p>The correct answer was: ${store.questions[store.questionNumber].correctAnswer}.</p>
        ${feedback}
        <p>You have gotten ${store.score}/${store.questionNumber+1} questions right so far.</p>
        <button type='submit' id="continue">Continue</button>
        </form>
      </div>
      `;
  }

  function generateFinalPage(){
    let feedback = '';
    if(store.currentAnswer===store.questions[store.questionNumber].correctAnswer){
      feedback = `Awesome, thats the right answer!`;
    } else{
      feedback = `Oops, not quite!`;
    }
    return`
    <div class="mainPage">
        <h2>Feedback Question ${store.questionNumber+1}</h2>
        <p>The correct answer was: ${store.questions[store.questionNumber].correctAnswer}.</p>
        ${feedback}
        <p>You're all done!<p>
        <p>You got ${store.score}/${store.questionNumber+1} questions right.</p>
        <button type='submit' id="home">Home</button>
        </form>
        <button type='submit' id="try-again">Try Again</button>
        </form>
      </div>
      `;
  }

function handleStartQuiz(){
   $('main').on('click', '#startQuiz', function(event){
       store.quizStarted = true;
       render();
       console.log(handleStartQuiz)
   });

}

function handleAnswerSubmit(){
    $('main').on('submit', '#question', (event)=>{
        event.preventDefault(); 
    let chosenAnswer = $("input[name='answer']:checked").val();
        console.log(chosenAnswer);
     if (chosenAnswer === store.questions[store.questionNumber].correctAnswer){
         store.feedback
         console.log(`true`);
         store.score++;
      // return correct
    } 
    store.questionNumber++;
     render();
});
}

    

    function handleRestart(){
        $('main').on('click', '#restart', (event) =>{
            store.quizStarted = false;
            render();
        })
    }



    function render() {
        let html = '';
        if (store.quizStarted === false) {
          html = generateMainPage();
        } else if (store.feedback === true) {
          html = generateQuestion();
        } else if (store.feedback === false && store.questionNumber === store.questions.length-1){
          html = generateFinalPage();
        } else{
          html = generateFeedbackPage();
        }
        $('main').html(html);
      }

function main() {
    render();
    handleStartQuiz();
    handleAnswerSubmit();
    handleRestart();
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
