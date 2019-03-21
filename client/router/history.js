import useRouterHistory from 'react-router/lib/useRouterHistory'
import {createHashHistory} from 'history'

export default useRouterHistory(createHashHistory)({
  basename: '/',
  queryKey: false,
})
