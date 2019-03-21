import {Map} from 'immutable'

export default (state = Map(), action) => {
  if (action.meta && action.meta.schema && action.payload && action.payload.entities) {
    const entities = action.payload.entities
    Object.keys(action.payload.entities).forEach(key => {
      state = state.update(key, Map(), (entity) => {
        const newEntity = entities[key]

        Object.keys(newEntity).forEach(id => {
          entity = entity.update(id, {}, (data) => {
            return {
              ...data,
              ...newEntity[id]
            }
          })
        })
        return entity
      })
    })
  }
  return state
}
