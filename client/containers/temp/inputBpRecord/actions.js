import {createAction} from 'redux-actions'
// actions
// import {getMembers} from '../../../actions/api/member/getMembers'
// import {addBpRecord} from '../../../actions/api/records/bp/addBpRecord'
// import {generateReport as generateReportAction} from '../../../actions/api/healthReport/generateReport'

// 加载数据
export const INIT = Symbol('temp-inputBpRecord/INIT')
export const init = createAction(INIT)
// export const init = () => async(dispatch, getState) => {
//   // 获取成员列表
//   await getMembers()(dispatch, getState)
// }

// 提交
export const SUBMIT = Symbol('temp-inputBpRecord/SUBMIT')
export const submit = createAction(SUBMIT)
// export const submit = (bpRecord) => async(dispatch, getState) => {
//   await addBpRecord(bpRecord)(dispatch, getState)
// }

// 生成周报
export const GENERATE_REPORT = Symbol('temp-inputBpRecord/GENERATE_REPORT')
export const generateReport = createAction(GENERATE_REPORT)
// export const generateReport = (memberId) => async(dispatch, getState) => {
//   await generateReportAction(memberId)(dispatch, getState)
// }

export default {
  init,
  submit,
  generateReport,
}
