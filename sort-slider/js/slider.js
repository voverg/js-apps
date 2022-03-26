class Slider {
  constructor(slides) {
    this.slides = slides;
    this.sortedSlideList = this.slides;
    this.sliderElem = document.querySelector('.slider');
    this.slidesElem = null;

    this.slidesCount = this.slides.length;
    this.visibleSlideCount = 3;
    this.offset = 305;
    this.prevIndex = 0;
    this.nextIndex = this.prevIndex + this.visibleSlideCount - 1;

    this.init();
  } 

  init() {
    this.create();
    this.show();
  }

  create() {
    this.sliderElem.innerHTML = sliderTemplate;
    this.slidesElem = this.sliderElem.querySelector('.slides');

    this.sliderElem.addEventListener('click', this._clickHandler.bind(this));

  }

  show(type = 'all') {
    this.sortedSlideList = this.sortByType(type);
    this.slidesCount = this.sortedSlideList.length;
    this.prevIndex = 0;
    this.nextIndex = this.prevIndex + this.visibleSlideCount - 1;
    const slides = [];

    this.sortedSlideList.forEach((slide, index) => {
      if (index > 2) return;
      slides.push(this._getSlide(slide));
    });

    this.slidesElem.innerHTML = slides.join('');
  }

  sortByType(type) {
    if (type === 'all') {
      return this.slides;
    }
    
    return this.slides.filter(slide => slide.type === type);
  }

  _clickHandler({target}) {
    if (target.dataset.type) {
      this.show(target.dataset.type);
    } else if (target.classList.contains('slider__btn')) {
      this._changeSlide(target);
    } 
  }

  _changeSlide(slide) {
    this.slidesElem.style.transition = `transform 0.5s ease-in-out`;

    if (slide.classList.contains('prev__btn')) {
      this._movePrev();
    } else if (slide.classList.contains('next__btn')) {
      this._moveNext();
    }
  }

  _movePrev() {
    this.slidesElem.style.transition = `none`;
    this.slidesElem.style.transform = `translateX(-${this.offset}px)`;

    this.prevIndex--;
    if (this.prevIndex < 0) {
      this.prevIndex = this.slidesCount - 1;
    }

    this.nextIndex--;
    if (this.nextIndex < 0) {
      this.nextIndex = this.slidesCount - 1;
    }

    const newSlide = this._getSlide(this.sortedSlideList[this.prevIndex]);
    this.slidesElem.insertAdjacentHTML('afterbegin', newSlide);
    this.slidesElem.children[this.slidesElem.children.length - 1].classList.add('slide--hide');

    const timeoutID = setTimeout(() => {
      this.slidesElem.style.transition = `transform 0.5s ease-in-out`;
      this.slidesElem.style.transform = `translateX(0)`;

      this.slidesElem.children[this.slidesElem.children.length - 1].remove();
      clearTimeout(timeoutID);
    }, 300);
  }

  _moveNext() {
    this.prevIndex++;
    if (this.prevIndex >= this.slidesCount) {
      this.prevIndex = 0;
    }

    this.nextIndex++;
    if (this.nextIndex >= this.slidesCount) {
      this.nextIndex = 0;
    }

    const newSlide = this._getSlide(this.sortedSlideList[this.nextIndex]);
    this.slidesElem.insertAdjacentHTML('beforeend', newSlide);

    this.slidesElem.children[0].classList.add('slide--hide');
    this.slidesElem.style.transform = `translateX(-${this.offset}px)`;

    const timeoutID = setTimeout(() => {
      this.slidesElem.style.transition = `none`;
      this.slidesElem.style.transform = `translateX(0)`;

      this.slidesElem.children[0].remove();
      clearTimeout(timeoutID);
    }, 500);
  }

  _getSlide({ id, type, title, link}) {
    return `
      <div class="slide">
        <div class="slide__title" id="${id}">${title}</div>
        <img src="${link}" alt="${title} img" class="slide__img">
      </div>
    `;
  }

}

const sliderTemplate = `
  <div class="slider__head">
    <ul class="slider__nav">
      <li class="slider__nav-item" data-type="all">All</li>
      <li class="slider__nav-item" data-type="cat">Cats</li>
      <li class="slider__nav-item" data-type="dog">Dogs</li>
      <li class="slider__nav-item" data-type="apple">Apples</li>
    </ul>
  </div>
  <div class="slider__content">
    <div class="slides"></div>
    
    <button class="slider__btn prev__btn"><</button>
    <button class="slider__btn next__btn">></button>
  </div>
`;