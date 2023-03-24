// CALCULATOR BUTTONS
const POWER = 'power';
const FACTORIAL = 'factorial';

export const buttons = [
  {
    id: 'rad',
    symbol: 'Rad',
    formula: false,
    type: 'key'
  },
  {
    id: 'deg',
    symbol: 'Deg',
    formula: false,
    type: 'key'
  },
  {
    id: 'square-root',
    symbol: '√',
    formula: 'Math.sqrt',
    type: 'math_function'
  },
  {
    id: 'square',
    symbol: 'x²',
    formula: POWER,
    type: 'math_function'
  },
  {
    id: 'open-parenthesis',
    symbol: '(',
    formula: '(',
    type: 'number'
  },
  {
    id: 'close-parenthesis',
    symbol: ')',
    formula: ')',
    type: 'number'
  },
  {
    id: 'clear',
    symbol: 'C',
    formula: false,
    type: 'key'
  },
  {
    id: 'delete',
    symbol: '⌫',
    formula: false,
    type: 'key'
  },
  {
    id: 'pi',
    symbol: 'π',
    formula: 'Math.PI',
    type: 'number'
  },
  {
    id: 'cos',
    symbol: 'cos',
    formula: 'trigo(Math.cos,',
    type: 'trigo_function'
  },
  {
    id: 'sin',
    symbol: 'sin',
    formula: 'trigo(Math.sin,',
    type: 'trigo_function'
  },
  {
    id: 'tan',
    symbol: 'tan',
    formula: 'trigo(Math.tan,',
    type: 'trigo_function'
  },
  {
    id: '7',
    symbol: 7,
    formula: 7,
    type: 'number'
  },
  {
    id: '8',
    symbol: 8,
    formula: 8,
    type: 'number'
  },
  {
    id: '9',
    symbol: 9,
    formula: 9,
    type: 'number'
  },
  {
    id: 'division',
    symbol: '÷',
    formula: '/',
    type: 'operator'
  },
  {
    id: 'e',
    symbol: 'e',
    formula: 'Math.E',
    type: 'number'
  },
  {
    id: 'acos',
    symbol: 'acos',
    formula: 'inv_trigo(Math.acos,',
    type: 'trigo_function'
  },
  {
    id: 'asin',
    symbol: 'asin',
    formula: 'inv_trigo(Math.asin,',
    type: 'trigo_function'
  },
  {
    id: 'atan',
    symbol: 'atan',
    formula: 'inv_trigo(Math.atan,',
    type: 'trigo_function'
  },
  {
    id: '4',
    symbol: 4,
    formula: 4,
    type: 'number'
  },
  {
    id: '5',
    symbol: 5,
    formula: 5,
    type: 'number'
  },
  {
    id: '6',
    symbol: 6,
    formula: 6,
    type: 'number'
  },
  {
    id: 'multiplication',
    symbol: '×',
    formula: '*',
    type: 'operator'
  },
  {
    id: 'factorial',
    symbol: '×!',
    formula: FACTORIAL,
    type: 'math_function'
  },{
    id: 'exp',
    symbol: 'exp',
    formula: 'Math.exp',
    type: 'math_function'
  },
  {
    id: 'ln',
    symbol: 'ln',
    formula: 'Math.log',
    type: 'math_function'
  },
  {
    id: 'log',
    symbol: 'log',
    formula: 'Math.log10',
    type: 'math_function'
  },
  {
    id: '1',
    symbol: 1,
    formula: 1,
    type: 'number'
  },
  {
    id: '2',
    symbol: 2,
    formula: 2,
    type: 'number'
  },{
    id: '3',
    symbol: 3,
    formula: 3,
    type: 'number'
  },
  {
    id: 'subtraction',
    symbol: '–',
    formula: '-',
    type: 'operator'
  },
  {
    id: 'power',
    symbol: 'x<span>y</span>',
    formula: POWER,
    type: 'math_function'
  },
  {
    id: 'ANS',
    symbol: 'ANS',
    formula: 'ans',
    type: 'number'
  },
  {
    id: 'percent',
    symbol: '%',
    formula: '/100',
    type: 'number'
  },
  {
    id: 'comma',
    symbol: '.',
    formula: '.',
    type: 'number'
  },
  {
    id: '0',
    symbol: 0,
    formula: 0,
    type: 'number'
  },
  {
    id: 'calculate',
    symbol: '=',
    formula: '=',
    type: 'calculate'
  },
  {
    id: 'addition',
    symbol: '+',
    formula: '+',
    type: 'operator'
  }
];