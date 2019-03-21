import { handleActions } from 'redux-actions';
import {getMsg} from '../../selectors/action'
import {BIND_DEVICE_REQUEST,BIND_DEVICE_SUCCESS,BIND_DEVICE_FAILURE} from '../../actions/api/device/bindRoleDevice'
import {UNBIND_DEVICE_REQUEST,UNBIND_DEVICE_SUCCESS,UNBIND_DEVICE_FAILURE} from '../../actions/api/device/unbindRoleDevice'

export default (state = {loading: false, invalid: false, loaded: false}, action)=> {
    let step = 0;
    switch (action.type) {
        case BIND_DEVICE_REQUEST:
            step = step || 1;
        case UNBIND_DEVICE_REQUEST:
            step = step || 2;
            return {
                ...state,
                loading: true,
                step
            };
        case BIND_DEVICE_SUCCESS:
            step = step || 1;
        case UNBIND_DEVICE_SUCCESS:
            step = step || 2;
            return {
                ...state,
                loading: false,
                loaded: true,
                step
            };
        case BIND_DEVICE_FAILURE:
            step = step || 1;
        case UNBIND_DEVICE_FAILURE:
            step = step || 2;
            return {
                ...state,
                loading: false,
                invalid: true,
                loaded: true,
                error: getMsg(action),
                step
            }
    }
    return {...state, step};
}
