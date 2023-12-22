export function getModalContent() {
  return `
    <ul class="modal__list">
      <li class="modal__item">
        - Для навигации между ячейками таблицы можно пользоваться клавишами на клавиатуре
        <span class="modal__key">&#8595;</span>
        <span class="modal__key">&#8593;</span>
        <span class="modal__key">&#8592;</span>
        <span class="modal__key">&#8594;</span>
      </li>
      <li class="modal__item">
        - Также клавиши
        <span class="modal__key">Enter</span> перемещает фокус на нижнюю ячейку
        <span class="modal__key">Tab</span> перемещает фокус на ячеку справа
      </li>
      <li class="modal__item">
        - Кнопка<i class="material-icons">delete</i> позволяет удалить текущую таблицу
      </li>
      <li class="modal__item">
        - Кнопка <i class="material-icons">exit_to_app</i> позволяет перейти к списку таблиц
      </li>
      <li class="modal__item">
        - Если нажать
        <span class="modal__key">Shift</span>+<span class="modal__key">Enter</span>
        то будет перенос строки в текущей ячейке
      </li>
      <li class="modal__item">
        - Есть возможность изменять ширину столбца (потянув за его верхний правый край) и высоту строки (потянув за её левый нижний край)
      </li>
      <li class="modal__item">
        - Зажатая клавиша <span class="modal__key">Shift</span> + клик по свободной ячейке выделяют группу ячеек от той, на которой был фокус до той, на которую был клик
      </li>
      <li class="modal__item">
        - Стили (выделение, центровка текста и т.д.) можно применять как одной текущей ячейке, так и к группе выделенных ячеек
      </li>
      <li class="modal__item">
        - В таблице можно производить простейшие математические операции (+ - * /). Для этого нужно ввести символ "=", затем ввести математическую операцию. Пример <strong>=2+3</strong>. Далее нажать клавишу <span class="modal__key">Enter</span> и в ячейке формула преобразуется в результат, а в поле "Формула" формула останется в виде математической операции.
      </li>
      <li class="modal__item">
        - Если была введена некорректная формула, то в ячейке появится слово "Ошибка!". Исправить значение на корректное можно в поле "Формула".
      </li>
    </ul>
  `;
}
