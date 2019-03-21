import { handleActions } from 'redux-actions';

import {getResult,getMsg} from '../../selectors/action'

import {GET_LINKMAN_REQUEST,GET_LINKMAN_SUCCESS,GET_LINKMAN_FAILURE} from '../../actions/api/device/getLinkman'


export default handleActions({
    GET_LINKMAN_REQUEST: (state, action)=>({
        ...state,
        loading: true
    }),
    GET_LINKMAN_SUCCESS: (state, action)=>({
        ...state,
        loaded: true,
        invalid: false,
        loading: false,
        id: getResult(action)
    }),
    GET_LINKMAN_FAILURE: (state, action)=>({
        ...state,
        loaded: true,
        invalid: true,
        loading: false,
        error: getMsg(action)
    }),
}, {
    loading: false,
    invalid: false,
    loaded: false,
})
