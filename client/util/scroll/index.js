import Scroll from './scroll'
import util from './util'

export default () => {
  /* eslint-disable */
  new Scroll({
    el: util.checkDeviceType('ios') ? document.getElementById('root') : document.body
  })
  /* eslint-enable */
}
