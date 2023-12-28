export function getTabList(activeTab) {
  const tabsData = [
    {
      type: 'description',
      title: 'Описание',
    },
    {
      type: 'keys',
      title: 'Клавиши',
    },
    {
      type: 'functions',
      title: 'Функции',
    }
  ];

  const tabs = tabsData.map((tab) => {
    const className = tab.type === activeTab
      ? 'modal__tab modal__tab--active'
      : 'modal__tab';

    return `<span class="${className}" data-tab="${tab.type}">${tab.title}</span>`;
  }).join('');

  return tabs;
}