import {select} from 'redux-saga/effects'
import {callApi} from '../api'

// actions
import {
  GET_TASK_DATA_REQUEST,
  GET_TASK_DATA_SUCCESS,
  GET_TASK_DATA_FAILURE
} from '../../actions/data/newbieTask'

// apis
import {
  getTaskDataApi
} from '../../apis/healthService/newbieTask'

import {NEWBIETASK} from '../../schemas'

// 获取新手任务数据
export function * getNewbietask() {
  return yield callApi({
    types: [
      GET_TASK_DATA_REQUEST,
      GET_TASK_DATA_SUCCESS,
      GET_TASK_DATA_FAILURE,
    ],
    api: getTaskDataApi,
    schema:NEWBIETASK
  })
}
