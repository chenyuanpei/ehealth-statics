import {handleActions} from 'redux-actions'

import {getResult, getData} from '../../selectors/action'

import {GET_MEMBERS_REQUEST, GET_MEMBERS_SUCCESS, GET_MEMBERS_FAILURE} from '../../actions/api/member/getMembers'
import {SAVE_MEMBER_SUCCESS} from '../../actions/api/member/saveMember'
import {ADD_BIND_DEVICE_SUCCESS} from '../../actions/api/device/addBindRoleDevice'

export default handleActions({
  [GET_MEMBERS_REQUEST]: (state, action) => ({
    ...state,
    loading: true
  }),
  [GET_MEMBERS_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: false,
    loading: false,
    items: getResult(action)
  }),
  [GET_MEMBERS_FAILURE]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: true,
    loading: false,
  }),
  [SAVE_MEMBER_SUCCESS]: (state, action) => {
    const id = getData(action)
    const items = state.items
    if (!items.some(x => x === id)) {
      items.push(id)
    }
    return ({
      ...state,
      items: items
    })
  },
  [ADD_BIND_DEVICE_SUCCESS]: (state, action) => {
    const {memberId} = getData(action)
    const items = state.items
    if (!items.some(x => x === memberId)) {
      items.push(memberId)
    }
    return ({
      ...state,
      items: items
    })
  }

}, {
  loading: false,
  invalid: false,
  loaded: false,
  items: []
})
