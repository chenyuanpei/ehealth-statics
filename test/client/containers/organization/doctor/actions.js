import test from 'ava'
import {actionTest} from 'redux-ava'
import {
  loadData,
  ORGANIZATION_DOCTOR_LOAD_DATA_REQUEST,
  loadDataSuccess,
  ORGANIZATION_DOCTOR_LOAD_DATA_SUCCESS
} from '../../../../../client/containers/organization/doctor/actions'

test('loadData',
  actionTest(loadData, '', {type:ORGANIZATION_DOCTOR_LOAD_DATA_REQUEST, payload: ''}))

test('loadDataSuccess',
  actionTest(loadDataSuccess, '', {type:ORGANIZATION_DOCTOR_LOAD_DATA_SUCCESS, payload: ''}))



