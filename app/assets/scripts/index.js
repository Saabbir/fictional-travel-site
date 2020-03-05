import '../styles/index.postcss'
import MobileMenu from './modules/MobileMenu'
import StickyHeader from './modules/StickyHeader'
import RevealOnScroll from './modules/RevealOnScroll'

new MobileMenu()
new StickyHeader()
new RevealOnScroll('.feature-item', 75)
new RevealOnScroll('.testimonial', 60)








// Webpack Hot Module Replacement
if (module.hot) {
  module.hot.accept()
}