import { getColIdLIst, getRangeId } from "./table.helpers.js";
import { parserFunctions } from "./table.parser-functions.js";

export class TableParser {
  constructor(str, state) {
    this.str = str;
    this.state = state;
    this.funcs = ['sum', 'mult', 'avg', 'min', 'max'];
    this.pattern = /\w+:\w+/ig;
    this.colIds = getColIdLIst();
  }

  hasFunc(str) {
    for (let i = 0; i < this.funcs.length; i++) {
      const condition = str.toLowerCase().includes(this.funcs[i]);
      if (condition) {
        return true;
      } else {
        continue;
      }
    }
    return false;
  }

  getCellId(name) {
    const currentCol = this.colIds[name.slice(0, 1).toLowerCase()];
    const currentRow = (+name.slice(1) - 1).toString();
    return `${currentRow}:${currentCol}`;
  }

  handleFunc(str) {
    const funcName = this.funcs.find((f) => str.toLowerCase().includes(f));
    
    const [current, target] = str.match(this.pattern)[0].split(':');
    const currentId = this.getCellId(current);
    const targetId = this.getCellId(target)
    
    const rangeId = getRangeId(currentId, targetId);
    const cellContentList = rangeId
      .map((id) => +this.state.visibleDataState[id])
      .filter((val) => !isNaN(val));

    const result = parserFunctions(cellContentList, funcName);
    return result;
  }

  parse() {
    if (this.str.startsWith('=')) {
      try {
        const result = this.hasFunc(this.str) ? this.handleFunc(this.str) : eval(this.str.slice(1));
        return result;
      } catch(e) {
        console.error('Parser error: ', e);
        return 'Ошибка!';
      }
    }

    return this.str;
  }


}