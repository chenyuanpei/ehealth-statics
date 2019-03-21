import {createAction} from 'redux-actions'

export const LOGIN_REQUEST = Symbol('LOGIN_REQUEST')
export const LOGIN_SUCCESS = Symbol('LOGIN_SUCCESS')
export const LOGIN_FAILURE = Symbol('LOGIN_FAILURE')

export const loginRequest = createAction(LOGIN_REQUEST)
export const loginSuccess = createAction(LOGIN_SUCCESS)
export const loginFailure = createAction(LOGIN_FAILURE)
