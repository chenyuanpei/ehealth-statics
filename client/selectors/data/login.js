import {createSelector} from 'reselect'
import {dataSelector} from './index'

// login
export const loginSelector = createSelector(
  dataSelector,
  (data) => data.get('login')
)

// accessToken
export const accessTokenSelector = createSelector(
  loginSelector,
  (login) => login ? login.accessToken : null
)

// accessToken
export const userIdSelector = createSelector(
  loginSelector,
  (login) => login.userId
)
