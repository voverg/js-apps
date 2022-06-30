class TabsComponent {
  constructor($root, options) {
    this.$root = $root;
    this.tabList = [
      {name: 'Current', status: 'current', class: 'tab current-tab'},
      {name: 'Done', status: 'done', class: 'tab'},
      {name: 'Deleted', status: 'deleted', class: 'tab'},
    ];

    this.store = options.store;
  }

  init() {
    this.render();

    this.$root.addEventListener('click', this.onClick);
  }

  onClick = ({target}) => {
    if (isTab(target) && !isCurrentTab(target)) {
      this.clearCurrentTab();
      target.classList.add('current-tab');

      const tabStatus = target.dataset.tab;
      this.store.dispatch({ type: 'tab', payload: {tab: tabStatus} });
    }
  }

  clearCurrentTab() {
    Array.from(this.$root.children).forEach(tab => tab.classList.remove('current-tab'));
  }

  render() {
    const tabs = this.tabList.map(tab => {
      return `<div class="${tab.class}" data-tab="${tab.status}">${tab.name}</div>`;
    });
    this.$root.innerHTML = tabs.join('');
  }
}

function isTab(target) {
  return target.classList.contains('tab');
}

function isCurrentTab(target) {
  return target.classList.contains('current-tab');
}