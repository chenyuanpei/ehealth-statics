import {handleActions} from 'redux-actions'

import {getData, getRequestData} from '../../selectors/action'

import {GET_LEAST_REPORT_SUCCESS} from '../../actions/api/healthRecord/getLeastReport'

export default handleActions({
  [GET_LEAST_REPORT_SUCCESS]: (state, action) => {
    const {memberId} = getRequestData(action)
    const result = getData(action)
    return {
      ...state,
      [memberId]: result || {}
    }
  },
}, {})

