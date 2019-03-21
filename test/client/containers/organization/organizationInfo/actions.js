import test from 'ava'
import {actionTest} from 'redux-ava'
import {
  loadData,
  ORGANIZATION_LOAD_DATA
} from '../../../../../client/containers/organization/organizationInfo/actions'

test('loadData',
  actionTest(loadData, '', {type:ORGANIZATION_LOAD_DATA, payload: ''}))



