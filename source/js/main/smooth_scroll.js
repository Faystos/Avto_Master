'use strict';

(function() {
  class Scrolling {
    constructor () {
      this.linkNav = document.querySelectorAll('[href^="#"]');
      this.linkNavArr = Array.prototype.slice.call(this.linkNav);
      this.speed = 1;
      this.scrollInit();
    }

    scrollInit() {
      this.linkNavArr.forEach(el => {
        el.addEventListener('click', evt => {
          evt.preventDefault();
          let speed = this.speed;
          let w = window.pageYOffset;
          let hash = el.href.replace(/[^#]*(.*)/, '$1');
          let t = document.querySelector(hash).getBoundingClientRect().top;
          let start = null;
          requestAnimationFrame(step);

          function step(time) {
            if (start === null) start = time;
            let progress = time - start;
            let r = (t < 0 ? Math.max(w - progress/speed, w + t) : Math.min(w + progress/speed, w + t));
            window.scrollTo(0,r);
            if (r != w + t) {
                requestAnimationFrame(step)
            } else {
                location.hash = hash;
            }
          }
        }, false);
      });
    }
  }

  new Scrolling();
})();




