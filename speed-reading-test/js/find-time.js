function findReadingTime() {
    createBlock(block2, data.block2);

    const inputEl = document.querySelector('#characters');
    const textAreaEl = document.querySelector('textarea');
    const findBtn = document.querySelector('.find');
    const resultEl = document.querySelector('#result-find');

    findBtn.addEventListener('click', () => {
        const checkForm = formValidate(inputEl, textAreaEl);
        if (!checkForm) {
            resultEl.textContent = 'Заполните все поля';
            return;
        }

        const textLength = getCharacterAmount(textAreaEl.value);
        const result = Math.round(textLength / +inputEl.value);
        resultEl.innerHTML = `Данный текст содержит <strong>${textLength}</strong> знаков без пробелов. <br> Вы прочитаете этот текст примерно за <strong>${Math.floor(result / 60)}</strong> час(ов) и <strong>${result % 60}</strong> минут.`;
    });
}

function formValidate(inputEl, textAreaEl) {
    if (inputEl.value.trim() && textAreaEl.value.trim()) {
        return true;
    }
}