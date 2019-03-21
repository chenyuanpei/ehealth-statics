import {push as reactPush} from 'react-router-redux'

const format = (href, title) => {
  href = `others/iframe?href=${encodeURIComponent(href)}`

  if (title) {
    href += `&title=${title}`
  }
  return href
}

export const iframePush = (href, title) => reactPush(format(href, title))
