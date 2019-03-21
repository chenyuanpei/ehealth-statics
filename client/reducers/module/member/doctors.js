import {handleActions} from 'redux-actions'

import {getResult, getRequestData} from '../../selectors/action'

import {GET_DOCTORS_BY_MEMBERID_SUCCESS} from '../../actions/api/doctor/getDoctorsByMemberId'

export default handleActions({
  [GET_DOCTORS_BY_MEMBERID_SUCCESS]: (state, action) => {
    const {memberId} = getRequestData(action)
    const doctorIds = getResult(action)
    return {
      ...state,
      [memberId]: doctorIds && doctorIds[0] || null // 设置null用于区分该memberId的doctor是否已经调用过接口

    }
  },
}, {})
