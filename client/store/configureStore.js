import {applyMiddleware, compose, createStore} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'

import history from '../router/history'

import normalizrMiddleware from './middleware/normalizrMiddleware'

import reducer from '../reducers'
import mySaga from '../sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware({
  // logger: (...args) => {
  //   console.log('saga logger')
  //   console.log(args)
  // }
})

let middlewares = [
  /* timeMiddleware, */
  thunk,
  sagaMiddleware,
  routerMiddleware(history),
  normalizrMiddleware,
]

if (process.env.NODE_ENV !== 'production') {
  const loggerMiddleware = require('./middleware/loggerMiddleware').default
  // 开发模式
  middlewares = [
    ...middlewares,
    loggerMiddleware,
    // instrument()
  ]
}

const finalCreateStore = compose(
  applyMiddleware(...middlewares)
)(createStore)

export default function configureStore(initialState) {
  const store = finalCreateStore(reducer, initialState)

  sagaMiddleware.run(mySaga)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  console.log('configureStore',store)

  return store
}
