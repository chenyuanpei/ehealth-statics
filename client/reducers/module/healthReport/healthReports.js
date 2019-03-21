import {handleActions} from 'redux-actions'

import {getData} from '../../selectors/action'

import {
  GET_REPORT_MEMBER_LIST_SUCCESS
} from '../../actions/api/healthReport/getReportMemberList'

export default handleActions({
  [GET_REPORT_MEMBER_LIST_SUCCESS]: (state, action) => ({
    ...state,
    items: getData(action)
  }),
}, {
  items: []
})
