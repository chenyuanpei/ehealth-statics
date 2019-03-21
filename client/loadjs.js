const storageVersionKey = '___VERSION'
const storageAppjsKey = '___APPJS'

class Loadjs {

  constructor(src, cb) {
    if (process.env.NODE_ENV !== 'production') {
      return this.loadScript(src, cb)
    }

    this.initVersion()

    this.loadjs(src, cb)
  }

  initVersion() {
    this.version = window.___VERSION || '2.0.0'
  }

  loadScript(src, cb) {
    const ref = document.getElementsByTagName("script")[0]
    const script = document.createElement("script")
    script.src = src
    ref.parentNode.insertBefore(script, ref)
    if (cb && typeof (cb) === "function") {
      script.onload = cb
    }
    return script
  }

  // 添加script元素
  addScript(scriptText, cb) {
    const ref = document.getElementsByTagName("script")[0]
    const script = document.createElement("script")
    script.innerHTML = scriptText
    ref.parentNode.insertBefore(script, ref)

    cb && cb()

    this.setItem(storageAppjsKey, scriptText)
    this.setItem(storageVersionKey, this.version)
  }

  getItem(key) {
    /* eslint-disable */
    return localStorage.getItem(key)
    /* eslint-enable */
  }

  setItem(key, value) {
    /* eslint-disable */
    return localStorage.setItem(key, value)
    /* eslint-enable */
  }

  removeItem(key) {
    /* eslint-disable */
    return localStorage.removeItem(key)
    /* eslint-enable */
  }

  clear() {
    // localStorage.clear()
    this.removeItem(storageVersionKey)
    this.removeItem(storageAppjsKey)
  }

  checkCache() {
    const prevVersion = this.getItem(storageVersionKey)
    return prevVersion === this.version
  }

  ajax(src, success) {
    /* eslint-disable */
    const xmlhttp = new XMLHttpRequest()
    /* eslint-enable */
    xmlhttp.open("GET", src + '?t=' + new Date().getTime(), true)
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        success(xmlhttp.responseText)
      }
    }
    xmlhttp.send()
  }

  ajaxScript(src, cb) {
    this.ajax(src, (scriptText) => {
      this.addScript(scriptText, cb)
    })
  }

  loadjs(src, cb) {
    if (this.checkCache()) {
      const scriptText = this.getItem(storageAppjsKey)
      this.addScript(scriptText, cb)
    } else {
      this.clear()
      this.ajaxScript(src, cb)
    }
  }
}
/* eslint-disable */
new Loadjs('/static/scripts/app.js')
/* eslint-enable */

