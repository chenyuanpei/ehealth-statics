import {createAction} from 'redux-actions'

export const SOCKET_OPEN = 'SOCKET_OPEN'
export const SOCKET_CLOSE = 'SOCKET_CLOSE'
export const SOCKET_ERROR = 'SOCKET_ERROR'
export const SOCKET_MESSAGE = 'SOCKET_MESSAGE'

export const open = createAction(SOCKET_OPEN)
export const close = createAction(SOCKET_CLOSE)
export const error = createAction(SOCKET_ERROR)
export const message = createAction(SOCKET_MESSAGE)
