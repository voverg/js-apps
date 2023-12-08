function createBtn(btn) {
  const meta = `
    title="${btn.title}"
    data-type="btn"
    data-id="${btn.id}"
    data-value='${JSON.stringify(btn.value)}'
  `;

  const selected = btn.active ? 'toolbar__btn--selected' : '';

  return `
    <button class="btn toolbar__btn ${selected}" ${meta}>
      <i class="material-icons" ${meta}>${btn.icon}</i>
    </button>
  `;
}

export function createToolbar(state) {
  // console.log(state);
  const btns = [
    {
      id: 'toolbar-btn-left',
      icon: 'format_align_left',
      title: 'По левому краю',
      active: state.textAlign === 'left',
      value: {textAlign: 'left'},
    },
    {
      id: 'toolbar-btn-center',
      icon: 'format_align_center',
      title: 'По центру',
      active:  state.textAlign === 'center',
      value: {textAlign: 'center'},
    },
    {
      id: 'toolbar-btn-right',
      icon: 'format_align_right',
      title: 'По правому краю',
      active:  state.textAlign === 'right',
      value: {textAlign: 'right'},
    },
    {
      id: 'toolbar-btn-bold',
      icon: 'format_bold',
      title: 'Жирный',
      active: state.fontWeight === 'bold',
      value: {fontWeight: state.fontWeight === 'bold' ? 'normal' : 'bold'},
    },
    {
      id: 'toolbar-btn-italic',
      icon: 'format_italic',
      title: 'Курсив',
      active: state.fontStyle === 'italic',
      value: {fontStyle: state.fontStyle === 'italic' ? 'normal' : 'italic'},
    },
    {
      id: 'toolbar-btn-underline',
      icon: 'format_underline',
      title: 'Подчёркнутый',
      active: state.textDecoration === 'underline',
      value: {textDecoration: state.textDecoration === 'underline' ? 'none' : 'underline'},
    },
  ];
  
  return btns.map((btn) => createBtn(btn)).join('');
}