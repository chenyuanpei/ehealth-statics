import {createAction} from 'redux-actions'
import {saveEntities} from '../../entities'
import Schemas from '../../../schemas'
import {attentionMemberSelector} from '../../../selectors/attention/attention'
import {SAVE} from '../../../const/loading'

export const UPDATESUBSCRIBERREMARK = 'UPDATESUBSCRIBERREMARK'
export const UPDATESUBSCRIBERREMARK_REQUEST = 'UPDATESUBSCRIBERREMARK_REQUEST'
export const UPDATESUBSCRIBERREMARK_SUCCESS = 'UPDATESUBSCRIBERREMARK_SUCCESS'

const updateSubscriberRemarkRequest = createAction(
  UPDATESUBSCRIBERREMARK_REQUEST,
  (memberId, remark) => ({
    loading: SAVE,
    request: {
      url: 'account_api/update_subscriber_remark',
      data: {
        memberId,
        remark
      }
    }
  })
)

export function updateSubscriberRemark(memberId, remark) {
  return (dispatch, getState) => dispatch(updateSubscriberRemarkRequest(memberId, remark)).then(
    (action) => {
      const attentionMember = attentionMemberSelector(getState(), memberId)
      return dispatch(saveEntities({
        schema: Schemas.ATTENTION_MEMBER,
        entity: {
          id: attentionMember.id,
          remark: remark
        }
      }))
    })
}
