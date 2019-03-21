import {createAction} from 'redux-actions'

// 加载数据
export const PREOPERATIVE_END_SERVICE_DATA_REQUEST = Symbol('PREOPERATIVE_END_SERVICE_DATA_REQUEST')
export const loadData = createAction(PREOPERATIVE_END_SERVICE_DATA_REQUEST)

// showAlert
export const PREOPERATIVE_END_SERVICE_SHOW_ALERT = Symbol('PREOPERATIVE_END_SERVICE_SHOW_ALERT')
export const showAlert = createAction(PREOPERATIVE_END_SERVICE_SHOW_ALERT)

// showConfirm
export const PREOPERATIVE_END_SERVICE_EVENT_REQUEST = Symbol('PREOPERATIVE_END_SERVICE_EVENT_REQUEST')
export const endServiceEvent = createAction(PREOPERATIVE_END_SERVICE_EVENT_REQUEST)

// endServiceSuccess
export const PREOPERATIVE_END_SERVICE_EVENT_SUCCESS = Symbol('PREOPERATIVE_END_SERVICE_EVENT_SUCCESS')
export const endServiceSuccess = createAction(PREOPERATIVE_END_SERVICE_EVENT_SUCCESS)


export default {
  loadData,
  showAlert,
  endServiceEvent,
  endServiceSuccess
}
