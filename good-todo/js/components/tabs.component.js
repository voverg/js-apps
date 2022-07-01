class TabsComponent {
  constructor($root, options) {
    this.$root = $root;
    this.tabList = [
      {name: 'Current', status: 'current', class: 'tab current-tab'},
      {name: 'Done', status: 'done', class: 'tab'},
      {name: 'Deleted', status: 'deleted', class: 'tab'},
    ];

    this.store = options.store;
    this.state = {tab: 'current'};
    this.status = this.state.tab;
  }

  init() {
    this.render();

    this.$root.addEventListener('click', this.onClick);

    this.store.subscribe(() => {
      this.state = this.store.getState();
      this.status = this.state.tab;

      this.setCurrentTab();
    });
  }

  onClick = ({target}) => {
    if (isTab(target) && !isCurrentTab(target)) {
      this.status = target.dataset.tab;
      this.store.dispatch({ type: 'tab', payload: {tab: this.status} });
    }
  }

  setCurrentTab() {
    this.tabList.forEach(tab => {
      tab.class = tab.status === this.status ? 'tab current-tab' : 'tab';
    });

    this.render();
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