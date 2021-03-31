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