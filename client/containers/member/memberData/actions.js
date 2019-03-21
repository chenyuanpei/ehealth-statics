import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'
// const
// import {defMembers} from '../../../const/member'
// selectors
// import {getData} from '../../../selectors/action'
// import {memberSelector} from '../../../selectors/member/member'
// import {memberSelector as pageMemberSelector} from './selectors'
// import {accountSelector} from '../../../selectors/account/account'
// actions
// import {push, goBack, replace} from 'react-router-redux'
// import {getMemberById} from '../../../actions/api/member/getMember'
// import {saveMember} from '../../../actions/api/member/saveMember'
// import {addAndBind} from '../../../actions/api/device/addBindRoleDevice'
// import {uploadImg as uploadImgApi} from '../../../actions/api/common/uploadImg'
// import {getAccount} from '../../../actions/api/account/getAccount'
// toast
// import {toast} from '../../../components/common/toast/PubSubToast'

// 初始化
export const MEMBER_DATA_PAGE_INIT = Symbol('MEMBER_DATA_PAGE_INIT_REQUEST')
export const init = createAction(MEMBER_DATA_PAGE_INIT)

// 修改member
export const MEMBER_MEMBER_DATA_CHANGE_MEMBER = Symbol('MEMBER_MEMBER_DATA_CHANGE_MEMBER')
export const changeMember = createAction(MEMBER_MEMBER_DATA_CHANGE_MEMBER)

// showEdit
export const MEMBER_MEMBER_DATA_SHOW_EDIT = Symbol('MEMBER_MEMBER_DATA_SHOW_EDIT')
const showEdit = createAction(MEMBER_MEMBER_DATA_SHOW_EDIT)

// showSelect
export const MEMBER_MEMBER_DATA_SHOW_SELECT = Symbol('MEMBER_MEMBER_DATA_SHOW_SELECT')
const showSelect = createAction(MEMBER_MEMBER_DATA_SHOW_SELECT)

// editHeadImg
export const MEMBER_DATA_EDIT_EDIT_HEADIMG = Symbol('MEMBER_DATA_EDIT_EDIT_HEADIMG')
const editHeadImg = createAction(MEMBER_DATA_EDIT_EDIT_HEADIMG)

// save request
export const MEMBER_DATA_PAGE_SAVE = Symbol('MEMBER_DATA_PAGE_SAVE')
export const save = createAction(MEMBER_DATA_PAGE_SAVE)
// 修改昵称
export const UPDATE_NICKNAME_REQUEST = Symbol('UPDATE_NICKNAME_REQUEST')
export const updateNickName = createAction(UPDATE_NICKNAME_REQUEST)

// 上传头像图片
export const UPLOAD_HEAD_IMG_REQUEST = Symbol('UPLOAD_HEAD_IMG_REQUEST')
export const upLoadHeadImg = createAction(UPLOAD_HEAD_IMG_REQUEST)
// ---- 初始化
// const init = ({
//   id,
//   memberType, // 0:自己，1:爸爸，2：妈妈
// }) => (dispatch, getState) => {
// // 不是创建页面，加载成员信息
// if (id !== 'create') {
//   return getMemberById(id)(dispatch, getState).then(() => {
//     return dispatch(changeMember(memberSelector(getState(), id)))
//   })
// }
//
// // id == 'create'时，根据memberType从defMembers中获取默认值
// const member = {...defMembers[memberType || 0]}
// if (!(memberType - 0)) { // memberType == 0 的时候，使用account的头像、昵称
//   return getAccount()(dispatch, getState).then(
//     () => {
//       const account = accountSelector(getState())
//
//       return dispatch(changeMember({
//         ...member,
//         nickname: account.nickname,
//         headimgurl: account.headimgurl
//       }))
//     }
//   )
// }
//
// return dispatch(changeMember(member))
// }

// uploadImg
const uploadImg = (serverId) => (dispatch, getState) => {
  // return uploadImgApi(serverId)(dispatch, getState).then(
  //   (action) => {
  //     const headimgurl = getData(action)
  //     const member = pageMemberSelector(getState())
  //     return dispatch(changeMember({...member, headimgurl}))
  //   }
  // )
}

// 保存
// const save = ({member, redirect, deviceId, userNo}) => (dispatch, getState) => {
// const callback = (memberId) => {
//   if (!redirect) {
//     dispatch(goBack())
//     return
//   }
//   const redirectUrl = redirect.replace(':memberId', memberId)
//   dispatch(goBack())
//   dispatch(replace(redirectUrl))
//   // history.back()
//   // history.replaceState(null, null, redirectUrl)
// }
//
// let nowTime = new Date().getTime()
// // 不可重现的bug，偶然会出现出生年月变得很大。4106年之类的，但是月份和日期是正确的。这里强行叫用户重选一次。
// if (member.birthday > nowTime) {
//   toast('出生年月有误，请重新选择')
//   return
// }
//
// if (deviceId && userNo) {
//   return addAndBind(deviceId, member, userNo)(dispatch, getState).then(callback)
// } else {
//   return saveMember({
//     ...member,
//     manager: true
//   })(dispatch, getState).then(callback)
// }
// }

export default {
  init,
  save,
  push,
  showEdit,
  changeMember,
  showSelect,
  updateNickName,
  editHeadImg,
  upLoadHeadImg,
}
