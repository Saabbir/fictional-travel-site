import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class RevealOnScroll {
  constructor(className, thresholdPercent) {
    this.itemsToReveal = document.querySelectorAll(className)
    this.scrollThrottle = throttle(this.calculateIfScrolledTo, 200).bind(this)
    this.documentHeight = window.innerHeight
    this.thresholdPercent = thresholdPercent
    this.hideInitially()
    this.events()
  }

  events() {
    window.addEventListener('scroll', this.scrollThrottle)
    window.addEventListener('resize', debounce(() => {
      this.documentHeight = window.innerHeight
    }, 333))
  }

  calculateIfScrolledTo() {
    this.itemsToReveal.forEach(el => {
      if (!el.isRevealed) {
        if (window.scrollY + this.documentHeight > el.offsetTop) {
          const scrollPercent = (el.getBoundingClientRect().y / this.documentHeight) * 100
          if (scrollPercent < this.thresholdPercent) {
            el.classList.add('reveal-item--is-visible')
            el.isRevealed = true
            if (el.isLastItem) {
              window.removeEventListener('scroll', this.scrollThrottle)
            }
          }        
        }
      }
    })
  }

  hideInitially() {
    this.itemsToReveal.forEach(el => {
      el.classList.add('reveal-item')
      el.isRevealed = false
    })
    this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true
  }
}

export default RevealOnScroll