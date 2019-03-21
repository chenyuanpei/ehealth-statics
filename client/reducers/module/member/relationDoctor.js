import { handleActions } from 'redux-actions';
import {getMsg} from '../../selectors/action'

import {RELATION_DOCTOR_REQUEST,RELATION_DOCTOR_SUCCESS,RELATION_DOCTOR_FAILURE} from '../../actions/api/member/relationDoctor'


export default handleActions({
    RELATION_DOCTOR_REQUEST: (state, action)=>({
        ...state,
        loading: true
    }),
    RELATION_DOCTOR_SUCCESS: (state, action)=>({
        ...state,
        loaded: true,
        invalid: false,
        loading: false,
        msg:getMsg(action)
    }),
    RELATION_DOCTOR_FAILURE: (state, action)=>({
        ...state,
        loaded: true,
        invalid: true,
        loading: false
    }),
}, {
    loading: false,
    invalid: false,
    loaded: false
})
