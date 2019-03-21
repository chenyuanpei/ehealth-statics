import {createAction} from 'redux-actions'

// 加载数据
export const DEVICE_STATUS_PAGE_LOAD_DATA = Symbol('DEVICE_STATUS_PAGE_LOAD_DATA')
export const loadData = createAction(DEVICE_STATUS_PAGE_LOAD_DATA)


export default {
  loadData
}

