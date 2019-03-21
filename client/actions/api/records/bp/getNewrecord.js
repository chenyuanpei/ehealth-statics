import {createAction} from 'redux-actions'

// selectors
import {getData} from '../../../../selectors/action'

export const GET_NEW_RECORD = 'GET_NEW_RECORD'
export const GET_NEW_RECORD_REQUEST = 'GET_NEW_RECORD_REQUEST'
export const GET_NEW_RECORD_SUCCESS = 'GET_NEW_RECORD_SUCCESS'
export const GET_NEW_RECORD_FAILURE = 'GET_NEW_RECORD_FAILURE'

const getNewRecordRequest = createAction(
  GET_NEW_RECORD_REQUEST,
  ({memberId}) => ({
    request: {
      url: 'data_api/get_newrecord',
      data: {
        memberId,
      },
    }
  })
)

export const getNewRecord = (memberId) => {
  return (dispatch, getState) => {
    const state = getState()
    const memberNewRecord = state.records.bp.newRecord && state.records.bp.newRecord[memberId]
    if (memberNewRecord !== undefined) {
      return Promise.resolve(memberNewRecord)
    }

    return dispatch(getNewRecordRequest({memberId})).then(action => {
      const data = getData(action)
      return Promise.resolve(data)
    })
  }
}
