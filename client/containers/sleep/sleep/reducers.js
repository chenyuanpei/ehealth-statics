import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

import {
  PAGE_SLEEP_INIT_SUCCESS,
  changeRecordsLoading,
  changeShowMore,
  getSleepDataSuccess,
  getSleepListSuccess,
  getSleepWeekListSuccess,
  PAGE_SHOW_DEVICE_BIND_SLEEP_TIPS
} from './actions'

const loaded = handleActions({
  [PAGE_SLEEP_INIT_SUCCESS]: () => true,
}, false)

const recordsLoading = handleActions({
  [changeRecordsLoading]: (state, {payload}) => payload,
}, false)

const showMore = handleActions({
  [changeShowMore]: (state, {payload}) => payload,
}, false)


const sleepData = handleActions({
  [getSleepDataSuccess]: (state, {payload}) => payload
}, null)


const sleepList = handleActions({
  [getSleepListSuccess]: (state, {payload}) => payload,
}, [])

const sleepWeekList = handleActions({
  [getSleepWeekListSuccess]: (state, {payload}) => {
    return payload
  },
}, [])


// show
const show = handleActions({
  [PAGE_SHOW_DEVICE_BIND_SLEEP_TIPS]: (state, {payload}) => payload,
}, false)



export default combineReducers({
  loaded,
  recordsLoading,
  showMore,
  sleepData,
  sleepList,
  sleepWeekList,
  show
})
