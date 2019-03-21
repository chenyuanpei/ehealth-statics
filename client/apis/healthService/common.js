import {generateRequest} from '../request'
import {healthServer} from '../constant'

const request = generateRequest(`${healthServer}/common/`)
const requestHeadImg = generateRequest(`/commons_rest/file/`)

// request = {
//   "serverId": "string"
// }
export const uploadImgApi = request('upload_img', {})
export const uploadImgV2Api = request('upload_img_v2', {})
export const uploadHeadImgApi = requestHeadImg('upload?catalog=headimg', {})

