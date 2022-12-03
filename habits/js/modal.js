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
    habits.add(this.value);

    playSound(soundClack);
    this._closeModal();
  }

  _editHandler = (event) => {
    event.preventDefault();

    this.value = $modalText.value();
    habits.edit(this.id, this.value);

    playSound(soundClack);
    this._closeModal();
  }

}
