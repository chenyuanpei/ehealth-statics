import {normalize} from 'normalizr'

export default store => next => action => {
  const schema = action.meta && action.meta.schema

  if (schema && action.payload && !action.error) {
    const normalized = normalize(action.payload, schema)
    action = {...action, payload: normalized}
  }

  return next(action)
}
