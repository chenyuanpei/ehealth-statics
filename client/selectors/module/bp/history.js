// selector
import {memberSelector} from '../../../selectors/member/member'

export default (state, props) => {
  const memberId = props.params.id
  let {
    records: {bp: {history}},
  } = state
  const memberHistory = history[memberId] || {}
  const member = memberSelector(state, memberId)

  return {
    memberId,
    member,
    bpHistory: memberHistory.values || [],
  }
}
