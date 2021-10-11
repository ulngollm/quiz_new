import Quiz from "./quiz.js";
export default class Modal {
  static showQuiz(data = null) {
    let quiz = document.querySelector(".quiz");
    quiz.classList.add("quiz_open");
    document.body.classList.add("overlay");
    if (!quiz.querySelector(".quiz__body").innerHTML) Modal.initQuiz(data);
  }

  static hideQuiz(e) {
    let quiz = document.querySelector(".quiz");
    quiz.classList.add("quiz_removed");
    setTimeout(() => {
      quiz.classList.remove("quiz_removed", "quiz_open");
    }, 200);
    document.body.classList.remove("overlay");
  }

  static async initQuiz(data) {
    const quizWrapper = document.querySelector(".quiz");
    const quizContainer = quizWrapper.querySelector(".quiz__body");
    const closeButton = quizWrapper.querySelector(".quiz__close");
    quizWrapper.addEventListener('click', function (e) {
      if(e.target == e.currentTarget) Modal.hideQuiz();
    })
    closeButton.addEventListener('click', Modal.hideQuiz);

    let body = await fetch("quiz.html");
    if (body.status == 200) {
      quizContainer.innerHTML = await body.text();
      let quiz = new Quiz();
      await quiz.init(data);
    }
  }
}
