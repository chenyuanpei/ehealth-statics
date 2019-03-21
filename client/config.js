import onlineConfig from '../config/online'
import qaConfig from '../config/qa'
import qa2Config from '../config/qa2'
import devConfig from '../config/dev'
import localConfig from '../config/local'

let config
// 通过当前域名获取对应配置
const webHostname = window.location.hostname
const protocol = window.location.protocol // https/http
config = [
  onlineConfig,
  qaConfig,
  qa2Config,
  devConfig,
].find((item) => item.hostname === webHostname)

console.log('config', config);

// 如果没有对应域名配置，则取本地配置
if (!config) {
  config = localConfig
}

const {apiUrl, im, devLoginInfo, hostname} = config
const baseHref = process.env.ROOT_PATH // “/health/”
const rootRoute = `${hostname}${baseHref}#` // “localhost/health/#”

module.exports = {
  protocol,
  hostname,
  apiUrl,
  im,
  baseHref,
  rootRoute,
  devLoginInfo,
  ...config,
}
