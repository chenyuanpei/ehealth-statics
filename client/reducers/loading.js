import {schemas} from '../schemas'
import {LOADING_CHANGE} from '../store/middleware/apiMiddleware'

const defLoading = {
  show: true,
  text: '数据加载中...'
}

export default function (state = {
  show: 0,
  loading: {
    show: false,
    text: '数据加载中'
  }
}, action) {
  switch (action.type) {
    case LOADING_CHANGE:
      const {payload:loading} = action
      const show = state.show + (loading.show ? 1 : -1)

      const newLoading = {
        show: !!show,
        text: loading.text
      }

      if (state.loading.show === newLoading.show && state.loading.text === newLoading.text) {
        return {
          ...state,
          show,
        }
      }

      return {
        ...state,
        show,
        loading: newLoading
      }
    default:
      return state
  }
}
