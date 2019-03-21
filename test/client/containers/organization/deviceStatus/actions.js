import test from 'ava'
import {actionTest} from 'redux-ava'
import {
  loadData,
  DEVICE_STATUS_PAGE_LOAD_DATA,
} from '../../../../../client/containers/organization/deviceStatus/actions'

test('loadData',
  actionTest(loadData, '', {type:DEVICE_STATUS_PAGE_LOAD_DATA, payload: ''}))



