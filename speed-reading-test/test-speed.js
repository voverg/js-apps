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
        const secunds = Math.round(Math.floor((resultTime - Math.floor(resultTime)) * 100) * 0.6);
        const result = Math.round(textLength / resultTime);

        alert(`Вы прочитали текст за ${minutes} минут и ${secunds} секунд
Ваша скорость чтения равна ${result} знаков/минуту`)
        start();
    });
}