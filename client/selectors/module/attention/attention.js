import {createSelector} from 'reselect'
import {attentionAccountEntitySelector, attentionMemberEntitySelector} from '../entities'

// 获取成员被账户关注的集合
export const attentionsSelector = createSelector(
  attentionAccountEntitySelector,
  (state) => state.attention.attentionAccount,
  (attentionEntity, attention) => attention ? attention.map(id => attentionEntity[id]) : []
)

// 获取账号关注成员的集合
export const attentionsMemberSelector = createSelector(
  attentionMemberEntitySelector,
  (state) => state.attention.attentionMembers,
  (memberEntity, member) => {
    return member ? member.map(id => memberEntity[id]) : []
  }
)

// 获取账号某个关注成员
export const attentionMemberSelector = createSelector(
  attentionMemberEntitySelector,
  (state, props) => props.params ? props.params.id : props,
  (memberEntity, memberId) => memberEntity && memberEntity[memberId]
)

// 获取某成员被关注的数量
// export const bysubscribeCountSelector = (state) =>  state.attention.bysubscribeCount
export const bysubscribeCountSelector = createSelector(
  (state, props) => {
    let memberId = props.params ? props.params.id : props
    return state.attention.bysubscribeCount[memberId]
  },
  (memberId) => []
)
