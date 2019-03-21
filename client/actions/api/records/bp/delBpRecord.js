import {createAction} from 'redux-actions'
import {DELETE, DELETE_SUCCESS} from '../../../../const/loading'

import {deleteEntities} from '../../../entities'

export const DEL_BP_RECORD = 'DEL_BP_RECORD'
export const DEL_BP_RECORD_REQUEST = 'DEL_BP_RECORD_REQUEST'
export const DEL_BP_RECORD_SUCCESS = 'DEL_BP_RECORD_SUCCESS'
export const DEL_BP_RECORD_FAILURE = 'DEL_BP_RECORD_FAILURE'

const delBpRecordRequest = createAction(
  DEL_BP_RECORD_REQUEST,
  ({recordId, memberId, measuringDate}) => ({
    loading: {
      request: DELETE,
      success: DELETE_SUCCESS
    },
    memberId,
    measuringDate,
    request: {
      url: 'data_api/delete_bp_record',
      data: {
        id: recordId
      }
    },
  })
)

export function delBpRecord(data) {
  return (dispatch) => dispatch(delBpRecordRequest(data)).then(action => {
    return dispatch(deleteEntities({id: data.recordId}))
  })
}
