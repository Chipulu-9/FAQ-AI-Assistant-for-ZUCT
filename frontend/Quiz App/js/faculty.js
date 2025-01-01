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
const currentQuestionNumber = document.getElementById('current-question');

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
            question: 'What is the primary purpose of an SSD?',
            answers: [
                { text: 'Store data temporarily', correct: false },
                { text: 'Store data permanently', correct: true },
                { text: 'Process audio signals', correct: false },
                { text: 'Connect to the internet', correct: false }
            ]
        },
        {
            question: 'Which device is used to input data into a computer?',
            answers: [
                { text: 'Monitor', correct: false },
                { text: 'Printer', correct: false },
                { text: 'Keyboard', correct: true },
                { text: 'Speakers', correct: false }
            ]
        },
        {
            question: 'Which protocol is commonly used to transfer files over the internet?',
            answers: [
                { text: 'HTTP', correct: false },
                { text: 'FTP', correct: true },
                { text: 'SMTP', correct: false },
                { text: 'DNS', correct: false }
            ]
        },
        {
            question: 'What is a characteristic of volatile memory?',
            answers: [
                { text: 'It loses data when power is off', correct: true },
                { text: 'It retains data permanently', correct: false },
                { text: 'It is used for external storage', correct: false },
                { text: 'It is slower than hard drives', correct: false }
            ]
        },
        {
            question: 'What is the purpose of a motherboard?',
            answers: [
                { text: 'To process graphics', correct: false },
                { text: 'To connect all computer components', correct: true },
                { text: 'To provide internet connectivity', correct: false },
                { text: 'To power the CPU', correct: false }
            ]
        },
        {
            question: 'What does the acronym BIOS stand for?',
            answers: [
                { text: 'Binary Input Output System', correct: false },
                { text: 'Basic Input Output System', correct: true },
                { text: 'Basic Interactive Operating System', correct: false },
                { text: 'Binary Instruction Operating System', correct: false }
            ]
        },
        {
            question: 'Which of these is an example of an operating system?',
            answers: [
                { text: 'Python', correct: false },
                { text: 'MySQL', correct: false },
                { text: 'Linux', correct: true },
                { text: 'Ethernet', correct: false }
            ]
        },
        {
            question: 'Which protocol is used for secure data transmission over the web?',
            answers: [
                { text: 'HTTPS', correct: true },
                { text: 'FTP', correct: false },
                { text: 'SMTP', correct: false },
                { text: 'TCP', correct: false }
            ]
        },
        {
            question: 'What does HTTP stand for?',
            answers: [
                { text: 'Hyper Text Transfer Protocol', correct: true },
                { text: 'Hyper Text Transmission Program', correct: false },
                { text: 'High Transfer Text Protocol', correct: false },
                { text: 'High Technology Text Processor', correct: false }
            ]
        },
        {
            question: 'Which of these is a programming language?',
            answers: [
                { text: 'HTML', correct: false },
                { text: 'HTTP', correct: false },
                { text: 'Python', correct: true },
                { text: 'FTP', correct: false }
            ]
        },
        {
            question: 'What is the main purpose of a CPU?',
            answers: [
                { text: 'To perform computations', correct: true },
                { text: 'To store data permanently', correct: false },
                { text: 'To cool down the computer', correct: false },
                { text: 'To connect to the internet', correct: false }
            ]
        },
        {
            question: 'What does DNS stand for?',
            answers: [
                { text: 'Domain Name System', correct: true },
                { text: 'Digital Network System', correct: false },
                { text: 'Data Number Service', correct: false },
                { text: 'Direct Network System', correct: false }
            ]
        },
        {
            question: 'Which of these is used for data encryption?',
            answers: [
                { text: 'AES', correct: true },
                { text: 'HTML', correct: false },
                { text: 'CSS', correct: false },
                { text: 'JPEG', correct: false }
            ]
        },
        {
            question: 'What is the main role of an operating system?',
            answers: [
                { text: 'To manage hardware and software resources', correct: true },
                { text: 'To browse the internet', correct: false },
                { text: 'To run antivirus programs', correct: false },
                { text: 'To perform calculations', correct: false }
            ]
        },
        {
            question: 'Which of the following is a type of malware?',
            answers: [
                { text: 'Firewall', correct: false },
                { text: 'Virus', correct: true },
                { text: 'HTML', correct: false },
                { text: 'Ethernet', correct: false }
            ]
        },
        {
            question: 'What is cloud computing?',
            answers: [
                { text: 'Using a computer at high altitudes', correct: false },
                { text: 'Storing and accessing data online', correct: true },
                { text: 'Backing up data on a local server', correct: false },
                { text: 'A type of computer hardware', correct: false }
            ]
        },
        {
            question: 'Which of these devices typically provides Wi-Fi?',
            answers: [
                { text: 'Router', correct: true },
                { text: 'Printer', correct: false },
                { text: 'Monitor', correct: false },
                { text: 'Keyboard', correct: false }
            ]
        },
        {
            question: 'What does GPU stand for?',
            answers: [
                { text: 'Graphics Processing Unit', correct: true },
                { text: 'General Processing Unit', correct: false },
                { text: 'Graphical Performance Utility', correct: false },
                { text: 'Global Processing Unit', correct: false }
            ]
        }

    ],

    Business: [{
            question: 'What is ROI?',
            answers: [
                { text: 'Return On Income', correct: false },
                { text: 'Rate Of Interest', correct: false },
                { text: 'Rate Of Inflation', correct: false },
                { text: 'Return On Investment', correct: true }
            ]
        },
        {
            question: 'What is market segmentation?',
            answers: [
                { text: 'Dividing market into groups', correct: true },
                { text: 'Selling products', correct: false },
                { text: 'Setting prices', correct: false },
                { text: 'Advertising', correct: false }
            ]
        },
        {
            question: 'What is a business plan?',
            answers: [
                { text: 'A daily schedule', correct: false },
                { text: 'A list of employees', correct: false },
                { text: 'A formal document outlining business goals', correct: true },
                { text: 'A financial statement', correct: false }
            ]
        },
        {
            question: 'What is depreciation?',
            answers: [
                { text: 'Increase in profits', correct: false },
                { text: 'Decrease in asset value over time', correct: true },
                { text: 'Business expansion', correct: false },
                { text: 'Employee salary', correct: false }
            ]
        },
        {
            question: 'What is a stakeholder?',
            answers: [
                { text: 'Business owner only', correct: false },
                { text: 'Customer only', correct: false },
                { text: 'Person affected by business activities', correct: true },
                { text: 'Employee only', correct: false }
            ]
        },
        {
            question: 'What is revenue?',
            answers: [
                { text: 'Total income from sales', correct: true },
                { text: 'Total expenses', correct: false },
                { text: 'Net profit', correct: false },
                { text: 'Total investments', correct: false }
            ]
        },
        {
            question: 'What is break-even point?',
            answers: [
                { text: 'Point where revenue equals costs', correct: true },
                { text: 'Point of maximum profit', correct: false },
                { text: 'Point of minimum expenses', correct: false },
                { text: 'Point of highest sales', correct: false }
            ]
        },
        {
            question: 'What is cash flow?',
            answers: [
                { text: 'Employee payroll', correct: false },
                { text: 'Movement of money in and out of business', correct: true },
                { text: 'Revenue from sales', correct: false },
                { text: 'Inventory purchase', correct: false }
            ]
        },
        {
            question: 'What is branding?',
            answers: [
                { text: 'Advertising campaign', correct: false },
                { text: 'Hiring employees', correct: false },
                { text: 'Setting prices', correct: false },
                { text: 'Creating a unique identity for a product', correct: true }
            ]
        },
        {
            question: 'What is equity?',
            answers: [
                { text: 'Loan from a bank', correct: false },
                { text: 'Total liabilities', correct: false },
                { text: 'Ownership interest in a company', correct: true },
                { text: 'Net revenue', correct: false }
            ]
        }
    ],

    Engineering: [{
            question: 'What is the SI unit of force?',
            answers: [
                { text: 'Watt', correct: false },
                { text: 'Joule', correct: false },
                { text: 'Newton', correct: true },
                { text: 'Pascal', correct: false }
            ]
        },
        {
            question: 'What is torque?',
            answers: [
                { text: 'Rotational force', correct: true },
                { text: 'Linear force', correct: false },
                { text: 'Pressure', correct: false },
                { text: 'Speed', correct: false }
            ]
        },
        {
            question: 'What is efficiency?',
            answers: [
                { text: 'Total power', correct: false },
                { text: 'Speed of operation', correct: false },
                { text: 'System cost', correct: false },
                { text: 'Output/Input ratio', correct: true }
            ]
        },
        {
            question: 'What is the purpose of a transformer?',
            answers: [
                { text: 'Change voltage levels', correct: true },
                { text: 'Generate electricity', correct: false },
                { text: 'Store energy', correct: false },
                { text: 'Measure current', correct: false }
            ]
        },
        {
            question: 'What is mechanical advantage?',
            answers: [
                { text: 'Output force/Input force ratio', correct: true },
                { text: 'Machine speed', correct: false },
                { text: 'Power output', correct: false },
                { text: 'Energy efficiency', correct: false }
            ]
        },
        {
            question: 'What is Ohm\'s Law?',
            answers: [
                { text: 'V = IR', correct: true },
                { text: 'P = VI', correct: false },
                { text: 'F = ma', correct: false },
                { text: 'E = mc²', correct: false }
            ]
        },
        {
            question: 'What is the unit of electrical resistance?',
            answers: [
                { text: 'Ohm', correct: true },
                { text: 'Ampere', correct: false },
                { text: 'Volt', correct: false },
                { text: 'Watt', correct: false }
            ]
        },
        {
            question: 'What is the first law of thermodynamics?',
            answers: [
                { text: 'Energy cannot be created or destroyed', correct: true },
                { text: 'Entropy of a system always increases', correct: false },
                { text: 'Heat flows from hot to cold', correct: false },
                { text: 'Work is a product of force and distance', correct: false }
            ]
        },
        {
            question: 'What is a diode used for?',
            answers: [
                { text: 'Allow current in one direction', correct: true },
                { text: 'Generate electricity', correct: false },
                { text: 'Store energy', correct: false },
                { text: 'Amplify signals', correct: false }
            ]
        },
        {
            question: 'What is Young\'s Modulus?',
            answers: [
                { text: 'A measure of elasticity', correct: true },
                { text: 'A measure of density', correct: false },
                { text: 'A measure of energy', correct: false },
                { text: 'A measure of speed', correct: false }
            ]
        }
        // ... Add 45 more Engineering questions following this pattern
    ]
};

// Enhanced shuffle function for better randomization
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Updated selectFaculty function to ensure new random questions each time
function selectFaculty(faculty) {
    currentFaculty = faculty;
    // Create a copy of all questions for this faculty
    let allQuestions = [...questionsData[faculty]];
    // Shuffle all questions
    allQuestions = shuffleArray(allQuestions);
    // Take only first 10 questions
    questions = allQuestions.slice(0, 10);
    startQuiz();
}

// Updated startQuiz function
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.classList.remove('hide');
    nextButton.classList.add('hide');
    restartButton.classList.add('hide');
    scoreContainer.classList.add('hide');
    currentQuestionNumber.textContent = '1';
    showQuestion();
}

// Add this function to handle quiz restart with new questions
function restartQuiz() {
    // Re-select faculty to get new random questions
    selectFaculty(currentFaculty);
}

// Update the restart button event listener
restartButton.addEventListener('click', () => {
    restartQuiz();
});

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    currentQuestionNumber.textContent = questionNumber;
    questionContainer.querySelector('#question').textContent =
        `Question ${questionNumber}: ${currentQuestion.question}`;

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
    nextButton.classList.add('hide');
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
        button.disabled = true;
    });

    if (currentQuestionIndex + 1 < questions.length) {
        nextButton.classList.remove('hide');
    } else {
        showFinalScore();
    }
}

function showFinalScore() {
    restartButton.classList.remove('hide');
    scoreContainer.classList.remove('hide');
    scoreElement.textContent = `${score} out of ${questions.length}`;

    const percentage = (score / questions.length) * 100;
    const feedbackElement = document.createElement('p');
    feedbackElement.textContent = getFeedbackMessage(percentage);
    scoreContainer.appendChild(feedbackElement);
}

function getFeedbackMessage(percentage) {
    if (percentage >= 90) return 'Excellent! Outstanding performance!';
    if (percentage >= 70) return 'Good job! Well done!';
    if (percentage >= 50) return 'Passed! Keep practicing!';
    return 'Keep studying and try again!';
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
});

document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname;
    if (currentPage.includes('it.html')) {
        selectFaculty('IT');
    } else if (currentPage.includes('business.html')) {
        selectFaculty('Business');
    } else if (currentPage.includes('engineering.html')) {
        selectFaculty('Engineering');
    }
});