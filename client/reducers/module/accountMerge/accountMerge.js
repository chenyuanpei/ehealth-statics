import {handleActions} from 'redux-actions'

import {getResult, getMsg} from '../../selectors/action'

import {GET_ACCOUNT_SUCCESS} from '../../actions/api/account/getAccount'

export default handleActions({
  [GET_ACCOUNT_MERGE_SUCCESS]: (state, action) => getResult(action)
}, null)
