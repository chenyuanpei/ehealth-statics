//import { createAction    } from 'redux-actions'
//
////selectors
//import {memberUnreadLastRecordsSelector} from '../../../selectors/chat/unreadLastRecord'
//
//export const GET_UNREAD_LAST_RECORD = 'GET_UNREAD_LAST_RECORD';
//export const GET_UNREAD_LAST_RECORD_REQUEST = 'GET_UNREAD_LAST_RECORD_REQUEST';
//export const GET_UNREAD_LAST_RECORD_SUCCESS = 'GET_UNREAD_LAST_RECORD_SUCCESS';
//export const GET_UNREAD_LAST_RECORD_FAILURE = 'GET_UNREAD_LAST_RECORD_FAILURE';
//
//const getUnreadLastRecordRequest = createAction(
//    GET_UNREAD_LAST_RECORD_REQUEST,
//    ({memberId})=> ({
//        request: {
//            url: 'chat/get_unread_last_record',
//            data: {
//                toUser: memberId,
//            }
//        }
//    })
//)
//
//export const getUnreadLastRecord = ({memberId})=> (dispatch, getState) => {
//
//    const {loaded} = memberUnreadLastRecordsSelector({memberId})(getState()) || {}
//    if (loaded) {
//        return Promise.resolve()
//    }
//
//    return dispatch(getUnreadLastRecordRequest({memberId}))
//}