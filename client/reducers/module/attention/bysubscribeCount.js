// import { handleActions } from 'redux-actions';
//
// import {getData,getResult,getRequestData} from '../../selectors/action'
//
// import {GET_BYSUBSCRIBE_COUNT_SUCCESS} from '../../actions/api/attention/getBysubscribeCount'
// import {UNSUBSERIBE_BYSUBSCRIBERREQUEST_SUCCESS} from '../../actions/api/attention/unsubseribeBysubscriber'
//
//
// export default handleActions({
//     [UNSUBSERIBE_BYSUBSCRIBERREQUEST_SUCCESS]:(state,action)=>{
//        
//     },
//     [GET_BYSUBSCRIBE_COUNT_SUCCESS]: (state, action)=> {
//         const {memberId} = getRequestData(action)
//         const result = getData(action)
//         return  {
//             // ...state,
//             [memberId]: result?result:0
//         }
//     },
// }, {})
//
