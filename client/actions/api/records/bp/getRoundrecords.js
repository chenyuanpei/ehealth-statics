import {createAction} from 'redux-actions'
import {memberRecordSelectorCreator} from '../../../../selectors/records/bp/roundRecord'

export const GET_BP_ROUNDRECORD = 'GET_BP_ROUNDRECORD'
export const GET_BP_ROUNDRECORD_SUCCESS = 'GET_BP_ROUNDRECORD_SUCCESS'

const getRoundrecordsRequest = createAction(
  GET_BP_ROUNDRECORD,
  ({memberId, startDate, type}) => ({
    request: {
      url: 'data_api/get_roundrecords',
      data: {
        memberId,
        type,
        startDate, // type=1时，获取以startDate 倒退7天数据
      }
    }
  })
)

export const getRoundrecords = (data) => (dispatch, getState) => {
  const value = memberRecordSelectorCreator(data)(getState())

  if (value) {
    return Promise.resolve()
  }

  return dispatch(getRoundrecordsRequest(data))
}
