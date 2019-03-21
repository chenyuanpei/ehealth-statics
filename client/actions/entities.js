import {createAction} from 'redux-actions'

export const MERGE = Symbol('entities/merge')
export const merge = createAction(
  MERGE,
  ({schema, data}) => data,
  ({schema, data}) => ({schema}),
)
