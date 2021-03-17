<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script defer src="script.js"></script>
</head>

<body>
    <form id="answers" action="" method="post">
        <div class="answer">
            <label for="">
                Вопрос
                <input type="text">
            </label><br>
            <fieldset>
                <legend>Варианты ответов</legend>
                <div class="answer__item">
                    <label for="">
                        <input type="text">
                    </label>
                    <label for="">
                        Следующий шаг
                        <input type="number">
                    </label>
                    <span class="js-remove" onclick="deleteNode(this,'.answer__item')">-</span>
                </div>
            </fieldset>
            
            <span onclick="insertNode('#answer_variant', 'fieldset')">Добавить вариант ответа</span>
        </div>
    </form>
    <input form="answers" type="submit" value="Отправить">
    <span class="js-add">+</span>

    <template id="answer_block">
        <div class="answer">
            <label for="">
                Вопрос
                <input type="text"> <span class="js-remove" onclick="deleteNode(this,'.answer')">-</span>
            </label>

            <fieldset>
                <legend>Варианты ответов</legend>
                <div class="answer__item">
                    <label for="текст ответа">
                        <input type="text">
                    </label>
                    <label for="">
                        Следующий шаг
                        <input type="number">
                    </label>
                    <span class="js-remove" onclick="deleteNode(this,'.answer__item')">-</span>
                </div>
            </fieldset>
        </div>
    </template>

    <template id='answer_variant'>
        <label for="">
            <input type="text">
        </label>
        <label for="">
            Следующий шаг
            <input type="number">
        </label>
        <span class="js-remove" onclick="deleteNode(this,'.answer__item')">-</span>
    </template>
    <style>
        .js-add {
           
            cursor: pointer;
        }

        .js-remove { 
            cursor: pointer;
        }
    </style>

    
</body>

</html>