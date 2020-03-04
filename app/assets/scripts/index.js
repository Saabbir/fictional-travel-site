import '../styles/index.postcss'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'

new MobileMenu()
new RevealOnScroll()








// Webpack Hot Module Replacement
if (module.hot) {
  module.hot.accept()
}