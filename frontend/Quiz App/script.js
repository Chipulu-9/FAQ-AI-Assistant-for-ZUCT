let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let currentFaculty = '';

const questionContainer = document.getElementById('question-container');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const quizContainer = document.getElementById('quiz-container');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');

const questionsData = {
    IT: [{
            question: 'What does HTML stand for?',
            answers: [
                { text: 'Hyper Text Markup Language', correct: true },
                { text: 'High Tech Modern Language', correct: false },
                { text: 'Hyper Transfer Markup Language', correct: false },
                { text: 'Home Tool Markup Language', correct: false }
            ]
        },
        {
            question: 'Which programming language is known as the "language of the web"?',
            answers: [
                { text: 'Java', correct: false },
                { text: 'Python', correct: false },
                { text: 'JavaScript', correct: true },
                { text: 'C++', correct: false }
            ]
        }
    ],
    Business: [{
            question: 'What is ROI?',
            answers: [
                { text: 'Return On Investment', correct: true },
                { text: 'Return On Income', correct: false },
                { text: 'Rate Of Interest', correct: false },
                { text: 'Rate Of Inflation', correct: false }
            ]
        },
        {
            question: 'Which of these is not a type of business ownership?',
            answers: [
                { text: 'Sole Proprietorship', correct: false },
                { text: 'Partnership', correct: false },
                { text: 'Corporation', correct: false },
                { text: 'Multiplication', correct: true }
            ]
        }
    ],
    Engineering: [{
            question: 'What is the SI unit of force?',
            answers: [
                { text: 'Watt', correct: false },
                { text: 'Newton', correct: true },
                { text: 'Joule', correct: false },
                { text: 'Pascal', correct: false }
            ]
        },
        {
            question: 'Which law states that energy cannot be created or destroyed?',
            answers: [
                { text: 'Newton\'s First Law', correct: false },
                { text: 'Ohm\'s Law', correct: false },
                { text: 'Law of Conservation of Energy', correct: true },
                { text: 'Boyle\'s Law', correct: false }
            ]
        }
    ]
};

// Function to shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function selectFaculty(faculty) {
    currentFaculty = faculty;
    // Get all questions for the faculty and shuffle them
    let allQuestions = [...questionsData[faculty]];
    allQuestions = shuffleArray(allQuestions);
    // Take only 10 questions
    questions = allQuestions.slice(0, 10);
    startQuiz();
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.classList.remove('hide');
    nextButton.classList.add('hide');
    restartButton.classList.add('hide');
    scoreContainer.classList.add('hide');
    updateFacultyHeader();
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionContainer.querySelector('#question').textContent = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) score++;

    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });

    if (currentQuestionIndex + 1 < questions.length) {
        nextButton.classList.remove('hide');
    } else {
        restartButton.classList.remove('hide');
        scoreContainer.classList.remove('hide');
        scoreElement.textContent = `${score} out of ${questions.length}`;
    }
}

function setStatusClass(element, correct) {
    if (correct) {
        element.style.backgroundColor = '#4CAF50';
    } else {
        element.style.backgroundColor = '#f44336';
    }
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion();
    nextButton.classList.add('hide');
});

restartButton.addEventListener('click', () => {
    startQuiz();
});

// Add this new function to update the faculty header
function updateFacultyHeader() {
    // First, remove any existing faculty header
    const existingHeader = document.getElementById('faculty-header');
    if (existingHeader) {
        existingHeader.remove();
    }

    // Create and insert new faculty header
    const facultyHeader = document.createElement('h2');
    facultyHeader.id = 'faculty-header';
    facultyHeader.textContent = `${currentFaculty} Quiz`;

    // Insert the header after the main title but before the quiz container
    quizContainer.insertAdjacentElement('beforebegin', facultyHeader);
}