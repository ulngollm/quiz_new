import Answers from "./answers.js";
export default class FormController {
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
        value = Answers.createAnswer(name, value);
        jsonFormData.push(value);
      }
      return jsonFormData;
    }
    submitFeedbackHandler(e, answerData) {
      e.preventDefault();
      let jsonFormData = this.getUserData(e.target);
      // console.log(jsonFormData);
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