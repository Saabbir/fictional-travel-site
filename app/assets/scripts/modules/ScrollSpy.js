import throttle from 'lodash/throttle'

class ScrollSpy {
  constructor() {
    this.spySections = document.querySelectorAll('.js-spy-section')
    this.spyLinks = document.querySelectorAll('.primary-nav__link')
    this.headerHeight = document.querySelector('.site-header').offsetHeight
    this.events()
  }

  events() {
    window.addEventListener('scroll', throttle(() => {
      this.initScrollSpy()
    }, 200))
  }

  initScrollSpy() {
    const scrollTop = window.scrollY + this.headerHeight
    this.spySections.forEach(section => {
      if (scrollTop >= section.offsetTop) {
        this.spyLinks.forEach(link => link.classList.remove('is-current-link'))
        const sectionLink = section.getAttribute('data-matching-link')
        if (sectionLink) {
          document.querySelector(sectionLink).classList.add('is-current-link')
        }
      }
    })
  }
}

export default ScrollSpy