export default class Answers {
  static history = [];
  static currentQuestionIndex = 0;

  static createAnswer(questionText, answerText) {
    return {
      question: questionText,
      answer: answerText,
    };
  }
  static historyBack() {
    this.currentQuestionIndex = (this.currentQuestionIndex - 1 < 0) ? 0 : this.currentQuestionIndex - 1;
  }
  static historyNext() {}

  static addAnswer(question, answer) {
    let newAnswer = this.createAnswer(question, answer);
    if (!this.history[this.currentQuestionIndex]) {
      this.history.push(newAnswer);
    }
    else this.history[this.currentQuestionIndex] = newAnswer;
    this.currentQuestionIndex++;
  }
  static removeAnswerByIndex(historyIndex) {
    this.history.splice(historyIndex);
  }
}