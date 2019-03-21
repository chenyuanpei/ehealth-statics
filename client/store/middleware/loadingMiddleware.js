import {isFSA} from 'flux-standard-action'

import {LOADING} from '../../const/loading'
import {loading, toast} from '../../util/loading'

export default ({dispatch, getState}) => next => action => {
  if (!isFSA(action)) {
    return next(action)
  }
  if (!action.payload || !action.payload.request) {
    return next(action)
  }

  next(action)

  let {payload: {response, loading: loadingOpts}, error} = action

  loadingOpts = parseLoading(loadingOpts)

  if (!response) {
    // 请求
    if (loadingOpts.request) {
      loading(true, loadingOpts.request)
    }
  } else {
    // 响应
    if (loadingOpts.request) {
      loading(false)
    }
    if (!error) {
      loadingOpts.success && toast(loadingOpts.success)
    } else {
      loadingOpts.failure && toast(loadingOpts.failure)
    }
  }
}

// 加载中默认值
const defaultLoadingOpts = {
  request: LOADING,
  success: null,
  failure: null
}

// 解析参数
function parseLoading(loadingOpts) {
  // 默认值
  if (loadingOpts === undefined) {
    return defaultLoadingOpts
  }

  if (typeof (loadingOpts) === 'string') {
    // 参数是string
    return {
      ...defaultLoadingOpts,
      request: loadingOpts
    }
  } else if (loadingOpts instanceof Object) {
    // 参数是Object
    return {
      ...defaultLoadingOpts,
      ...loadingOpts
    }
  } else if (loadingOpts === false) {
    // 为false时，不需要loading
    return {}
  }

  throw new Error('action.payload.loading 不是String或Object')
}
