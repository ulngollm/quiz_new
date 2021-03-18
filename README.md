# Quiz

## Установка:

1. Разместить файлы квиза на сервере.

2. Добавить в `head`:  
```html
<script defer src="/quiz.js"></script>
<script defer src="/quiz.css"></script>
```

3. Добавить eventListener для кнопки или другого элемента, который будет выступать в качестве триггера:  
```js
button.addEventListener('click', showQuiz);
```
`showQuiz()` откроет модальное окно с iframe внутри.

## Структура файлов
- `data.json` - массив вопросов.  
Индекс объекта ответа в этом массиве используется для связи вопросов в answers[anaswerIndex].next.  
Каждый вопрос должен иметь такую структуру:  
```json
{
    question: "question",
    answers: [
      {
        text: "Text of answer1",
        next: nextQuestion, //индекс следующего ответа в data.json
      },
      {
        text: "Text of answer2",
        next: "end", //если после этого вопроса нужно закончить квиз
      },
    ],

  }
```
- `result_handler.php` - отвечает за обработку и отправку результатов квиза

## Использование
Инициализация
```js
let quiz = new Quiz(data);
```
`data` может быть `url`(string) до json-файла с данными или массив с вопросами()



