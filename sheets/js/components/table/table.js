import { Component } from '../../core/component.js';

export class Table extends Component {
  static className = 'sheet__table table';

  constructor($root, props) {
    super($root, {
      name: 'Table',
      listeners: [],
      ...props
    });
  }

  toHtml() {
    return `
      <div class="row">
        <div class="row-info"></div>
        <div class="row-data">
          <div class="column">A</div>
          <div class="column">B</div>
          <div class="column">C</div>
        </div>
      </div>

      <div class="row">
        <div class="row-info">1</div>
        <div class="row-data">
          <div class="cell selected" contenteditable>A1</div>
          <div class="cell" contenteditable>B1</div>
          <div class="cell" contenteditable>C1</div>
        </div>
      </div>

      <div class="row">
        <div class="row-info">2</div>
        <div class="row-data">
          <div class="cell" contenteditable>A2</div>
          <div class="cell" contenteditable>B2</div>
          <div class="cell" contenteditable>C2</div>
        </div>
      </div>
    `;
  }

}