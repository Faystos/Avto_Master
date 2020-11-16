'use strict';

(function() {
  class Slider {
    constructor (blockSlider) {
      this.blockSlider = document.querySelector(`.${blockSlider}`);
      this.stringClassSlider = blockSlider;
      // Управление слайдером
      this.sliderControls = this.blockSlider.querySelectorAll(`.${blockSlider}_control_item`);
      this.sliderControlArr = Array.prototype.slice.call(this.sliderControls);
      // Слайды
      this.sliderItems = this.blockSlider.querySelectorAll(`.${blockSlider}_item`);
      this.sliderItemArr = Array.prototype.slice.call(this.sliderItems);
      this.sliderIndex = 0;
      this.initSlider();
    }

    initSlider() {
      this.sliderControlArr.forEach((el, i, arr) => {
        el.addEventListener('click', evt => {
          this.handlerBtnPrev(el, i);
          this.handlerBtnNext(el, i);
          this.renderSliderItem(this.sliderIndex);
        })
      });
    }

    handlerBtnPrev = (el, i) => {
      if (i === 0) {
        this.sliderIndex--
        if (this.sliderIndex < 0) this.sliderIndex = this.sliderItemArr.length - 1;
      }
    }

    handlerBtnNext = (el, i) => {
      if ( i === 1) {
        this.sliderIndex++
        if (this.sliderIndex > this.sliderItemArr.length - 1) this.sliderIndex = 0;
      }
    }

    renderSliderItem = sliderIndex => {
      this.sliderItemArr.forEach((el, index) => {
        el.classList.remove(`${this.stringClassSlider}_item--active`);
        if (index === sliderIndex) el.classList.add(`${this.stringClassSlider}_item--active`);
      });
    }
  }

  new Slider('description__slider');
})();
