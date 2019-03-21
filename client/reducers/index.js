import {combineReducers} from 'redux-immutable'

export default combineReducers({
  data: require('./data').default,
  entities: require('./entities').default,
  page: require('./page').default,
  routing: require('./routing').default,
  im: require('./im').default,
})
