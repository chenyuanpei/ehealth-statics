import {Map} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

// actions
import {
  BS_TABLE_DATE_SELECT_SUCCESS,
  BS_TABLE_PAGE_LOAD_DATA_REQUEST,
  BS_TABLE_PAGE_LOAD_DATA_SUCCESS,
  BS_TABLE_PAGE_NOMORE_DATA_SHOW,
  PAGE_SHOW_DEVICE_BIND_BS_TIPS
} from './actions'

const selectedDate = handleActions({
  [BS_TABLE_DATE_SELECT_SUCCESS]: (state, {payload}) => ({
    ...state,
    ...payload
  })
}, null)

// noMoreDataShow
const noMoreDataShow = handleActions({
  [BS_TABLE_PAGE_NOMORE_DATA_SHOW]: (state, {payload}) => payload,
}, false)

// data
const data = handleActions({
  [BS_TABLE_PAGE_LOAD_DATA_REQUEST]: (state, {payload}) => {
    if (payload.pageLoad) {
      return state.clear()
    }
    return state
  },
  [BS_TABLE_PAGE_LOAD_DATA_SUCCESS]: (state, {payload}) => {
    // alert(JSON.stringify(state))
    // alert(JSON.stringify(payload['roundRecords']))
    // payload['roundRecords'])
    let objectMap = {'roundRecords':[...payload['roundRecords']]}
    if(state.get('roundRecords')){

      let objectArr = state.get('roundRecords').concat(payload['roundRecords'])
      objectMap = {'roundRecords':[...objectArr]}
    }
    return Map(objectMap)
  }
}, Map())

// show
const show = handleActions({
  [PAGE_SHOW_DEVICE_BIND_BS_TIPS]: (state, {payload}) => payload,
}, false)

export default combineReducers({
  selectedDate,
  data,
  noMoreDataShow,
  show,
})
