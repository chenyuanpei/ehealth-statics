import {createAction} from 'redux-actions'
import {SAVE, SAVE_SUCCESS} from '../../../../const/loading'
import {NONE_ACTION} from '../../../../const/action'

import {toast} from '../../../../util/toast'

export const ADD_BP_RECORD = 'ADD_BP_RECORD'
export const ADD_BP_RECORD_REQUEST = 'ADD_BP_RECORD_REQUEST'
export const ADD_BP_RECORD_SUCCESS = 'ADD_BP_RECORD_SUCCESS'
export const ADD_BP_RECORD_FAILURE = 'ADD_BP_RECORD_FAILURE'

const addBpRecordRequest = createAction(
  ADD_BP_RECORD_REQUEST,
  ({memberId, systolicPressure, diastolicPressure, heartRate, measurementDate}) => ({
    loading: {
      request: SAVE,
      success: SAVE_SUCCESS
    },
    request: {
      url: 'data_api/add_bp_record',
      data: {
        memberId,
        systolicPressure,
        diastolicPressure,
        heartRate,
        measurementDate,
      },
      // schema: Schemas.BP_RECORDS
    }
  })
)

export function addBpRecord(bpRecord) {
  return (dispatch) => dispatch(addBpRecordRequest(bpRecord)).then(() => {
    toast(SAVE_SUCCESS)

    return NONE_ACTION
  })
}
