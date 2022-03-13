class Modal {
  constructor(id = null, text = '') {
    this.id = id;
    this.value = text;

    this.init();
  }

  init() {
    this.open();
    this.close();
  }

  open() {
    $modal.addClass('open');

    setTimeout(() => {
      $modalText.focus();
    }, 400);
    // Предотвращает всплытие события при нажатии на форму
    $modalContent.on('click', this._stopPropagation);
  }

  close() {
    $modal.on('click', this._closeModal);
    document.addEventListener('keydown', this._escapeHandler);
  }

  addHabit() {
    $modal.on('submit', this._addHandler);
  }

  editHabit(id, text) {
    $modalText.value(this.value);
    $modal.on('submit', this._editHandler);
  }

  _stopPropagation = (event) => {
      event.stopPropagation();
    }

  _closeModal = () => {
    $modalText.value('');
    $modal.removeClass('open');

    $modal.off('submit', this._addHandler);
    $modal.off('submit', this._editHandler);
    $modal.off('click', this._closeModal);
    $modalContent.off('click', this._stopPropagation);
    document.removeEventListener('keydown', this._escapeHandler);
  }

  _escapeHandler = (event) => {
    if (event.code !== 'Escape') return;
    this._closeModal();
  }

  _addHandler = (event) => {
    event.preventDefault();

    this.value = $modalText.value() ? $modalText.value() : 'Новая задача' ;
    console.log(this.value);
    habits.add(this.value);

    this._closeModal();
    playSound(soundCheck);
  }

  _editHandler = (event) => {
    event.preventDefault();

    this.value = $modalText.value();
    habits.edit(this.id, this.value);

    this._closeModal();
    playSound(soundCheck);
  }


}