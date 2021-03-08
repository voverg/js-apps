const welcome = `
    <div class="wellcome">
        <h3>Пройди тест и проверь свои знания во фронтенде!</h3>
        <p>1. Выбери одну из вкладок, для прохождения нужного теста</p>
        <p>2. Далее нажми кнопку <strong>"Начать"</strong></p>
        <p>3. Появится вопрос и 4 варианта ответа</p>
        <p>4. Выбери подходящий вариант, нажав на него</p>
        <p>5. Если вы отетили правильно, кнопка станет зелёной</p>
        <p>6. Если ответили не правильно, кнопка станет красной, а кнопка с правильным ответом подсветится зелёным</p>
    </div>
`;

const htmlData = [
    {
        question: '1. Как расшифровывается аббревиатура HTML?',
        answers: [
            {text: 'How To Make Links', correct: false},
            {text: 'HyperText Markup Language', correct: true},
            {text: 'Hyper Text Markdown Language', correct: false},
            {text: 'Hyperlink Transfer Motion Location', correct: false}
        ]
    },
    {
        question: '2. Для чего предназначен тег doctype?',
        answers: [
            {text: 'Тег предназначен для медицинских сайтов для указания специальности', correct: false},
            {text: 'Для прикрепления в форме документов с типом .doc', correct: false},
            {text: 'Для указания сервера, на котором запускается сайт', correct: false},
            {text: 'Для указания версии HTML, которая используется в документе', correct: true}
        ]
    },
    {
        question: '3. Какие из перечисленных тэгов относятся к созданию таблицы?',
        answers: [
            {text: '<header> <body> <footer>', correct: false},
            {text: '<table> <tr> <td>', correct: true},
            {text: '<ul> <li> <tr> <td>', correct: false},
            {text: '<form> <input> <button>', correct: false}
        ]
    },
    {
        question: '4. Как сделать текст жирным?',
        answers: [
            {text: '<p>жирный</p>', correct: false},
            {text: '<a>жирный</a>', correct: false},
            {text: '<strong>жирный</strong>', correct: true},
            {text: '<br>жирный</br>', correct: false}
        ]
    },
    {
        question: '5. Как правильно оформить нумерованный список?',
        answers: [
            {text: 'Поместить внутрь тега <ol> теги <li>, внутри которых написать текст', correct: true},
            {text: 'Разделить каждую строку с помощью тега <br>', correct: false},
            {text: 'Поместить текстк между тегами <em></em>', correct: false},
            {text: 'В HTML не существует нумерованных списков', correct: false}
        ]
    },
    {
        question: '6. С помощью какого тега следует разделять абзацы?',
        answers: [
            {text: '<span>', correct: false},
            {text: '<p>', correct: true},
            {text: '<b>', correct: false},
            {text: '<br>', correct: false}
        ]
    },
    {
        question: '7. Как выделить текст курсивом?',
        answers: [
            {text: '<p>курсив</p>', correct: false},
            {text: '<hr>курсив</hr>', correct: false},
            {text: '<c>курсив</c>', correct: false},
            {text: '<em>курсив</em>', correct: true}
        ]
    },
    {
        question: '8. Как сделать всплывающую подсказку при наведении на ссылку?',
        answers: [
            {text: '<a href="#" title="Подсказка">Ссылка</a>', correct: true},
            {text: '<a href="#" alt="Подсказка">Ссылка</a>', correct: false},
            {text: '<a href="#" caption ="Подсказка">Ссылка</a>', correct: false},
            {text: '<a href="#" target="Подсказка">Ссылка</a>', correct: false}
        ]
    },
    {
        question: '9. Как вставить картинку в HTML?',
        answers: [
            {text: '<img> http://site.com/image.jpg </img>', correct: false},
            {text: '<image source= "http://site.com/image.jpg">', correct: false},
            {text: '<img src="http://site.com/image.jpg">', correct: true},
            {text: '<image> http://site.com/image.jpg </image>', correct: false}
        ]
    },
    {
        question: '10. Как задаются комментарии в HTML?',
        answers: [
            {text: '/* Комментарий */', correct: false},
            {text: '<!-- Комментарий -->', correct: true},
            {text: '<!p> Комментарий </!p>', correct: false},
            {text: '// Комментарий', correct: false}
        ]
    },
]

const cssData = [
    {
        question: '1. Расшифруйте аббревиатуру CSS',
        answers: [
            {text: 'Case Style Says', correct: false},
            {text: 'Case Style Scholar', correct: false},
            {text: 'Cascad Solid Source', correct: false},
            {text: 'Cascading Style Sheets', correct: true}
        ]
    },
    {
        question: '2. Что такое наследование в CSS?',
        answers: [
            {text: 'Такого понятия не существует в CSS', correct: false},
            {text: 'Передача свойств от элемента к ближайшим соседям', correct: false},
            {text: 'Передача свойств от предка к потомкам', correct: true},
            {text: 'Получение данных из HTML', correct: false}
        ]
    },
    {
        question: '3. Как задаются внутренние отступы у элемента?',
        answers: [
            {text: 'margin', correct: false},
            {text: 'padding', correct: true},
            {text: 'space', correct: false},
            {text: 'inner', correct: false}
        ]
    },
    {
        question: '4. Как обозначается псевдокласс при наведении?',
        answers: [
            {text: ':hover', correct: true},
            {text: ':focus', correct: false},
            {text: ':active', correct: false},
            {text: ':over', correct: false}
        ]
    },
    {
        question: '5. Какое свойсвто устанавливает шрифт для текста?',
        answers: [
            {text: 'font-style', correct: false},
            {text: 'text-decoration', correct: false},
            {text: 'font-family', correct: true},
            {text: 'font-weight', correct: false}
        ]
    },
    {
        question: '6. Как можно изменить правый внешний отступ у элемента?',
        answers: [
            {text: 'indent', correct: false},
            {text: 'padding-right', correct: false},
            {text: 'margin-right', correct: true},
            {text: 'border-right', correct: false}
        ]
    },
    {
        question: '7. Какое значение по умолчанию у свойства position?',
        answers: [
            {text: 'static', correct: true},
            {text: 'absolute', correct: false},
            {text: 'relative', correct: false},
            {text: 'fixed', correct: false}
        ]
    },
    {
        question: '8. Как убрать подчеркивание у гиперссылки?',
        answers: [
            {text: 'a {decoration:no-underline;}', correct: false},
            {text: 'a {text-decoration:none;}', correct: true},
            {text: 'a {text-decoration:no-underline;}', correct: false},
            {text: 'a {underline:none;}', correct: false}
        ]
    },
    {
        question: '9. Как добавить цвет фона для всех элементов h2?',
        answers: [
            {text: 'h2.all {background-color: #FFFFFF;}', correct: false},
            {text: 'h2 {background-color: #FFFFFF;}', correct: true},
            {text: 'all.h2 {background-color: #FFFFFF;}', correct: false},
            {text: 'h2.child-all {background-color: #FFFFFF;}', correct: false}
        ]
    },
    {
        question: '10. Какое свойство CSS используется для изменения цвета текста элемента?',
        answers: [
            {text: 'text-color', correct: false},
            {text: 'fgcolor', correct: false},
            {text: 'font-color', correct: false},
            {text: 'color', correct: true}
        ]
    },
]

const jsData = [
    {
        question: '1. Расшифруйте аббревиатуру DOM',
        answers: [
            {text: 'Digital Optical Modulation', correct: false},
            {text: 'Domestic Object Mode', correct: false},
            {text: 'Domain Operation Method', correct: false},
            {text: 'Document Object Model', correct: true}
        ]
    },
    {
        question: '2. Что такое hoisting в JavaScript?',
        answers: [
            {text: 'Это объект, который хранит все переменные и функции', correct: false},
            {text: 'Это когда переменные и объявления функций перемещаются вверх своей области видимости до выполнения кода', correct: true},
            {text: 'Это услуга по предоставлению ресурсов для размещения информации на сервере', correct: false},
            {text: 'Это глобальная функция, которая отвечает за выполнение кода', correct: false}
        ]
    },
    {
        question: '3. Какие ключевые слова используются для объявления переменной?',
        answers: [
            {text: 'int, float, boolean', correct: false},
            {text: 'new, function, class', correct: false},
            {text: 'object, array, number', correct: false},
            {text: 'var, let, const', correct: true}
        ]
    },
    {
        question: '4. Расшифруйте аббревиатуру API',
        answers: [
            {text: 'Analog Programm Interactive', correct: false},
            {text: 'Academy Provide Infinite', correct: false},
            {text: 'Application Programming Interface', correct: true},
            {text: 'Analysis Pattern Indictor', correct: false}
        ]
    },
    {
        question: '5. Какой метод разбивает строку на подстроки, используя заданный разделитель, и возвращает их в виде массива?',
        answers: [
            {text: '.filter()', correct: false},
            {text: '.split()', correct: true},
            {text: '.parseInt()', correct: false},
            {text: '.trim()', correct: false}
        ]
    },
    {
        question: '6. Какой метод округляет аргумент до ближайшего большего целого?',
        answers: [
            {text: 'Math.asin()', correct: false},
            {text: 'Math.max()', correct: false},
            {text: 'Math.round()', correct: false},
            {text: 'Math.ceil()', correct: true}
        ]
    },
    {
        question: '7. Является ли элемент else обязательным в конструкции условия?',
        answers: [
            {text: 'Да', correct: false},
            {text: 'Нет', correct: true},
            {text: 'Зависит от версии JavaScript', correct: false},
            {text: 'В разных браузерах по-разному', correct: false}
        ]
    },
    {
        question: '8. Какой оператор завершает выполнение текущей функции и возвращает её значение?',
        answers: [
            {text: 'return', correct: true},
            {text: 'break', correct: false},
            {text: 'case', correct: false},
            {text: 'continue', correct: false}
        ]
    },
    {
        question: '9. Что такое рекурсия в JavaScript?',
        answers: [
            {text: 'Это возмжность функции быть универсальной', correct: false},
            {text: 'Это механизм, позволяющий передавать функцию в качестве аргумента другим функциям', correct: false},
            {text: 'Это возможность функции вызывать саму себя', correct: true},
            {text: 'Рекурсия не является частью JavaScript', correct: false}
        ]
    },
    {
        question: '10. Какой метод удаляет последний элемент массива?',
        answers: [
            {text: '.pop()', correct: true},
            {text: '.push()', correct: false},
            {text: '.shift()', correct: false},
            {text: '.unshift()', correct: false}
        ]
    },
]