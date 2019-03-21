export default (title) => {
  document.title = title
  const iframe = document.createElement('iframe')
  iframe.src = "/favicon.ico"
  iframe.style.display = 'none'

  const loadEvent = () => {
    setTimeout(() => {
      iframe.removeEventListener('load', loadEvent, false)
      iframe.remove()
    }, 0)
  }

  iframe.addEventListener('load', loadEvent, false)

  document.body.appendChild(iframe)
}
