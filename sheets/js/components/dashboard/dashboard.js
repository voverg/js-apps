export class Dashboard {
  constructor(props) {
    // this.components = props.components || [];
    // this.store = props.store;
  }

  createElement(tag, className = '') {
    const $el = document.createElement('div');
    $el.className = className;

    return $el;
  }

  getRoot() {
    const $root = this.createElement('div', 'sheet');
    $root.innerHTML = this.template();

    // const componentProps = {
    //   emitter: this.emitter,
    //   store: this.store,
    // };

    // this.components = this.components.map((ClassComponent) => {
    //   const $el = this.createElement('div', ClassComponent.className);
    //   const component = new ClassComponent($el, componentProps);
    //   $el.innerHTML = component.toHtml();
    //   $root.append($el);

    //   return component;
    // });

    return $root;
  }

  init() {
    // this.components.forEach((component) => {
    //   component.init();
    // });
  }

  destroy() {
    // this.components.forEach((component) => {
    //   component.destroy();
    // });
  }

  template() {
    return `
      <div class="db">

        <div class="db__header">
          <h1>Таблицы</h1>
        </div>

        <div class="db__new">
          <div class="db__view">
            <a href="#" class="db__create">Новая <br> таблица</a>
          </div>
        </div>

        <div class="db__table db__view">
          <div class="db__list-header">
            <span>Название</span>
            <span>Дата открытия</span>
          </div>

          <ul class="db__list">
            <li class="db__record">
              <a href="#table">Таблица номер 1</a>
              <strong>23.11.2020</strong>
            </li>
            <li class="db__record">
              <a href="#table">Таблица номер 2</a>
              <strong>23.11.2020</strong>
            </li>
          </ul>
        </div>

      </div>
    `;
  }

}