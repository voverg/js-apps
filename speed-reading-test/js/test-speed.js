function startTest() {
    const startBtn = document.querySelector('.start');
    startBtn.addEventListener('click', () => {
        createBlock(block1, data.blockTest);

        getReadingSpeed();
    });
}

function getCharacterAmount(text) {
    const re = /[ ,—\.-;\n()'"«»…]/;
    text = text.split(re).join('');

    return text.length;
}

function getReadingSpeed() {
    const text = document.querySelector('.block__description').textContent;
    const textLength = getCharacterAmount(text);
    const beginTime = +new Date();

    const stopBtn = document.querySelector('.stop');
    stopBtn.addEventListener('click', () => {
        const endTime = +new Date();
        const resultTime = (Math.round((endTime - beginTime) / 1000) / 60).toFixed(2);
        const minutes = Math.floor(resultTime);
        const seconds = Math.round(Math.floor((resultTime - Math.floor(resultTime)) * 100) * 0.6);
        const result = Math.round(textLength / resultTime);

        showResults(textLength, minutes, seconds, result);

//         alert(`Вы прочитали текст за ${minutes} минут и ${seconds} секунд
// Ваша скорость чтения равна ${result} знаков/минуту`);
//         start();
    });
}

function showResults(textLength, minutes, seconds, result) {
    const resultBlock = `
        <div class="finish-result">
            <div class="block__description">
                <h2>Результаты теста</h2>
                <p>Количество знаков в тексте: ${textLength}</p>
                <p><strong>Время чтения:</strong> ${minutes} минут и ${seconds} секунд</p>
                <p><strong>Скорость чтения:</strong> ${result} знаков в минуту</p>
            </div>
            <div class="block__result">
                <button class="btn start-again">Начать заново</button>
            </div>
        </div>`;

    createBlock(block1, resultBlock);

    const startAgainBtn = document.querySelector('.start-again');
    startAgainBtn.addEventListener('click', start);
}