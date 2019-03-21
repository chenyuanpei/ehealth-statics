import {handleActions} from 'redux-actions'

// actions
import {IS_CHATTING} from '../../actions/page/doctor/chat'

// 当前成员index
const handleItem = (state, action, {memberId, doctorId}) => {
  const key = `${doctorId}${memberId}`

  return {
    ...state,
    [key]: handleActions({
      IS_CHATTING: (state, action) => {
        const {payload: {chatting}} = action

        return chatting
      },
    }, false)(state[key], action)
  }
}

export default handleActions({
  [IS_CHATTING]: (state, action) => {
    const {payload: {doctorId, memberId}} = action
    return handleItem(state, action, {doctorId, memberId})
  }
}, {})
