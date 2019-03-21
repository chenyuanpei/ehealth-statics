import {createAction} from 'redux-actions'

// 加载数据
export const ORGANIZATION_LOAD_DATA = Symbol('ORGANIZATION_LOAD_DATA')
export const loadData = createAction(ORGANIZATION_LOAD_DATA)

// 机构信息
export const ORGANIZATION_INFO_DATA = Symbol('ORGANIZATION_INFO_DATA')
export const getOrganizationInfo = createAction(ORGANIZATION_INFO_DATA)


export default {
  loadData,
  getOrganizationInfo
}

