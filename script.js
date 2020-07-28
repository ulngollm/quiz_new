class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentStep = 0;
  }
  createControl(value, index) {
    return `<label class="control"><input type="radio" class="control__input" name="choose" value="${value}" data-next="${index}"><span class="control__label control__label_radio">${value}</span></label>`;
  }
  createEmptyField(index) {
    return `<input type="text" class="input" placeholder="Другое..." data-next="${index}"'>`;
  }
  setHeadline(value) {
    document.querySelector('.form__header').innerText = value;
  }
  addField(value, index, emptyField = false) {
    let input = !emptyField ? this.createControl(value, index) : this.createEmptyField(index);
    document.querySelector('.form__body').insertAdjacentHTML('beforeend', input);
  }
  clearQuiz() {
    document.querySelector('.form__body').innerHTML = '';
  }
  initQuiz() {
    this.clearQuiz();
    let step = this.currentStep;
    this.setHeadline(this.questions[step].question);
    for (var value in this.questions[step].answers) {
      this.addField(value, value[value]);
    }
    if (this.questions[step].textField) {
      this.addField('',  true);
    }
  }
  nextStep() {
    if (this.currentStep != 'end') {
      
      this.currentStep=this.question;
      this.initQuiz();
    }
    else this.goFinalPage();
  }

  prevStep() {

  }

  goFinalPage() {
    this.clearQuiz();
  }

}

class UserAnswer{
  static answers = [];
  static history = [0];

  static addAnswer(){
    let newAnswer = {
      question : question,
      answer: this.getAnswer()
    };
    this.answers.push(newAnswer);
  }

  static addToHistory(step){
    this.history.push(step);
  }
  getAnswer(){
    return (document.querySelector('input:checked') || document.querySelector('input[type="text"]')).value;
  }
  getNextStep(){

  } 

}



let quiz = new Quiz(structure);
quiz.initQuiz();

document.querySelector('.form__button_next').addEventListener('click', ()=>quiz.nextStep());
document.querySelector('.form__button_prev').addEventListener('click', ()=>quiz.prevStep);


