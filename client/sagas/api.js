import {createAction} from 'redux-actions'
import {put, call} from 'redux-saga/effects'

export const createApiActions = ({
  types, schema, request
}) => {
  const [requestType, successType, failureType] = types
  return [
    createAction(requestType),
    createAction(successType, null, () => ({request, schema})),
    createAction(failureType, null, () => ({request}))
  ]
}

export function * callApi({
  types, api, data, options, schema, formatResponse
}) {
  const [requestAction, successAction, failureAction] = createApiActions({request: data, types, schema})
  try {
    yield put(requestAction(data))
    const res = yield call(api, data, options)
    yield put(successAction(formatResponse ? formatResponse(res, data) : res))
    return res
  } catch (error) {
    yield put(failureAction(error))
    throw error
  }
}
