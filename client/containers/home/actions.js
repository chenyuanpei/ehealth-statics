import {createAction} from 'redux-actions'
import {push,replace} from 'react-router-redux'

// actions
import {iframePush} from '../../actions/iframe'

// 初始化
export const PAGE_HOME_INIT_REQUEST = Symbol('PAGE_HOME_INIT_REQUEST')
export const init = createAction(PAGE_HOME_INIT_REQUEST)

export const PAGE_HOME_LOAD_SUCCESS = Symbol('PAGE_HOME_LOAD_SUCCESS')
export const load = createAction(PAGE_HOME_LOAD_SUCCESS)

// 成员选择
export const HOME_MEMBER_SELECT = Symbol('HOME_MEMBER_SELECT')
export const selectMember = createAction(HOME_MEMBER_SELECT)

// bsLastDataLoad
export const BS_LAST_DATA_LOAD = Symbol('BS_LAST_DATA_LOAD')
export const bsLastDataLoad = createAction(BS_LAST_DATA_LOAD)

// getAverageHourRecord
export const BS_AVERAGE_HOUR_RECORD_LOAD = Symbol('BS_AVERAGE_HOUR_RECORD_LOAD')
export const getAverageHourRecord = createAction(BS_AVERAGE_HOUR_RECORD_LOAD)


export default {
  init,
  selectMember,
  push,
  replace,
  iframePush,
  bsLastDataLoad,
  getAverageHourRecord,
}
