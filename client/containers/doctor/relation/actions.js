import {createAction} from 'redux-actions'

// import {getSqmbMemberById, GET_SQMB_MEMBER_BY_ID} from '../../../actions/api/member/getSqmbMember'
// import {getDoctorById} from '../../../actions/api/doctor/getDoctor'
// import {relationDoctor} from '../../../actions/api/member/relationDoctor'
// import {checkRelation} from '../../../actions/api/member/checkRelation'
// selectors
// import {memberInfoSelector} from './selectors'
// import {memberSelector} from '../../../selectors/member/member'
// toast
// import {toast} from '../.././../components/common/toast/PubSubToast'

// ------------初始化
export const INIT_REQUEST = Symbol('INIT_REQUEST')
export const init = createAction(INIT_REQUEST)

export const INIT_SUCCESS = Symbol('INIT_SUCCESS')
export const initSuccess = createAction(INIT_SUCCESS)

// 显示输入框
export const SHOW_INPUT_DIALOG = Symbol('SHOW_INPUT_DIALOG')
export const showInputDialog = createAction(SHOW_INPUT_DIALOG)

export const SHOW_INPUT_DIALOG_SUCCESS = Symbol('SHOW_INPUT_DIALOG_SUCCESS')
export const showInputDialogSuccess = createAction(SHOW_INPUT_DIALOG_SUCCESS)

// 显示下拉框
export const SHOW_SELECT_DIALOG = Symbol('SHOW_SELECT_DIALOG')
export const showSelectDialog = createAction(SHOW_SELECT_DIALOG)

export const SHOW_SELECT_DIALOG_SUCCESS = Symbol('SHOW_SELECT_DIALOG_SUCCESS')
export const showSelectDialogSuccess = createAction(SHOW_SELECT_DIALOG_SUCCESS)

// ----------改变member的值
export const CHANGE_RELATION_MEMBER = Symbol('CHANGE_RELATION_MEMBER')
export const changeMember = createAction(CHANGE_RELATION_MEMBER)

// -----------发送关联请求
export const SEND_REQUEST = Symbol('SEND_REQUEST')
export const send = createAction(SEND_REQUEST)

// 发送关联请求成功
export const SEND_SUCCESS = Symbol('SEND_SUCCESS')
export const sendSuccess = createAction(SEND_SUCCESS)

// 发送城市请求
export const CHANGE_AREA_DATA = Symbol('CHANGE_AREA_DATA')
export const changeArea = createAction(CHANGE_AREA_DATA)

// 城市请求成功
export const GET_AREA_SUCCESS = Symbol('GET_AREA_SUCCESS')
export const getAreaSuccess = createAction(GET_AREA_SUCCESS)

// showConfirm 显示关联医生
export const PAGE_RELATION_DOCTOR_CONFIRM= Symbol('PAGE_RELATION_DOCTOR_CONFIRM')
export const showConfirm = createAction(PAGE_RELATION_DOCTOR_CONFIRM)

// 发送关联请求成功
export const PAGE_RELATION_DOCTOR_WATCH_CONFIRM = Symbol('PAGE_RELATION_DOCTOR_WATCH_CONFIRM')
export const watchShowConfirm = createAction(PAGE_RELATION_DOCTOR_WATCH_CONFIRM)

// clear
export const CLEAR = Symbol('relation@clear')
export const clear = createAction(CLEAR)


export default {
  init,
  showInputDialog,
  showSelectDialog,
  changeMember,
  send,
  changeArea,
  getAreaSuccess,
  showConfirm,
  watchShowConfirm,
  clear
}
