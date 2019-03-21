import {createSelector} from 'reselect'
// selector
import {attentionMemberSelector} from '../../../selectors/attention/attention'

export default createSelector(
  (state, props) => {
    return props.params.id
  },
  attentionMemberSelector,
  (memberId, member) => ({
    memberId,
    member,
  })
)
