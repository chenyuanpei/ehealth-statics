import {createAction} from 'redux-actions'
// api
// import {getMemberById} from '../../../../actions/api/member/getMember'
// import {getById} from '../../../../actions/api/healthReport/getById'
// selector
// import {getData} from '../../../../selectors/action'

export const INIT_REQUEST = Symbol('HEALTH_REPORT_DETAIL_INIT_REQUEST')
export const init = createAction(INIT_REQUEST)

export const INIT_SUCCESS = Symbol('HEALTH_REPORT_DETAIL_INIT_SUCCESS')
export const initSuccess = createAction(INIT_SUCCESS)



// getRecordPerMealAndDayData
export const PAGE_GET_RECORD_PER_MEAL_AND_DAY_DATA = Symbol('PAGE_GET_RECORD_PER_MEAL_AND_DAY_DATA')
export const getRecordPerMealAndDayData = createAction(PAGE_GET_RECORD_PER_MEAL_AND_DAY_DATA)


// getDetailList
export const PAGE_GET_DETAIL_LIST_DATA = Symbol('PAGE_GET_DETAIL_LIST_DATA')
export const getDetailListData= createAction(PAGE_GET_DETAIL_LIST_DATA)


// clear
export const CLEAR = Symbol('reportDetail@clear')
export const clear = createAction(CLEAR)
// const init = ({memberId, reportId}) => async(dispatch, getState) => {
// try {
//   const [getMemberAction, getReportAction] = await Promise.all([
//     // 根据memberId获取member
//     dispatch(getMemberById(memberId)),
//     // 根据reportId获取健康周报
//     dispatch(getById({id: reportId}))
//   ])
//
//   return {
//     report: getData(getReportAction)
//   }
// } catch (e) {
//   console.log(e)
// }
// }

export default {
  init,
  getRecordPerMealAndDayData,
  getDetailListData,
  clear,
}
