import test from 'ava'
import {actionTest} from 'redux-ava'
import {
  loadData,
  UP_GRADE_PAGE_LOAD_DATA,
} from '../../../../../client/containers/device/upgradeStatus/actions'

test('loadData',
  actionTest(loadData, '', {type:UP_GRADE_PAGE_LOAD_DATA, payload: ''}))



