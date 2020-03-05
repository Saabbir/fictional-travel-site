import '../styles/index.postcss'
import MobileMenu from './modules/MobileMenu'
import StickyHeader from './modules/StickyHeader'
import RevealOnScroll from './modules/RevealOnScroll'
import ScrollSpy from './modules/ScrollSpy'

new MobileMenu()
new StickyHeader()
new ScrollSpy()
new RevealOnScroll('.feature-item', 75)
new RevealOnScroll('.testimonial', 60)








// Webpack Hot Module Replacement
if (module.hot) {
  module.hot.accept()
}