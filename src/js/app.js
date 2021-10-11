import Modal from './modal.js';

document.querySelector('button').addEventListener('click', Modal.showQuiz);
document.querySelector('.quiz').addEventListener('click', function (e) {
  if(e.currentTarget == e.target) Modal.hideQuiz();
})
document.querySelector('.quiz__close').addEventListener('click', Modal.hideQuiz);