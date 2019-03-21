import {generateRequest} from '../request'
import {enterpriseConscribeService,shortUrlService} from '../constant'

const request = generateRequest(`${enterpriseConscribeService}/`)
const requestShortLink =generateRequest(`${shortUrlService}/`)
export const applyApi = request('apply', {})
export const applyRecordApi = request((data)=>'apply_record?userId='+data.userId, {method: 'get'})
export const countStandard = request('count_standard', {method: 'get'})
export const fillReceiverApi = request('fill_receiver', {})
export const long2shortApi = requestShortLink('long2short', {})
export const enterpriseConscribeApi = request((data)=>''+data.id, {method: 'get'})









