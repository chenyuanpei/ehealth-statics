import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'
import {subscribeMembersSelector} from '../../../selectors/data/member'
import {Map} from 'immutable'

const attentioningMemberPageSelector = createSelector(
  pageSelector,
  (page) => page.get('attentioningMember', Map())
)

// memberId
const memberIdSelector = (state, props) => props.params.id

// member
export const memberSelector = createSelector(
  attentioningMemberPageSelector,
  (member) => member.getIn(['attentionMember'])
)

export default createStructuredSelector(
  {
    memberId: memberIdSelector,
    member: memberSelector,
    subMembers: subscribeMembersSelector
  }
)
