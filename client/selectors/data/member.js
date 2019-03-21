import {Map} from 'immutable'
import {createSelector} from 'reselect'
import {entitiesSelector} from '../entities'
import {dataSelector} from './index'

export const memberEntitySelector = createSelector(
  entitiesSelector,
  entitiesData => entitiesData.get('member', Map())
)

// member
export const memberDataSelector = createSelector(
  dataSelector,
  (data) => data.get('member')
)

// const memberId = '11111'
// const member = createMemberSelector(() => memberId)(state)
export const createMemberSelector = (memberIdSelector) => createSelector(
  memberEntitySelector,
  memberIdSelector,
  (entities, memberId) => entities.get(memberId)
)

// accountMembers  当前帐号成员集合
export const accountMembersSelector = createSelector(
  createSelector(memberDataSelector, (data) => data.get('accountMembers')),
  memberEntitySelector,
  (data, entities) => {
    if (!data) {
      return data
    }
    return data.map(id => entities.get(id))
  }
)

// subscribeMembers 我关注的成员集合
export const subscribeMembersSelector = createSelector(
  createSelector(memberDataSelector, (data) => data.get('subscribeMembers')),
  memberEntitySelector,
  (data, entities) => {
    if (!data) {
      return data
    }
    return data.map(id => entities.get(id))
  }
)

// 获取当前帐户管理的成员数量
export const memberCountSelector = createSelector(
  memberDataSelector, (data) => data.get('memberCount')
)
