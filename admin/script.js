document.querySelector('.js-add').addEventListener('click', (e) => {
    addQuestion();

});

function deleteQuestion(elem){
    deleteNode(elem, '.question');
}

function deleteAnswer(elem){
    deleteNode(elem, '.answer__item');
}
function addQuestion(){
    let parent = document.querySelector('form');
    insertNode('#new_question', parent);
}
function addAnswer(elem){
    let parent = elem.closest('.answer__wrapper').querySelector('.answer');
    insertNode('#new_answer', parent);
}

function deleteNode(child, parent) {
    child.closest(parent).remove();
}
function insertNode(tmplFrom, nodeTo) {
    let template = document.querySelector(tmplFrom);
    nodeTo.appendChild(template.content.cloneNode(true))

}
function test(elem){
    console.log(elem.closest('.answer__item'));
}
let formData;

form = document.querySelector('form');
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let data = prepareForm();
    let request = JSON.stringify(data);
    response = fetch('form.php', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: request
      })
})

function prepareForm(){
    let data = [];
    for(let question of document.querySelectorAll('.question')){
        let param = {};
        param.question = question.querySelector('.quiestion__text input').value;
        param.answers = [];
        for(let elem of question.querySelectorAll('.answer__item')){
            let variant = {};
            variant.text = elem.querySelector('input[name="answer"]').value;
            variant.next = elem.querySelector('input[name="next"]').value;
            param.answers.push(variant);
        }
        data.push(param);
    }
    return data;
}