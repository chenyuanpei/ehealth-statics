import {Map} from 'immutable'
import {createSelector} from 'reselect'
import {dataSelector} from './index'

// stat patient data
export const statPatientSelector = createSelector(
  dataSelector,
  (data) => data.get('statPatient')
)

// 最后一条数据 血压，血糖，体温，运动
export const createStatPatientSelector = (memberIdSelector) => createSelector(
  createSelector(statPatientSelector, (data) => data.get('statPatient')),
  memberIdSelector,
  (statPatient, memberId) => statPatient.get(memberId)
)

