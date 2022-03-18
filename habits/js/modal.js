class Modal {
  constructor(id = null, text = '') {
    this.id = id;
    this.value = text;

    this.init();
  }

  init() {
    this.open();
  }

  open() {
    // Отипсывамеся от события keydown, которое было раннее
    document.removeEventListener('keydown', keyHandler);
    // Начинаем работу с модальным окном
    $modal.addClass('open');

    setTimeout(() => {
      $modalText.focus();
    }, 100);
    // Предотвращает всплытие события при нажатии на форму
    $modalContent.on('click', this._stopPropagation);
    // Ставим остальные обработчики событий при работе модальным окном
    $modal.on('click', this._closeModal);
    document.addEventListener('keydown', this._escapeHandler);
  }

  _closeModal = () => {
    // Снова навешиваем событие для добавление новой задачи
    document.addEventListener('keydown', keyHandler);
    // Очищаем текстовое поле и закрываем форму
    $modalText.value('');
    $modal.removeClass('open');
    // Отписываемся от всех событий
    $modal.off('submit', this._addHandler);
    $modal.off('submit', this._editHandler);
    $modal.off('click', this._closeModal);
    $modalContent.off('click', this._stopPropagation);
    document.removeEventListener('keydown', this._escapeHandler);
  }

  _stopPropagation = (event) => {
      event.stopPropagation();
    }

  addHabit() {
    $modal.on('submit', this._addHandler);
  }

  editHabit(id, text) {
    $modalText.value(this.value);
    $modal.on('submit', this._editHandler);
  }

  _escapeHandler = (event) => {
    if (event.code !== 'Escape') return;
    this._closeModal();
  }

  _addHandler = (event) => {
    event.preventDefault();

    this.value = $modalText.value();

    this.value = $modalText.value().trim() ? $modalText.value() : 'Новая задача' ;
    this._validateValue();
    habits.add(this.value);

    playSound(soundCheck);
    this._closeModal();
  }

  _editHandler = (event) => {
    event.preventDefault();

    this.value = $modalText.value();
    this._validateValue();
    habits.edit(this.id, this.value);

    playSound(soundCheck);
    this._closeModal();
  }

  _validateValue = () => {
    const pattern = /\[.+?\]\(.+?\)/gi;
    this.value = this.value.replace(pattern, replacer);

    function replacer(match, offset, str) {
      let link = match.split('(')[1].replace(/[\(\)]/gi, ''); // Убираем круглые скобки у ссылки
      link = link.replace(/^(https?:)?(\/\/)?(www\.)?/gi, ''); // Убираем http(s)(www.)
      const title = match.split('(')[0].replace(/[\[\]]/gi, ''); // Убираем квадратные скобки у описания ссылки
      const anchor = `<a href="https://${link}" rel="noopener noreferrer" target="_blank">${title}</a>`;

      return anchor;
    }
  }

}