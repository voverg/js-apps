const description = `
  <ul class="modal__list">
    <li class="modal__item">
    - Кликнув по названию таблици, можно его изменить
    </li>
    <li class="modal__item">
      - Кнопка<i class="material-icons">delete</i> позволяет удалить текущую таблицу
    </li>
    <li class="modal__item">
      - Кнопка <i class="material-icons">exit_to_app</i> позволяет перейти к списку таблиц
    </li>
    <li class="modal__item">
      - Есть возможность изменять ширину столбца (потянув за его верхний правый край) и высоту строки (потянув за её левый нижний край)
    </li>
    <li class="modal__item">
      - Выделить группу ячеек можно потянув за нижний правый край выделенной ячейки.
    </li>
    <li class="modal__item">
      - Стили (выделение, центровка текста и т.д.) можно применять как одной текущей ячейке, так и к группе выделенных ячеек
    </li>
    <li class="modal__item">
    - В таблице можно пользоваться клавишами клавиатуры (подробнее смотрите во вкладке "Клавиши")
    </li>
    <li class="modal__item">
      - В таблице можно производить простейшие математические операции (+ - * /). Для этого нужно ввести символ "=", затем ввести математическую операцию. Пример <strong>=2+3</strong>. Далее нажать клавишу <span class="modal__key">Enter</span> и в ячейке формула преобразуется в результат, а в поле "Формула" формула останется в виде математической операции.
    </li>
    <li class="modal__item">
      - В таблице можно применять функции для диапазона ячеек. Подробнее об этом смотрите во вкладке "Функции"
    </li>
    <li class="modal__item">
      - Если была введена некорректная функция или математическая операция, то в ячейке появится слово "Ошибка!". Исправить значение на корректное можно в поле "Формула".
    </li>
  </ul>
`;

const keys = `
  <h3 class="modal__body-title">В таблице можно пользоваться клавишами клавиатуры:</h3>
  <ul class="modal__list">
    <li class="modal__item">
      - Клавиши 
      <span class="modal__key">&#8595;</span>
      <span class="modal__key">&#8593;</span>
      <span class="modal__key">&#8592;</span>
      <span class="modal__key">&#8594;</span>
      навигация между ячейками таблицы
    </li>
    <li class="modal__item">
      - Также клавиши
      <span class="modal__key">Enter</span> перемещает фокус на нижнюю ячейку,
      <span class="modal__key">Tab</span> перемещает фокус на ячеку справа
    </li>
    <li class="modal__item">
      - Если нажать
      <span class="modal__key">Shift</span>+<span class="modal__key">Enter</span>
      то будет перенос строки в текущей ячейке
    </li>
    <li class="modal__item">
      - Зажатая клавиша <span class="modal__key">Shift</span> + клик по свободной ячейке позволяют выделить группу ячеек. Также выделить группу ячеек можно потянув за нижний правый край выделенной ячейки.
    </li>
  </ul>
`;

const functions = `
  <h3 class="modal__body-title">В приложении можно применять функции для диапазона ячеек:</h3>
  <div class="modal__body-description">Чтобы применить функцию пишем занк "=", затем название функции и в скобках указываем диапазон ячеек через знак ":". Функции можно писать как заглавными, так и строчными буквами.</div>
  <div class="modal__body-description">Общий вид функции: <em>=название_функции(ячейка:ячейка)</em>. Например: <em>=sum(c3:d5)</em></div>
  <h3 class="modal__body-title">Список функций:</h3>
  <ul class="modal__list">
    <li class="modal__item">
      - sum() - высчитывает сумму в указанном диапазоне ячеек
    </li>
    <li class="modal__item">
      - mult() - перемножает значения в указанном диапазоне ячеек
    </li>
    <li class="modal__item">
      - avg() - высчитывает среднее значение из указанного диапазона ячеек
    </li>
    <li class="modal__item">
      - min() - высчитывает минимальное значение из указанного диапазона ячеек
    </li>
    <li class="modal__item">
      - max() - высчитывает максимальное значение из указанного диапазона ячеек
    </li>
    <li class="modal__item">
      - 
    </li>
    <li class="modal__item">
      - 
    </li>
  </ul>
`;


export function getModalContent(tab) {
  const tabs = {description, keys, functions};

  return tabs[tab];
}
