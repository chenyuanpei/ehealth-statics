import {getIm} from '../ims'
import {getSession} from '../session'

// 调用uploadImg返回的数据，图片大小类型与msg的图片大小类型不一致，key为update返回的大小类型，value为对应msg的大小类型
const picTypeMap = {
  1: 1, // 原图
  2: 3, // 小图（缩略图）
  4: 2, // 大图
}

const formatImages = (images) => {
  const {File_UUID, URL_INFO} = images
  return {
    id: File_UUID,
    images: URL_INFO.map(img => {
      const {PIC_TYPE, PIC_Size, PIC_Width, PIC_Height, DownUrl} = img
      return {
        type: picTypeMap[PIC_TYPE],
        size: PIC_Size,
        width: PIC_Width,
        height: PIC_Height,
        url: DownUrl,
      }
    })
  }
}

// 上传图片
export const uploadImg = ({fromId, toId, file, sessionType, onProgressCallBack = () => undefined}) => {
  const im = getIm(fromId)

  return im.logged(async(resolve, reject) => {
    const {webim} = im
    let businessType // 业务类型，1-发群图片，2-向好友发图片
    if (sessionType === webim.SESSION_TYPE.C2C) { // 向好友发图片
      businessType = webim.UPLOAD_PIC_BUSSINESS_TYPE.C2C_MSG
    } else if (sessionType === webim.SESSION_TYPE.GROUP) { // 发群图片
      businessType = webim.UPLOAD_PIC_BUSSINESS_TYPE.GROUP_MSG
    }
    // 封装上传图片请求
    var opt = {
      'file': file, // 图片对象
      'onProgressCallBack': onProgressCallBack, // 上传图片进度条回调函数
      // 'abortButton': document.getElementById('upd_abort'), // 停止上传图片按钮
      'From_Account': fromId, // 发送者帐号
      'To_Account': toId, // 接收者
      'businessType': businessType, // 业务类型
    }
    // 上传图片
    webim.uploadPic(opt, (images) => {
      resolve(formatImages(images))
    }, reject)
  })
}

// 发送图片消息
export default ({
  fromId, // 发送者id
  toId, // 接受者id
  sessionType, // 会话类型
  content = {}, // 内容 {file,onProgressCallBack}
  time = Math.round(new Date().getTime() / 1000), // 消息时间戳
  seq = -1, // 消息序列，-1表示sdk自动生成，用于去重
  random = Math.round(Math.random() * 4294967296), // 消息随机数，用于去重
}) => {
  const im = getIm(fromId)

  return im.logged(async(resolve, reject) => {
    const {webim} = im

    const session = await getSession({fromId, toId, sessionType}) // 消息所属的会话 (e.g:我与好友A的C2C会话，我与群组G的GROUP会话)

    const isSend = true // 是否为自己发送
    const subType = webim.GROUP_MSG_SUB_TYPE.COMMON // 消息子类型

    const msg = new webim.Msg(session, isSend, seq, random, time, fromId, subType)

    const {file, onProgressCallBack} = content
    let {id, images} = content
    // 如果file存在，则上传file
    if (file) {
      const res = await uploadImg({fromId, toId, file, sessionType, onProgressCallBack})
      id = res.id
      images = res.images
    }
    const imagesElem = new webim.Msg.Elem.Images(id)

    images.forEach((img) => {
      const newImg = new webim.Msg.Elem.Images.Image(img.type, img.size, img.width, img.height, img.url)
      imagesElem.addImage(newImg)
    })

    msg.addImage(imagesElem)

    // 调用发送图片消息接口
    webim.sendMsg(msg, resolve, reject)
  })
}
