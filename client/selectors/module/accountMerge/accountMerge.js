import {createSelector} from 'reselect'

import {accountEntitySelector} from '../entities'

// accountId
export const accountIdSelector = (state) => state.account.account

// 获取我的账号
export const accountSelector = createSelector(
  accountEntitySelector,
  accountIdSelector,
  (accountEntity, accountId) => accountEntity && accountEntity[accountId]
)
