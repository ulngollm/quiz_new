function includeCSS(file){
    let style = window.document.createElement('link')
    style.href = file;
    style.rel = "stylesheet";
    document.head.appendChild(style)
}
includeCSS('index.css');

function showQuiz(){
    let quiz = '<div class="quiz" onclick="hideQuiz()"><div class="quiz__modal"><a href="#" class="quiz__close"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="16.2635" width="4" height="23" rx="2" transform="rotate(45 16.2635 0)" fill="#C4C4C4" /><rect x="19.2635" y="16.2635" width="4" height="23" rx="2" transform="rotate(135 19.2635 16.2635)" fill="#C4C4C4" /> </svg> </a> <iframe class="quiz__body" src="input.html" frameborder="0"></iframe> </div> </div>';
    document.body.insertAdjacentHTML('beforeend', quiz);
    document.body.classList.add('overlay');
}
function hideQuiz(){
    let quiz = document.querySelector('.quiz').classList.add('quiz_removed');
    setTimeout(()=>document.querySelector('.quiz').remove(), 200);
    document.body.classList.remove('overlay');
}

document.querySelector('button').addEventListener('click', showQuiz);

