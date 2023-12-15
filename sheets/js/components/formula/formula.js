import { Component } from '../../core/component.js';

export class Formula extends Component {
  static className = 'sheet__formula formula';

  constructor($root, props) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...props
    });
  }

  init() {
    super.init();

    this.$formulaInput = this.$root.querySelector('#formula-input');

    this.$on('table:select', ($cell) => {
      this.$formulaInput.textContent = $cell.dataset.value;
    });

    this.$subscribe((state) => {
      this.$formulaInput.textContent = state.currentText;
    }, ['currentText']);
  }

  onInput(event) {
    const text = event.target.textContent;
    this.$emit('formula:input', text);
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab',];

    if (keys.includes(event.key)) {
      event.preventDefault();
      const text = event.target.textContent;
      this.$emit('formula:enter', text);
    }
  }

  toHtml() {
    return `
      <div class="formula__info">fx</div>
      <div class="formula__input" id="formula-input" contenteditable spellcheck="false"></div>
    `;
  }

}