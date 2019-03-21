import createLogger from 'redux-logger'
import {Iterable} from 'immutable'

const level = 'info'

const stateTransformer = (state) => Iterable.isIterable(state) ? state.toJS() : state // Transform Immutable (without combineReducers)

const actionTransformer = action => {
  if (action.type === 'BATCHING_REDUCER.BATCH') {
    action.payload.type = action.payload.map(next => String(next.type)).join(' => ')
    return action.payload
  }

  return ({ // Transform Symbol() action type to string
    ...action,
    type: String(action.type),
  })
}

const logger = {}

for (const method in console) {
  if (typeof console[method] === 'function') {
    logger[method] = console[method].bind(console)
  }
}

logger[level] = function levelFn(...args) {
  const lastArg = args.pop()

  if (Array.isArray(lastArg)) {
    return lastArg.forEach(item => {
      /* eslint-disable */
      console[level].apply(console, [...args, item])
      /* eslint-enable */
    })
  }

  console[level].apply(console, arguments)
}

export default createLogger({
  level,
  duration: true,
  logger,
  stateTransformer,
  actionTransformer,
  diff: true,
  diffPredicate: (...args) => {
    console.log('查看当前', args)
  }
})
