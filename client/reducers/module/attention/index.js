import {combineReducers} from 'redux'
import attentionAccount from './attentionAccount'
import attentionMembers from './attentionMembers'
import attentionMember from './attentionMember'
// import bysubscribeCount from './bysubscribeCount'

export default combineReducers({
  attentionMember,
  attentionAccount,
  attentionMembers,
  // bysubscribeCount,
})
