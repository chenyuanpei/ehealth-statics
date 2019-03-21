import test from 'ava'
import {actionTest} from 'redux-ava'
import {
  init,
  getChengyisheng,
  GET_CHENGYISHENG,
  PAGE_CENTER_INIT_REQUEST,
} from '../../../../../client/containers/center/center/actions'

test('init',
  actionTest(init, '', {type:PAGE_CENTER_INIT_REQUEST, payload: ''}))


test('getChengyisheng',
  actionTest(getChengyisheng, 2, {type:GET_CHENGYISHENG, payload: 2}))

