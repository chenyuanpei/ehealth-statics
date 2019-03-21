import { handleActions } from 'redux-actions';
import {getMsg} from '../../selectors/action'

import {CHECK_RELATION_REQUEST,CHECK_RELATION_SUCCESS,CHECK_RELATION_FAILURE} from '../../actions/api/member/checkRelation'

 
export default handleActions({
    CHECK_RELATION_REQUEST: (state, action)=>({
        ...state,
        loading: true
    }),
    CHECK_RELATION_SUCCESS: (state, action)=>({
        ...state,
        loaded: true,
        invalid: false,
        loading: false,
        msg:getMsg(action)
    }),
    CHECK_RELATION_FAILURE: (state, action)=>({
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
