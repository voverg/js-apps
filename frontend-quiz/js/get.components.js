const element = `
    <div id="question" class="question">
        ${welcome}
    </div>

    <div class="status">
        <div class="status__group">
            <span class="fas fa-thumbs-up like correct"></span>
            <span class="result right-answer">0</span>
        </div>
        <div class="status__group">
            <span class="fas fa-thumbs-down dislike wrong"></span>
            <span class="result wrong-answer">0</span>
        </div>
    </div>

    <div id="answer-buttons" class="btn-grid">
<!--                 <button class="btn">This is the only video I've ever watched where I turned down the playback speed</button>
        <button class="btn">Вариант 2</button>
        <button class="btn">Вариант 3</button>
        <button class="btn">Вариант 4</button> -->
    </div>

    <div class="controls">
        <button id="start-btn" class="start-btn btn">Начать</button>
        <button id="next-btn" class="next-btn btn hidden">Дальше</button>
        <button id="result-btn" class="result-btn btn hidden">Показать результат</button>
    </div>
    `;

class Component {
    constructor(block) {
        this.block = block;
        this.createComponent();
    }

    createComponent() {
        this.block.innerHTML = element;
    }
}