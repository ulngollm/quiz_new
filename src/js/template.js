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
      input.setAttribute("data-price", answerData.value);
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
  