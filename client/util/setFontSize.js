const viewBase = 640
const fontSizeNum = 50
const styleId = '___SET_FONT_SIZE_ID'

function resize() {
  // const winWidth = window.screen.width
  const winWidth = document.body.offsetWidth

  const fontSize = parseInt(winWidth / viewBase * fontSizeNum)

  let styleEl = document.getElementById(styleId)

  const isFirst = !styleEl

  if (isFirst) {
    styleEl = document.createElement('style')
    styleEl.id = styleId
  }

  if (isFirst || document.documentElement.clientHeight >= document.documentElement.clientWidth) {
    styleEl.innerHTML = `html{font-size:${fontSize}px}`
  }

  if (isFirst) {
    const headEl = document.getElementsByTagName("head")[0]
    headEl.appendChild(styleEl)
  }
}

export default () => {
  resize()

  let timeoutId

  window.addEventListener('resize', function () {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      resize()
    }, 300)
  })
}

export function calc(px) {
  return (px / fontSizeNum) + 'rem'
}
