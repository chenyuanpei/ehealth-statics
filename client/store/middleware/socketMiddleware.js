import {isFSA} from 'flux-standard-action'
import {send} from '../../util/socket'

const API_SUFFIX = '_REQUEST'

export default ({dispatch, getState}) => {
  return next => action => {
    if (!isFSA(action)) {
      return next(action)
    }

    if (!action.payload || !action.payload.socketRequest || action.payload.error || action.payload.response) {
      return next(action)
    }

    let {type, payload: {socketRequest}} = action
    const hasReq = type.endsWith(API_SUFFIX)
    const apiName = hasReq ? type.substr(0, type.indexOf(API_SUFFIX)) : type

    const SUCCESS = apiName + '_SUCCESS'
    const FAILURE = apiName + '_FAILURE'

    socketRequest.seq = new Date().getTime()

    next({...action, type: hasReq ? type : type + API_SUFFIX})

    return send(socketRequest).then(response => {
      const nextAction = {
        ...action,
        payload: {...action.payload, response},
        type: SUCCESS
      }
      dispatch(nextAction)

      return nextAction
    }).catch((error) => {
      if (error instanceof Error) {
        console.error('socketMiddleware error', error)
      }
      const {payload, ...rest} = action // eslint-disable-line no-use-before-define
      const nextAction = {
        ...rest,
        payload: {...payload, response: error.response, error},
        error: true,
        type: FAILURE
      }
      dispatch(nextAction)

      return Promise.reject(nextAction)
    })
  }
}

const defaultLoadingOpts = {
  request: false,
  success: null,
  failure: null
}
function parseLoading(loadingOpts) {
  if (!loadingOpts) {
    return defaultLoadingOpts
  }

  if (typeof (loadingOpts) === 'string') {
    return {
      ...defaultLoadingOpts,
      request: loadingOpts
    }
  } else if (loadingOpts instanceof Object) {
    return {
      ...defaultLoadingOpts,
      ...loadingOpts
    }
  }

  throw new Error('action.payload.loading 不是String或Object')
}
