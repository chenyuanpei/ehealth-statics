import {createSelector, createStructuredSelector} from 'reselect'
import {createDeviceSelector,deviceEntitySelector} from '../../../selectors/data/device'
import {pageSelector} from '../../../selectors/page'
import {tip, defUsers} from '../../../const/member'
const deviceSelector = createDeviceSelector((state, props) => props.params.deviceId)

// deviceinfo
export const deviceListSelector = createSelector(
  pageSelector,
  (page) => page.get('deviceInfo')
)
const deviceIdSelector = (state, props) => props.params.deviceId
// editShow
const editShowSelector = createSelector(
  deviceListSelector,
  (data) => data.get('editShow')
)
// 页面获取绑定成员a
export const rolesSelector = createSelector(
  deviceEntitySelector,
  deviceIdSelector,
  (deviceEntity, deviceId) => {
    const {deviceUsers: users} = deviceEntity.get(deviceId, {})
    let roles = {}
    if (users && users.length > 0) {
      [1, 2].map((userNo) => {
        const user = users.find(user => user.userNo === userNo)
        roles[userNo] = {
          ...defUsers[userNo],
          ...user,
          tip: tip[userNo],
          headImgurl: user ? user.headImgurl : defUsers[userNo].headImgurl
        }
      })
    } else {
      roles = defUsers
    }
    return roles
  }
)

// qrcodeShow
const qrcodeShowSelector = createSelector(
  deviceListSelector,
  (data) => data.get('qrcodeShow')
)

// deleteShow
const deleteShowSelector = createSelector(
  deviceListSelector,
  (data) => data.get('deleteShow')
)

export default createStructuredSelector({
  roles: rolesSelector,
  device: deviceSelector,
  isShowEdit: editShowSelector,
  isShowQrcode: qrcodeShowSelector,
  isShowDelete: deleteShowSelector
})
