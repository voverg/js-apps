class Dom {
  constructor(elem) {
    if (isString(elem)) {
      elem = document.querySelector(elem);
    }

    this.elem = elem;
    this.isDom = true; // Поле для идентификации экземпляра данного класса
  }

  on(eventName, func, context = null) {
    // func = func.bind(context);
    this.elem.addEventListener(eventName, func);

    return this;
  }

  off(eventName, func, context = null) {
    // func = func.bind(context);
    this.elem.removeEventListener(eventName, func);

    return this;
  }

  addClass(...classNames) {
    this.elem.classList.add(...classNames);

    return this;
  }

  removeClass(className) {
    this.elem.classList.remove(className);

    return this;
  }

  hasClass(className) {
    return this.elem.classList.contains(className);
  }

  html(html) {
    if (isUndefined(html)) {
      return this.elem.innerHTML;
    }

    if (html.isDom) {
      html = html.elem.innerHTML;
    }
    this.elem.innerHTML = html;

    return this;
  }

  append(anotherElem) {
    if (anotherElem.isDom) {
      anotherElem = anotherElem.elem;
    }
    this.elem.append(anotherElem);

    return this;
  }

  getParent(className) {
    const parent = $(this.elem.closest(className));

    return parent;
  }

  attr(name, val = null) {
    if (isNull(val)) {
      return this.elem.getAttribute(name);
    }
    this.elem.setAttribute(name, val);

    return this;
  }

  dataSet(dataName, val = null) {
    if (isNull(val)) {
      return this.elem.dataset[dataName];
    }
    this.elem.dataset[dataName] = val;

    return this;
  }

  find(selector) {
    return $(this.elem.querySelector(selector));
  }

  findAll(selector) {
    let foundElems = this.elem.querySelectorAll(selector);
    foundElems = Array.from(foundElems).map(elem => $(elem));

    return foundElems;
  }

  has(selector) {
    return this.find(selector).elem;
  }

  focus() {
    this.elem.focus();
  }

  value(text = null) {
    if (isNull(text)) {
      return this.elem.value;
    }

    this.elem.value = text;
    return this;
  }
}



function $(elem) {
  return new Dom(elem);
}