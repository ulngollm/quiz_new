class Template {
    param = {
        questionBlock: ".form__header",
        answerBlock: ".form__answers",
        errorBlock: "form__error",
        resultPageClass: "form_result",
        successPageClass: "form_success",
        successMessage: ".form__message"
    }
    templates = {
        input: null,
        textField: null,
        resultPage: null,
        successPage: null
    }
    resultMessage = {
        success: "Спасибо!👏<br> Благодарим за ответы! Мы свяжемся с вами в ближайшее время.",
        error: "Ошибка отправки формы"
    }
    page = {
        wrapper: null,
        header: null,
        body: null
    }
    constructor() {
        this.page.wrapper = document.querySelector('.form');
        this.templates.page = this.getTemplate('defaultPage');
        this.templates.input = this.getTemplate('field');
        this.templates.textField = this.getTemplate('textField');
        this.templates.resultPage = this.getTemplate('result');
        this.templates.successPage = this.getTemplate('success');

        this.init();

    }
    init() {
        this.page.wrapper.append(this.templates.page);
        this.page.header = this.page.wrapper.querySelector(this.param.questionBlock);
        this.page.body = this.page.wrapper.querySelector(this.param.answerBlock);
    }
    getTemplate(templateId) {
        return document.querySelector(`#${templateId}`).content.cloneNode(true);
    }
    clearTemplate() {
        this.page.wrapper.innerHTML = "";
    }
    clearPage() {
        this.page.header.innerHTML = "";
        this.page.body.innerHTML = "";
    }
    getAnswerPage(step) {
        this.setHeader(step.question);

        step.answers.forEach((element, index) => {
            let field = this.getInput(element, index);
            this.setBody(field);
        });
    }
    updatePage(step) {
        this.clearPage();
        this.getAnswerPage(step);
    }
    getFinalPage() {
        console.log('ehfehf');
        this.clearTemplate();
        this.page.wrapper.classList.add(this.param.resultPageClass);
        this.page.wrapper.append(this.templates.resultPage);
    }
    showSuccessPage(error = false) {
        this.clearTemplate();
        let successPage = this.templates.successPage;
        successPage.querySelector(this.param.successMessage).innerHTML = (error) ? this.resultMessage.error : this.resultMessage.success;
        this.page.wrapper.classList.add(this.successPageClass);
        this.page.wrapper.append(this.templates.successPage);
    }
    getInput(answerData, index) {
        let field = this.getTemplate('field');
        let input = field.querySelector('input');
        input.value = index;
        input.setAttribute('data-next', answerData.next)
        field.querySelector('.control__label').innerText = answerData.text;
        return field;

    }
    setHeader(text) {
        this.page.header.innerText = text;
    }
    setBody(elem) {
        this.page.body.append(elem);
    }
}
class Navigation {
    static currentStep = 0;
    static stepCount = 0;
    static nextStep() {
        if (this.currentStep < this.stepCount)
            this.currentStep++;
    }
    static prevStep() {
        if (this.currentStep > 0)
            this.currentStep--;
    }
    static init(stepCount) {
        this.stepCount = stepCount - 1;
        /* document.querySelector('.form__button_next').addEventListener('click', ()=>this.nextStep());
        document.querySelector('.form__button_prev').addEventListener('click', ()=>this.prevStep()); */
    }

}
class Data {
    static data = [];
    static getCurrentStepData() {
        let step = Navigation.currentStep;
        return this.getStepData(step);
    }
    static getStepData(index) {
        return this.data[index];
    }
    static init(data) {
        this.data = data;
    }
    static getResultsList(answersList) {
        let result = [];
        answersList.forEach(function (value, index) {
            let questionData = Data.getStepData(value.question);
            result[index] = new QuizAnswer(questionData.question, questionData.answers[value.answer].text)
        })
        return result;

    }

}

function QuizAnswer(questionText, answerText) {
    this.question = questionText;
    this.answer = answerText;
}
class Answers {
    constructor() {
        this.history = [];
        this.index = 0;
    }
    addAnswer(question, answer) {
        let newAnswer = {
            question: question,
            answer: answer
        };
        this.history.push(newAnswer)
    }

}
class FormController {
    constructor() {
        this.form = document.querySelector('form');
        this.init();
    }
    init() {
        this.form.addEventListener('change', () =>
            this.showError(false))
    }
    isValidStep() {
        let hasAnswer = this.form.checkValidity();
        return hasAnswer;
    }
    showError(notValid = true) {
        let errorBlock = document.querySelector(".form__error");
        console.log(errorBlock);
        if (notValid)
            errorBlock.classList.add(`form__error_active`);
        else errorBlock.classList.remove(`form__error_active`);

    }
    getAnswer() {
        return Number(this.form.querySelector('input:checked').value);
    }
    getNextStepIndex() {
        return Number(this.form.querySelector('input:checked').dataset.next);
    }
    static getUserData(e) {
        let jsonFormData = [];
        let formData = new FormData(e.target);
        for (let [name, value] of formData) {
            value = new QuizAnswer(name, value)
            jsonFormData.push(value);
        }
        return jsonFormData;
    }
    static sendRequest(answers, formData) {
        let xhr = new XMLHttpRequest();
        let data = answers.push(...formData);
        let request = JSON.stringify(data);
        xhr.open('POST', 'quiz.php');
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(request);
        console.log(request);

        xhr.onload = function () {
            console.log(xhr.response);
            if (xhr.status == 200)
                return true;
        }
    }



}
class Quiz {
    constructor(data) {
        Navigation.init(data.length);
        Data.init(data);
        this.answer = new Answers();
        this.template = new Template();
        this.formController = new FormController();
        this.init();
    }
    init() {
        this.template.getAnswerPage(Data.getCurrentStepData());
        document.querySelector('.form__button_next').addEventListener('click', () => this.getNextPage());
        document.querySelector('.form__button_prev').addEventListener('click', () => this.getPrevPage());
    }

    getNextPage() {
        if (this.formController.isValidStep()) { //или || this.answer.history[this.answer.index + 1]
            let nextStep = this.formController.getNextStepIndex();
            this.answer.addAnswer(Navigation.currentStep, this.formController.getAnswer());
            Navigation.currentStep = nextStep;
            this.answer.index++;
            if (nextStep)
                this.template.updatePage(Data.getCurrentStepData());
            else this.template.getFinalPage();
        } else this.formController.showError();
    }

    getPrevPage() {
        this.answer.index--;
        let step = this.answer.history[this.answer.index].step;
        this.template.updatePage(Data.getStepData(step));
    }
}



let quiz = new Quiz(step);