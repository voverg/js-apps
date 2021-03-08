class Quiz {
    constructor(block, data) {
        this.block = block;
        this.data = data;

        this.correctSound = new Audio('./sound/right.mp3');
        this.wrongSound = new Audio('./sound/error.mp3');

        this.startBtn = block.querySelector('#start-btn');
        this.statusRightEl = block.querySelector('.right-answer');
        this.statusWrongEl = block.querySelector('.wrong-answer');
        this.nextBtn = block.querySelector('#next-btn');
        this.resultBtn = block.querySelector('#result-btn');
        this.questionEl = block.querySelector('#question');
        this.answerBtns = block.querySelector('#answer-buttons');

        this.init();
    }

    init() {
        this.startBtn.addEventListener('click', this.startQuiz.bind(this));
        this.nextBtn.addEventListener('click', () => {
            this.currentQuestion++;
            this.setNextQuestion();
        });
    }

    startQuiz() {
        this.currentQuestion = 0;
        this.correctAnswers = 0;
        this.wrongAnswer = 0;

        this.questionEl.classList.remove('question--result');

        this.statusRightEl.textContent = this.correctAnswers;
        this.statusWrongEl.textContent = this.wrongAnswer;
        this.startBtn.classList.add('hidden');

        this.setNextQuestion();
    }

    setNextQuestion() {
        this.resetState();
        this.showQuestion(this.data[this.currentQuestion]);
    }

    resetState() {
        this.clearStatusClass(document.body);
        this.nextBtn.classList.add('hidden');
        this.answerBtns.innerHTML = null;
    }

    clearStatusClass(elem) {
        elem.classList.remove('correct', 'wrong');
    }

    setStatusClass(elem, correct) {
        this.clearStatusClass(elem);
        if (correct) {
            elem.classList.add('correct');
        } else {
            elem.classList.add('wrong');
        }
    }

    setDisabledElement (elem) {
        elem.classList.add('disabled');
    }

    showQuestion (quest) {
        this.questionEl.innerHTML = quest.question;
        quest.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }

            button.addEventListener('click', this.selectAnswer.bind(this));
            this.answerBtns.appendChild(button);
        });
    }

    soundClick(sound) {
        const clone = sound.cloneNode();
        clone.play();
    }

    selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct;
        this.setStatusClass(document.body, correct);

        if (correct) {
            this.soundClick(this.correctSound);
            selectedButton.classList.add('correct');
            Array.from(this.answerBtns.children).forEach(button => {
                this.setDisabledElement(button);
            })

            this.correctAnswers++;
            this.statusRightEl.textContent = this.correctAnswers;
        } else {
            this.soundClick(this.wrongSound);
            selectedButton.classList.add('wrong');
            Array.from(this.answerBtns.children).forEach(button => {
                if (button.dataset.correct) {
                    button.classList.add('correct');
                }
                this.setDisabledElement(button);
            })
            this.wrongAnswer++;
            this.statusWrongEl.textContent = this.wrongAnswer;
        }

        this.nextStep();
    }

    nextStep() {
        if (this.data.length > this.currentQuestion + 1) {
            this.nextBtn.classList.remove('hidden');
        } else {
            this.resultBtn.classList.remove('hidden');
            this.resultBtn.addEventListener('click', this.showResult.bind(this));
        }
    }

    showResult() {
        this.questionEl.textContent = `Кол-во правильных ответов = ${this.correctAnswers} из ${this.data.length}`;
        this.questionEl.classList.add('question--result');

        this.answerBtns.innerHTML = null;

        this.resultBtn.classList.add('hidden');
        this.startBtn.innerText = 'Начать заново';
        this.startBtn.classList.remove('hidden');
    }
}