const boxEl = document.querySelector('.box');
const questionEl = document.querySelector('.question');
const userInputEl = document.querySelector('.user-input');
const submitBtnEl = document.querySelector('.submit-btn');
const scoreEl = document.querySelector('.score');
const resultEl = document.querySelector('.result-text');
const answerEl = document.querySelector('.answer');

let nextBtn = null;
let calculationResult = null;
let score = parseInt(localStorage.getItem('yourScore') || 0);
scoreEl.textContent = score;
userInputEl.focus();

const generateQuestion = () => {
	const num1 = Math.round(Math.random() * 20 + 1);
	const num2 = Math.round(Math.random() * 20 + 1);
	calculationResult = num1 * num2;

	const question = `What is ${num1} * ${num2} ?`;
	questionEl.textContent = question;
	answerEl.style.display = 'none';
	return calculationResult;
};
generateQuestion();

const createNextBtn = () => {
	nextBtn = document.createElement('button');
	nextBtn.className = 'next-btn';
	nextBtn.textContent = 'Next';
	boxEl.appendChild(nextBtn);
};

const submit = () => {
	let myCurrentAnswer = +userInputEl.value;

	if (myCurrentAnswer <= 0) {
		alert('Please insert a valid answer!');
	} else if (calculationResult === myCurrentAnswer) {
		resultEl.textContent = '✅ CORRECT!';
		score++;
		scoreEl.textContent = score;
		submitBtnEl.setAttribute('disabled', '');
		createNextBtn();
		localStorage.setItem('yourScore', score);
	} else {
		resultEl.textContent = '❌ WRONG!';
		score--;
		scoreEl.textContent = score;
		answerEl.style.display = 'block';
		answerEl.textContent = `Correct answer is: ${calculationResult}`;
		submitBtnEl.setAttribute('disabled', '');
		createNextBtn();
		localStorage.setItem('yourScore', score);
	}
	nextBtn.focus();

	nextBtn.addEventListener('click', () => {
		generateQuestion();
		userInputEl.value = null;
		resultEl.textContent = null;
		submitBtnEl.removeAttribute('disabled', '');
		nextBtn.remove();
		userInputEl.focus();
	});
};

boxEl.addEventListener('submit', (event) => {
	event.preventDefault();
	submit();
});
