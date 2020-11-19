'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function () {
  var Popup = /*#__PURE__*/function () {
    function Popup(btnOpen, blockModal) {
      var _this = this;

      _classCallCheck(this, Popup);

      _defineProperty(this, "openModal", function () {
        _this.blockModal.classList.add("".concat(_this.classModal, "--open"));

        _this.body.style.overflow = 'hidden';
        document.addEventListener('keydown', _this.closeModalBtnEsc);
      });

      _defineProperty(this, "closeModal", function (evt) {
        _this.blockModal.classList.remove("".concat(_this.classModal, "--open"));

        _this.body.style.overflow = 'auto';
      });

      _defineProperty(this, "handlerModal", function (evt) {
        evt.stopPropagation();
        if (evt.target.parentElement === _this.btnClose) _this.closeModal();
      });

      _defineProperty(this, "closeModalBtnEsc", function (evt) {
        if (evt.keyCode === 27) {
          _this.closeModal();

          document.removeEventListener('keydown', _this.closeModalBtnEsc);
        } else {
          return;
        }
      });

      this.btnOpen = document.querySelector(".".concat(btnOpen));
      this.blockModal = document.querySelector(".".concat(blockModal));
      this.modal = this.blockModal.querySelector(".".concat(blockModal, "__modal"));
      this.btnClose = this.modal.querySelector(".".concat(blockModal, "__close"));
      this.classModal = blockModal;
      this.body = document.querySelector('body');
      this.modalInit();
    }

    _createClass(Popup, [{
      key: "modalInit",
      value: function modalInit() {
        this.btnOpen.addEventListener('click', this.openModal);
        this.blockModal.addEventListener('click', this.closeModal);
        this.modal.addEventListener('click', this.handlerModal);
      }
    }]);

    return Popup;
  }();

  new Popup('description__btn_engine_detailed', 'engine');
})();

'use strict';

(function () {
  var Slider = /*#__PURE__*/function () {
    function Slider(blockSlider) {
      var _this2 = this;

      _classCallCheck(this, Slider);

      _defineProperty(this, "handlerBtnPrev", function (el, i) {
        if (i === 0) {
          _this2.sliderIndex--;
          if (_this2.sliderIndex < 0) _this2.sliderIndex = _this2.sliderItemArr.length - 1;
        }
      });

      _defineProperty(this, "handlerBtnNext", function (el, i) {
        if (i === 1) {
          _this2.sliderIndex++;
          if (_this2.sliderIndex > _this2.sliderItemArr.length - 1) _this2.sliderIndex = 0;
        }
      });

      _defineProperty(this, "renderSliderItem", function (sliderIndex) {
        _this2.sliderItemArr.forEach(function (el, index) {
          el.classList.remove("".concat(_this2.stringClassSlider, "_item--active"));
          if (index === sliderIndex) el.classList.add("".concat(_this2.stringClassSlider, "_item--active"));
        });
      });

      this.blockSlider = document.querySelector(".".concat(blockSlider));
      this.stringClassSlider = blockSlider; // Управление слайдером

      this.sliderControls = this.blockSlider.querySelectorAll(".".concat(blockSlider, "_control_item"));
      this.sliderControlArr = Array.prototype.slice.call(this.sliderControls); // Слайды

      this.sliderItems = this.blockSlider.querySelectorAll(".".concat(blockSlider, "_item"));
      this.sliderItemArr = Array.prototype.slice.call(this.sliderItems);
      this.sliderIndex = 0;
      this.initSlider();
    }

    _createClass(Slider, [{
      key: "initSlider",
      value: function initSlider() {
        var _this3 = this;

        this.sliderControlArr.forEach(function (el, i, arr) {
          el.addEventListener('click', function (evt) {
            _this3.handlerBtnPrev(el, i);

            _this3.handlerBtnNext(el, i);

            _this3.renderSliderItem(_this3.sliderIndex);
          });
        });
      }
    }]);

    return Slider;
  }();

  new Slider('description__slider');
})();

'use strict';

(function () {
  var Scrolling = /*#__PURE__*/function () {
    function Scrolling() {
      _classCallCheck(this, Scrolling);

      this.linkNav = document.querySelectorAll('[href^="#"]');
      this.linkNavArr = Array.prototype.slice.call(this.linkNav);
      this.speed = 1;
      this.scrollInit();
    }

    _createClass(Scrolling, [{
      key: "scrollInit",
      value: function scrollInit() {
        var _this4 = this;

        this.linkNavArr.forEach(function (el) {
          el.addEventListener('click', function (evt) {
            evt.preventDefault();
            var speed = _this4.speed;
            var w = window.pageYOffset;
            var hash = el.href.replace(/[^#]*(.*)/, '$1');
            var t = document.querySelector(hash).getBoundingClientRect().top;
            var start = null;
            requestAnimationFrame(step);

            function step(time) {
              if (start === null) start = time;
              var progress = time - start;
              var r = t < 0 ? Math.max(w - progress / speed, w + t) : Math.min(w + progress / speed, w + t);
              window.scrollTo(0, r);

              if (r != w + t) {
                requestAnimationFrame(step);
              } else {
                location.hash = hash;
              }
            }
          }, false);
        });
      }
    }]);

    return Scrolling;
  }();

  new Scrolling();
})();