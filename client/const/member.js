import moment from 'moment'
import {baseHref} from '../config'

export const CREATE_MEMBER_ID = 'create'

// 默认成员设置
export const defMembers = [{
  type: 0,
  // headImgurl: `${rootUrl}/static/images/icon_user_no_man.png`,
  nickname: '我',
  sex: 1,
  // birthday: moment('1985-01-01', 'YYYY-MM-DD').valueOf(),
  // height: 170,
  // weight: 60,
  // waistline: 70
}, {
  type: 1,
  // headImgurl: `${rootUrl}/static/images/icon_user_no_man.png`,
  nickname: '爸爸',
  sex: 1,
  // birthday: moment('1970-01-01', 'YYYY-MM-DD').valueOf(),
  // height: 170,
  // weight: 60,
  // waistline: 70
}, {
  type: 2,
  // headImgurl: `${rootUrl}/static/images/icon_user_no_woman.png`,
  nickname: '妈妈',
  sex: 2,
  // birthday: moment('1965-01-01', 'YYYY-MM-DD').valueOf(),
  // height: 160,
  // weight: 50,
  // waistline: 70
}, {
  type: 1,
  // headImgurl: `${rootUrl}/static/images/icon_user_no_man.png`,
  nickname: '爸爸',
  sex: 1,
  // birthday: moment('1970-01-01', 'YYYY-MM-DD').valueOf(),
  // height: 170,
  // weight: 60,
  // waistline: 70
},{
  type: 1,
  // headImgurl: `${rootUrl}/static/images/icon_user_no_man.png`,
  nickname: '爸爸',
  sex: 1,
  // birthday: moment('1970-01-01', 'YYYY-MM-DD').valueOf(),
  // height: 170,
  // weight: 60,
  // waistline: 70
},]

// 默认设备tip
export const tip = {
  1: require('../../static/images/iocn_button_one.png'),
  2: require('../../static/images/icon_button_two.png')
}

// 默认选中tip
export const selectedTip = require('../../static/images/healthRecord/select_reveal_p.png')

// 默认设备用户
export const defUsers = {
  1: {
    headImgurl: require('../../static/images/btn_one.png'),
    nickname: '点击即可绑定',
    userNo: 1,
    tip: tip[1]
  },
  2: {
    headImgurl: require('../../static/images/btn_two.png'),
    nickname: '点击即可绑定',
    userNo: 2,
    tip: tip[2]
  }
}
// 体重秤设备用户
export const weightDefUsers = {
  1: {
    headImgurl: require('../../static/images/btn_one.png'),
    nickname: '点击即可绑定',
    userNo: 1,
  },
  2: {
    headImgurl: require('../../static/images/btn_one.png'),
    nickname: '点击即可绑定',
    userNo: 2,
  },
  3: {
    headImgurl: require('../../static/images/btn_one.png'),
    nickname: '点击即可绑定',
    userNo: 3,
  },
  4: {
    headImgurl: require('../../static/images/btn_one.png'),
    nickname: '点击即可绑定',
    userNo: 4,
  }
}

// 默认设备list用户
export const defListUsers = {
  1: {
    headImgurl: require('../../static/images/btn_one.png'),
    nickname: '未绑定',
    userNo: 1,
    tip: tip[1]
  },
  2: {
    headImgurl: require('../../static/images/btn_two.png'),
    nickname: '未绑定',
    userNo: 2,
    tip: tip[2]
  }
}

// 默认头像
export const defaultHeadImgurl = {
// 男性默认头像
//   1: require('../../static/images/icon_user_no_man.png'),
// // 女性默认头像
//   2: require('../../static/images/icon_user_no_woman.png'),
  1: window.location.protocol+'//'+window.location.host+'/healthbase/static/avatar/icon_user_no_man.png',
// 女性默认头像
  2: window.location.protocol+'//'+window.location.host+'/healthbase/static/avatar/icon_user_no_woman.png',
}
