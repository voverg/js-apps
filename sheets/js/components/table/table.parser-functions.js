export function parserFunctions(cellContentList, funcName) {
  const funcs = {
    sum,
    mult,
    avg,
    min,
    max,
  };

  return funcs[funcName](cellContentList);
}


function sum(list) {
  return list.reduce((acc, next) => {
    return acc + next;
  }, 0);
}

function mult(list) {
  return list.reduce((acc, next) => {
    return acc * next;
  }, 1);
}

function avg(list) {
  const sumValues = sum(list);
  return sumValues / list.length;
}

function min(list) {
  return Math.min(...list);
}

function max(list) {
  return Math.max(...list);
}