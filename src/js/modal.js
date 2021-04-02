function showQuiz() {
  let quiz = document.querySelector('.quiz');
  quiz.classList.add('quiz_open');
  document.body.classList.add('overlay');
  if (!quiz.querySelector('.quiz__body').innerHTML) initQuiz();
}

function hideQuiz() {
  let quiz = document.querySelector('.quiz');
  quiz.classList.add('quiz_removed');
  setTimeout(() => {
    quiz.classList.remove('quiz_removed', 'quiz_open');
  }, 200);
  document.body.classList.remove('overlay');
}
async function initQuiz() {
  let body = await fetch('quiz.html');
  let quizContainer = document.querySelector('.quiz__body');
  if (body.status == 200) {
    quizContainer.innerHTML = await body.text();
    quiz = new Quiz(data);
  }
}
document.querySelector('button').addEventListener('click', showQuiz);
document.querySelector('.quiz').addEventListener('click', function (e) {
  if(e.currentTarget == e.target) hideQuiz();
})
document.querySelector('.quiz__close').addEventListener('click', hideQuiz);
let quiz;
/*структура */
let data = [{
    "question": "Какой у вас вид деятельности?",
    "answers": [{
        "text": "Продажа продукции",
        "next": 2,
        value: 120
      },
      {
        "text": "Fvfvf",
        "next": 3,
        value: 120
      },
      {
        "text": "fnfnf",
        "next": 2,
        value: 120
      }
    ]
  },
  {
    "question": "Как продукция будет обновляться на сайте?",
    "answers": [{
        "text": "С 1С",
        "next": 4,
        value: 120
      },
      {
        "text": "Есть файл от поставщика",
        "next": 2,
        value: 200
      },
      {
        "text": "Вручную",
        "next": "end",
        value: 50
      }
    ]
  },
  {
    "question": "Как продукция будет обновляться на сайте?",
    "answers": [{
        "text": "С 1С",
        "next": 3,
        value: 300
      },
      {
        "text": "Есть файл от поставщика",
        "next": 3,
        value: 250
      },
      {
        "text": "Вручную",
        "next": "",
        value: 185
      }
    ]
  },
  {
    "question": "Когда вы плакали в последний раз?",
    "answers": [{
        "text": "С 1С",
        "next": 3,
        value: 120
      },
      {
        "text": "Вчера",
        "next": 4,
        value: 120
      },
      {
        "text": "Вручную",
        "next": 3,
        value: 120
      }
    ]
  },
  {
    "question": "Почему отвалился NFC на айфоне?",
    "answers": [{
        "text": "Потому что хватит тратить деньги",
        "next": 4,
        value: 120
      },
      {
        "text": "Повеление свыше",
        "next": 2,
        value: 120
      },
      {
        "text": "Пора в ремонт",
        "next": "",
        value: 120
      }
    ]
  }
]