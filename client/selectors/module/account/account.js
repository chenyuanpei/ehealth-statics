import {createSelector} from 'reselect'

import {accountMergeEntitySelector} from '../entities'

// accountId
export const myAccountMergeIdSelector = (state) => state.accountMerge

// 获取我的账号
export const accountMergeSelector = createSelector(
  accountMergeEntitySelector,
  myAccountMergeIdSelector,
  (accountMergeEntity, accountMerge) => accountMergeEntity && accountMergeEntity[accountMerge]
)
