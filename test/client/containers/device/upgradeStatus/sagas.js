import test from 'ava'
import {take, put, call, race} from 'redux-saga/effects'
import * as actions from '../../../../../client/containers/center/center/actions'



test(t => {
  t.deepEqual([1, 2], [1, 2]);
});
