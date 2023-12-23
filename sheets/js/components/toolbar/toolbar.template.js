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

function createInput(input) {
  return `
    <label class="toolbar__label" title="${input.title}">
      <i class="material-icons toolbar__input-icon">${input.icon}</i>
      <input
        type="${input.type}"
        value="${input.value}"
        id="${input.id}"
        class="toolbar__input"
        data-type="input"
      >
    </label>
  `;
}

export function createToolbar(state) {
  const boxShadow = '0 0 2px #000, -1px -1px 1px #777 inset';

  const btns = [
    {
      id: 'toolbar-btn-left',
      icon: 'format_align_left',
      title: 'По левому краю',
      active: state['justify-content'] === 'start',
      value: {'justify-content': 'start'},
    },
    {
      id: 'toolbar-btn-center',
      icon: 'format_align_center',
      title: 'По центру',
      active:  state['justify-content'] === 'center',
      value: {'justify-content': 'center'},
    },
    {
      id: 'toolbar-btn-right',
      icon: 'format_align_right',
      title: 'По правому краю',
      active:  state['justify-content'] === 'end',
      value: {'justify-content': 'end'},
    },
    {
      id: 'toolbar-btn-top',
      icon: 'align_vertical_top',
      title: 'По верхнему краю',
      active:  state['align-items'] === 'start',
      value: {'align-items': 'start'},
    },
    {
      id: 'toolbar-btn-center',
      icon: 'vertical_distribute',
      title: 'По центру',
      active:  state['align-items'] === 'center',
      value: {'align-items': 'center'},
    },
    {
      id: 'toolbar-btn-bottom',
      icon: 'align_vertical_bottom',
      title: 'По нижниму краю',
      active:  state['align-items'] === 'end',
      value: {'align-items': 'end'},
    },
    {
      id: 'toolbar-box-shadow',
      icon: 'border_all',
      title: 'Границы',
      active: state['box-shadow'] === boxShadow,
      value: {'box-shadow': state['box-shadow'] === boxShadow ? 'none' : boxShadow},
    },
    {
      id: 'toolbar-btn-bold',
      icon: 'format_bold',
      title: 'Жирный',
      active: state['font-weight'] === 'bold',
      value: {'font-weight': state['font-weight']  === 'bold' ? 'normal' : 'bold'},
    },
    {
      id: 'toolbar-btn-italic',
      icon: 'format_italic',
      title: 'Курсив',
      active: state['font-style'] === 'italic',
      value: {'font-style': state['font-style'] === 'italic' ? 'normal' : 'italic'},
    },
    {
      id: 'toolbar-btn-underline',
      icon: 'format_underline',
      title: 'Подчёркнутый',
      active: state['text-decoration'] === 'underline',
      value: {'text-decoration': state['text-decoration'] === 'underline' ? 'none' : 'underline'},
    },
  ];

  const inputs = [
    {
      id: 'color',
      type: 'color',
      icon: 'border_color',
      title: 'Цвет текста',
      value: state['color'],
    },
    {
      id: 'background-color',
      type: 'color',
      icon: 'format_color_fill',
      title: 'Цвет заливки',
      value: state['background-color'],
    },
  ];

  const btnsHtml = btns.map((btn) => createBtn(btn)).join('');
  const inputsHtml = inputs.map((input) => createInput(input)).join('');
  const html = btnsHtml + inputsHtml;
  
  return html;
}