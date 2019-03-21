import {createSelector, createStructuredSelector} from 'reselect'
// 全局中的设备信息
import {createDeviceSelector, deviceEntitySelector} from '../../../selectors/data/device'
import {accountMembersSelector} from '../../../selectors/data/member'
import {myAccountSelector} from '../../../selectors/data/account'
import {tip, defUsers,weightDefUsers} from '../../../const/member'

// 当前页面的设备信息
import {pageSelector} from '../../../selectors/page'

const bindRolePageSelector = createSelector(
  pageSelector,
  (page) => page.get('bindRole')
)

// deviceId
const deviceIdSelector = (state, props) => props.params.deviceId
const deviceSelector = createDeviceSelector((state, props) => props.params.deviceId)

// showSelectSelector
const showSelectSelector = createSelector(
  bindRolePageSelector,
  (data) => data.get('showSelect')
)

// showConfirm
const showConfirmSelector = createSelector(
  bindRolePageSelector,
  (data) => data.get('showConfirm')
)

// userSelector
const userSelector = createSelector(
  bindRolePageSelector,
  (data) => data.get('user') || {}
)

// memberSelector
const memberSelector = createSelector(
  accountMembersSelector,
  (accountMembers) => {
    return accountMembers
  }
)

// 页面获取绑定成员a
export const rolesSelector = createSelector(
  deviceEntitySelector,
  deviceIdSelector,
  (deviceEntity, deviceId) => {
    const {deviceUsers: users} = deviceEntity.get(deviceId, {})
    const deviceInfo = deviceEntity.get(deviceId, {})

    let roles = {}
    if (users && users.length > 0) {
      if(deviceInfo.deviceType === '02'){
        [1, 2,3,4].map((userNo) => {
          const user = users.find(user => user.userNo === userNo)
          roles[userNo] = {
            ...weightDefUsers[userNo],
            ...user,
            headImgurl: user ? user.headImgurl : weightDefUsers[userNo].headImgurl
          }
        })
      }else{
        [1, 2].map((userNo) => {
          const user = users.find(user => user.userNo === userNo)
          roles[userNo] = {
            ...defUsers[userNo],
            ...user,
            tip: tip[userNo],
            headImgurl: user ? user.headImgurl : defUsers[userNo].headImgurl
          }
        })
      }

    } else {
      if(deviceInfo.deviceType === '02'){
        roles = weightDefUsers
      }else{
        roles = defUsers
      }

    }
    return roles
  }
)


// rolesNumSelector
export const rolesNumSelector = createSelector(
  deviceEntitySelector,
  memberSelector,
  deviceIdSelector,
  (deviceEntity,members, deviceId) => {
    const {deviceUsers: users} = deviceEntity.get(deviceId, {})
    let num = 0
    users && users.forEach((user)=>{
      members.find(function (v) {
        if(v.id === user.memberId){
          num ++
        }
      });
    })
    // var res = users.find(function (v) {
    //   if (JSON.stringify(v) === JSON.stringify(target)) return true;
    // });
    // if (users && users.length > 0) {
    //   num = users.length
    // }
    return num
  }
)

export default createStructuredSelector({
  device: deviceSelector,
  roles: rolesSelector,
  members: memberSelector,
  isShowSelect: showSelectSelector,
  isShowConfirm: showConfirmSelector,
  user: userSelector,
  rolesNum:rolesNumSelector
})
