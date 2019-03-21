import {combineReducers} from 'redux-immutable'
import {List} from 'immutable'
import {handleActions} from 'redux-actions'

// actions
import {
  HEALTH_REPORT_LIST_PAGE_LOAD_DATA,
  PAGE_GET_HEALTH_REPORT_LIST,
  PAGE_GET_HEALTH_DATA_CLASS,
} from './actions'

const healthReportHistory = handleActions({
  [HEALTH_REPORT_LIST_PAGE_LOAD_DATA]: (state, {payload}) => {
    if (payload.pageLoad) {
      return state.clear()
    }
    return state
  },
  [PAGE_GET_HEALTH_REPORT_LIST]: (state, {payload}) => state.concat(List.of(...payload)),
}, List())


const dataClass = handleActions({
  [PAGE_GET_HEALTH_DATA_CLASS]: (state, {payload}) => payload,
},'bloodPress')



export default combineReducers({
  healthReportHistory,
  dataClass,
})
