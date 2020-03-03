class MobileMenu {
  constructor() {
    this.menuIcon = document.querySelector('.site-header__menu-icon')
    this.menuContent = document.querySelector('.site-header__menu-content')
    this.header = document.querySelector('.site-header')
    this.events()
  }

  events() {
    this.menuIcon.addEventListener('click', () => this.toggleMenuContent())
  }

  toggleMenuContent() {
    this.menuContent.classList.toggle('site-header__menu-content--is-visible')
    this.header.classList.toggle('site-header--is-expanded')
  }
}

export default MobileMenu