import {createSelector} from 'reselect'
import {memberEntitySelector} from '../entities'
import {attentionsMemberSelector} from '../attention/attention'

// 获取我的成员列表
export const membersSelector = createSelector(
  memberEntitySelector,
  (state) => state.member.members,
  (memberEntity, members) => ({
    ...members,
    items: members.items.map(id => memberEntity[id]).filter(member => !!member)
  })
)

// 获取我的成员数量
export const memberCountSelector = createSelector(
  membersSelector,
  attentionsMemberSelector,
  (members, attentions) => members.items.length + attentions.length
)

// 获取指定id成员
export const memberSelector = createSelector(
  memberEntitySelector,
  (state, props) => props.params ? props.params.id : props,
  (memberEntity, memberId) => memberEntity && memberEntity[memberId]
)

/**
 *  通过memberIdSelector创建memberSelector
 *
 *  如：
 *  createMemberSelectorByMemberId(
 *    (state, props) => props.params.memberId
 *   )
 *
 * @param memberIdSelector
 */
export const createMemberSelectorByMemberId = (memberIdSelector) => createSelector(
  memberEntitySelector,
  memberIdSelector,
  (memberEntity, memberId) => memberEntity && memberEntity[memberId]
)

// url上的memberId参数
export const memberIdParamSelector = (state, props) => props.params.memberId

// 从url上的memberId参数获取的member
export const memberForMemberIdParamSelector = createMemberSelectorByMemberId(
  memberIdParamSelector
)

// 获取保存成员后的Id
export const saveMemberSelector = (state) => state.member.memberSave.id
