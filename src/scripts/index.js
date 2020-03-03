import '../styles/index.postcss'
import MobileMenu from './modules/MobileMenu'

if (module.hot) {
  module.hot.accept()
}

new MobileMenu()