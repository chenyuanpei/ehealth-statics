import {getIm} from '../ims'

export default ({
  fromId, // 发送者id
}) => {
  const im = getIm(fromId)

  return im.logged((resolve, reject) => {
    const {webim} = im
    webim.syncMsgs(resolve, reject)
  })
}
