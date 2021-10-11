import Modal from './modal.js';

document.querySelector('button').addEventListener('click', Modal.showQuiz.bind(this, {url: 'questions.json'}));