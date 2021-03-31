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
