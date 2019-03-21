import {createAction} from 'redux-actions'
import Schemas from '../../../schemas'
import {attentionsMemberSelector} from '../../../selectors/attention/attention'

export const GET_SUBSCRIBE_MEMBERS = 'GET_SUBSCRIBE_MEMBERS'
export const GET_SUBSCRIBE_MEMBERS_REQUEST = 'GET_SUBSCRIBE_MEMBERS_REQUEST'
export const GET_SUBSCRIBE_MEMBERS_SUCCESS = 'GET_SUBSCRIBE_MEMBERS_SUCCESS'

export const getSubscribeMembersRequest = createAction(
  GET_SUBSCRIBE_MEMBERS_REQUEST,
  () => ({
    request: {
      url: 'account_api/get_subscribe_members',
      schema: Schemas.ATTENTION_MEMBER_ARRAY,
      dataFormat: (data) => {
        // TODO: 查询关注列表的nickname后端处理为如果remark有的话用remark，否则用nickname
        return data.map(item => {
          item.remark = item.nickname
          delete item.nickname
          return item
        })
      }
    }
  })
)

export function getSubscribeMembers() {
  return (dispatch, getState) => {
    const attentioningsMember = attentionsMemberSelector(getState())
    if (!attentioningsMember || !attentioningsMember.length) {
      return dispatch(getSubscribeMembersRequest())
    } else {
      return Promise.resolve()
    }
  }
}
