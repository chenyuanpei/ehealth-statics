import {generateRequest} from '../request'
import {healthServer} from '../constant'

const request = generateRequest(`${healthServer}/wx/`)

// request = {
//   "code": "18476040087"
// }
//
export const loginApi = request('login', {
  // mock: {
  //   data: (req) => ({
  //     "code": 200,
  //     "msg": "成功",
  //     "data": {
  //       "userId": 100,
  //       "accessToken": "dddd",
  //       "expireAt": 1111
  //     }
  //   })
  // }
})

// request = {
//   "url": "string"
// }
//
export const jsapiSignatureApi = request('jsapi_signature', {})

