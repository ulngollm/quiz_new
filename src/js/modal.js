import Quiz from "./quiz.js";
export default class Modal {
  static showQuiz() {
    let quiz = document.querySelector(".quiz");
    quiz.classList.add("quiz_open");
    document.body.classList.add("overlay");
    if (!quiz.querySelector(".quiz__body").innerHTML) Modal.initQuiz();
  }

  static hideQuiz() {
    let quiz = document.querySelector(".quiz");
    quiz.classList.add("quiz_removed");
    setTimeout(() => {
      quiz.classList.remove("quiz_removed", "quiz_open");
    }, 200);
    document.body.classList.remove("overlay");
  }

  static async initQuiz() {
    let body = await fetch("quiz.html");
    let quizContainer = document.querySelector(".quiz__body");
    if (body.status == 200) {
      quizContainer.innerHTML = await body.text();
      let quiz = new Quiz();
      await quiz.init({url: 'structure.json'});
    }
  }
}
