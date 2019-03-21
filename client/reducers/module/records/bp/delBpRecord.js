import { handleActions } from 'redux-actions';

import {getMsg} from '../../../selectors/action'

import {DEL_BP_RECORD_REQUEST,DEL_BP_RECORD_SUCCESS,DEL_BP_RECORD_FAILURE} from '../../../actions/api/records/bp/delBpRecord'


export default handleActions({
    DEL_BP_RECORD_REQUEST: (state, action)=>({
        ...state,
        loading: true
    }),
    DEL_BP_RECORD_SUCCESS: (state, action)=>({
        ...state,
        loaded: true,
        invalid: false,
        loading: false,
        item: getMsg(action)
    }),
    DEL_BP_RECORD_FAILURE: (state, action)=>({
        ...state,
        loaded: true,
        invalid: true,
        loading: false,
        item: getMsg(action)
    }),
}, {
    loading: false,
    invalid: false,
    loaded: false,
})
