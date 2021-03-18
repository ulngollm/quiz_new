class Template {
  param = {
    questionBlock: ".form__header",
    answerBlock: ".form__answers",
    errorBlock: "form__error",
    resultPageClass: "form_result",
    successPageClass: "form_success",
    successMessage: ".form__message",
  };
  templates = {
    input: null,
    textField: null,
    resultPage: null,
    successPage: null,
  };
  resultMessage = {
    success:
      "Спасибо!👏<br> Благодарим за ответы! Мы свяжемся с вами в ближайшее время.",
    error: "Ошибка отправки формы",
  };
  page = {
    wrapper: null,
    header: null,
    body: null,
  };
  constructor() {
    this.page.wrapper = document.querySelector(".form");
    this.templates.page = this.getTemplate("defaultPage");
    this.templates.input = this.getTemplate("field");
    this.templates.textField = this.getTemplate("textField");
    this.templates.resultPage = this.getTemplate("result");
    this.templates.successPage = this.getTemplate("success");

    this.init();
  }
  init() {
    this.page.wrapper.append(this.templates.page);
    this.page.header = this.page.wrapper.querySelector(
      this.param.questionBlock
    );
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
    this.clearTemplate();
    this.page.wrapper.classList.add(this.param.resultPageClass);
    this.page.wrapper.append(this.templates.resultPage);
  }
  showSuccessPage(success = true) {
    this.clearTemplate();
    let successPage = this.templates.successPage;
    successPage.querySelector(this.param.successMessage).innerHTML = success
      ? this.resultMessage.success
      : this.resultMessage.error;
    this.page.wrapper.classList.add(this.successPageClass);
    this.page.wrapper.append(this.templates.successPage);
  }
  getInput(answerData, index) {
    let field = this.getTemplate("field");
    let input = field.querySelector("input");
    input.value = index;
    input.setAttribute("data-next", answerData.next);
    field.querySelector(".control__label").innerText = answerData.text;
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
    if (this.currentStep < this.stepCount) this.currentStep++;
  }
  static prevStep() {
    if (this.currentStep > 0) this.currentStep--;
  }
  static init(stepCount) {
    this.stepCount = stepCount - 1;
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
  static async init(data) {
    if (typeof data == "string") {
      this.data = await this.getData(data);
    } else this.data = data;
  }
  static async getData(url) {
    let response = await fetch(url);
    return await response.json();
  }
  static getResultsList(answersList) {
    let result = [];
    answersList.forEach(function (value, index) {
      let questionData = Data.getStepData(value.question);
      result[index] = Answers.createAnswer(
        questionData.question,
        questionData.answers[value.answer].text
      );
    });
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
  static createAnswer(questionText, answerText) {
    return {
      question: questionText,
      answer: answerText,
    };
  }
  addAnswer(question, answer) {
    let newAnswer = {
      question: question,
      answer: answer,
    };
    this.history.push(newAnswer);
  }
}
class FormController {
  constructor() {
    this.form = document.querySelector("form");
    this.init();
  }
  init() {
    this.form.addEventListener("change", () => this.showError(false));
  }
  isValidStep() {
    let hasAnswer = this.form.checkValidity();
    return hasAnswer;
  }
  showError(notValid = true) {
    let errorBlock = document.querySelector(".form__error");
    console.log(errorBlock);
    if (notValid) errorBlock.classList.add(`form__error_active`);
    else errorBlock.classList.remove(`form__error_active`);
  }
  getAnswer() {
    return Number(this.form.querySelector("input:checked").value);
  }
  getNextStepIndex() {
    return Number(this.form.querySelector("input:checked").dataset.next);
  }
  getUserData(form) {
    let jsonFormData = [];
    let formData = new FormData(form);
    for (let [name, value] of formData) {
      value = new QuizAnswer(name, value);
      jsonFormData.push(value);
    }
    return jsonFormData;
  }
  submitFeedbackHandler(e, answers) {
    e.preventDefault();
    let jsonFormData = this.getUserData(e.target);
    let answerData = Data.getResultsList(answers);
    console.log(jsonFormData);
    let data = jsonFormData.concat(answerData);
    this.sendRequest(data);
  }
  async sendRequest(data) {
    let url = "result_handler.php";
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
    let result = await response.text();

    if (response.status == 200 && result != "error") {
      window.dispatchEvent(new CustomEvent("userDataSend", { detail: true }));
    } else
      window.dispatchEvent(new CustomEvent("userDataSend", { detail: false }));
  }
}
class Quiz {
  constructor(data) {
    Data.init(data);
    Navigation.init(Data.data.length);
    this.answer = new Answers();
    this.template = new Template();
    this.formController = new FormController();
    this.init();
  }
  init() {
    this.template.getAnswerPage(Data.getCurrentStepData());
    document
      .querySelector(".form__button_next")
      .addEventListener("click", () => this.getNextPage());
    document
      .querySelector(".form__button_prev")
      .addEventListener("click", () => this.getPrevPage());
    window.addEventListener("userDataSend", (e) =>
      this.template.showSuccessPage(e.detail)
    );
  }

  getNextPage() {
    if (this.formController.isValidStep()) {
      //или || this.answer.history[this.answer.index + 1]
      let nextStep = this.formController.getNextStepIndex();
      this.answer.addAnswer(
        Navigation.currentStep,
        this.formController.getAnswer()
      );
      Navigation.currentStep = nextStep;
      this.answer.index++;
      if (nextStep) this.template.updatePage(Data.getCurrentStepData());
      else this.getFinalPage();
    } else this.formController.showError();
  }

  getPrevPage() {
    this.answer.index--;
    let step = this.answer.history[this.answer.index].step;
    this.template.updatePage(Data.getStepData(step));
  }

  getFinalPage() {
    this.template.getFinalPage();
    let answers = this.answer.history;
    document.forms.feedback.addEventListener("submit", (e) =>
      this.formController.submitFeedbackHandler(e, answers)
    );
  }
}
let quiz = new Quiz('/structure.json');