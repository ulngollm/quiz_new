export default class Navigation {
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
