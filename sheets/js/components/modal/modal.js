import { Component } from '../../core/component.js';
import { getModalContent } from './modal-content.js';
import { getTabList } from './modal-tab-list.js';

export class Modal extends Component {
  static className = 'modal';

  constructor($root, props) {
    super($root, {
      name: 'Modal',
      listeners: ['keydown', 'click'],
      ...props
    });
  }

  prepare() {
    this.useState({activeTab: 'description'})
  }

  init() {
    super.init();

    this.$on('modal:open', () => {
      this.$root.classList.add('modal__show');
    });
  }

  toHtml() {
    return `
      <div class="modal__overlay" data-type="close"></div>
      <div class="modal__content">
        <div class="modal__head">
          <span class="modal__title">Помощь</span>
          <button class="modal__close" data-type="close">&times;</button>
        </div>
        <nav class="modal__tabs">${getTabList(this.state.activeTab)}</nav>
        <div class="modal__body">${getModalContent(this.state.activeTab)}</div>
        
      </div>
    `;
  }


  onKeydown(event) {
    console.log(event)
    const keys = ['Esc'];

    if (keys.includes(event.key)) {
      event.preventDefault();
      console.log(event.key);
      this.$root.classList.remove('modal__show');
    }
  }

  onClick(event) {
    if (event.target.dataset.type === 'close') {
      this.$root.classList.remove('modal__show');
    } else if (event.target.dataset.tab) {
      const activeTab = event.target.dataset.tab;
      this.setState({ activeTab });
    }
  }

}
