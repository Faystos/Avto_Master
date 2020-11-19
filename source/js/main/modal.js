'use strict';

(function() {
  class Popup {
    constructor (btnOpen, blockModal) {
      this.btnOpen = document.querySelector(`.${btnOpen}`);
      this.blockModal = document.querySelector(`.${blockModal}`);
      this.modal = this.blockModal.querySelector(`.${blockModal}__modal`);
      this.btnClose = this.modal.querySelector(`.${blockModal}__close`);
      this.classModal = blockModal
      this.body = document.querySelector('body');
      this.modalInit();
    }

    modalInit() {
      this.btnOpen.addEventListener('click', this.openModal);
      this.blockModal.addEventListener('click', this.closeModal);
      this.modal.addEventListener('click', this.handlerModal)
    }

    openModal = () => {
      this.blockModal.classList.add(`${this.classModal}--open`);
      this.body.style.overflow = 'hidden';
      document.addEventListener('keydown', this.closeModalBtnEsc);
    }

    closeModal = (evt) => {
      this.blockModal.classList.remove(`${this.classModal}--open`);
      this.body.style.overflow = 'auto';
    }

    handlerModal = (evt) => {
      evt.stopPropagation();
      if (evt.target.parentElement === this.btnClose) this.closeModal();
    }

    closeModalBtnEsc = (evt) => {
      if (evt.keyCode === 27) {
        this.closeModal();
        document.removeEventListener('keydown', this.closeModalBtnEsc);
      } else {
        return;
      }
    }
  }

  new Popup('description__btn_engine_detailed', 'engine');
})();
