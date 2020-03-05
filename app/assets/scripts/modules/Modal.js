class Modal {
  constructor() {
    this.injectHTML()
    this.openModalButtons = document.querySelectorAll('.open-modal')
    this.closeModalButton = document.querySelector('.modal__close')
    this.modal = document.querySelector('.modal')
    this.events()
  }

  events() {
    // Listen for open modal button click
    this.openModalButtons.forEach(btn => {
      btn.addEventListener('click', e => { this.openTheModal(e) })
    })

    // Listen for close modal button click
    this.closeModalButton.addEventListener('click', e => { this.closeTheModal() })

    // Listen for escape key press
    document.addEventListener('keyup', e => {
      if (e.keyCode === 27) {
        this.closeTheModal()
      }
     })
  }

  openTheModal(e) {
    e.preventDefault()
    this.modal.classList.add('modal--is-visible')
  }

  closeTheModal() {
    this.modal.classList.remove('modal--is-visible')
  }

  injectHTML() {
    document.body.insertAdjacentHTML('beforeend', `
    <div class="modal">
      <div class="modal__inner">
        <div class="wrapper wrapper--narrow">
          <h2 class="section-title section-title--blue section-title--less-margin"><img src="assets/images/icons/mail.svg" class="section-title__icon"> Get in <strong>Touch</strong></h2>
          <p class="modal__description">We will have an online order system in place soon. Until then, connect with us on any of the platforms below!</p>
          <div class="social-icons">
            <a href="#" class="social-icons__icon"><img src="assets/images/icons/facebook.svg" alt="Facebook"></a>
            <a href="#" class="social-icons__icon"><img src="assets/images/icons/twitter.svg" alt="Twitter"></a>
            <a href="#" class="social-icons__icon"><img src="assets/images/icons/instagram.svg" alt="Instagram"></a>
            <a href="#" class="social-icons__icon"><img src="assets/images/icons/youtube.svg" alt="YouTube"></a>
          </div>
        </div>
      </div>
      <div class="modal__close">X</div>
    </div>    
    `)
  }
}

export default Modal