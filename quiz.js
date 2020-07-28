var quizAnswers = [];
var currentStep = 0;


function sendRequest() {
    let xhr = new XMLHttpRequest();
    let request = JSON.stringify(quizAnswers);
    xhr.open('POST', 'quiz.php');
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(request);

    xhr.onload = function () {
        console.log(xhr.response);
    }
    console.log(request);
}


//записываем след пользователя

function QuizAnswer(question, answer) {
    this.step = currentStep;
    this.question = question;
    this.answer = answer;
};

function addAnswer() {
    let question = document.querySelector('.form__header').innerText;
    let answer = (document.querySelector('input:checked') || document.querySelector('input[type="text"]')).value;
    let newAnswer = new QuizAnswer(question, answer);
    quizAnswers.push(newAnswer);
}

function editAnswer(step) {

}

function goFinalPage() {
    for (container of document.querySelectorAll('.form'))
        container.classList.toggle('form_hidden');
}

function initQuiz() {
    let step = quiz[currentStep];
    document.querySelector('.form__header').innerText = step['question'];
    document.querySelector('.form__body').innerHTML = '';
    showError(false);
    for (answer in step['answers']) {
        let elem = `<label class="control"><input type="radio" class="control__input" name="choose" value="${answer}" required><span class="control__label control__label_radio">${answer}</span></label>`;
        document.querySelector('.form__body').insertAdjacentHTML('beforeend', elem);
    }
    if (step['textField']) {
        let input = '<input class="input" type="text" name="other" placeholder="Другое">';
        document.querySelector('.form__body').insertAdjacentHTML('beforeend', input);
    }
}

function getInput() {

}
function checkValid(hasTextField){
    if(hasTextField) return document.querySelector('input:checked') || document.querySelector('input[name="other"]').value || null;
    else return document.querySelector('input:checked') || null;
}

function nextStep() {
    let answer = checkValid(quiz[currentStep]['textField']);
    if (answer) {
        answer = answer.value;
        addAnswer();
        currentStep = quiz[currentStep]['answers'][answer] || quiz[currentStep]['textField'];
        if (currentStep != "end") initQuiz();
        else goFinalPage();
    }
    else showError(true);
}

function showError(isError){
    let err = document.querySelector('.form__error');
    isError? err.classList.add('form__error_active'):err.classList.remove('form__error_active');
}

function prevStep() {
    if (currentStep > 0) {
        let step = quizAnswers.length - 1;
        currentStep = quizAnswers[step]['step'];
        quizAnswers.splice(step, 1);
        initQuiz();
    }
}

initQuiz();


document.querySelector('.form__button_next').addEventListener('click', nextStep);
document.querySelector('.form__button_prev').addEventListener('click', prevStep);
document.querySelector('input[name="other"]').addEventListener('focus', function(){
    document.querySelector('form.form__body').reset();
})

var form = document.querySelector('form.form__feedback');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('Отправить');
    let formData = new FormData(form);
    for (let [name, value] of formData) {
        ans = new QuizAnswer(name, value)
        quizAnswers.push(ans);
    }
    console.log(formData);
    console.log(JSON.stringify(formData));
    sendRequest();

})