import {generateRequest} from '../request'
import {healthServer} from '../constant'

const request = generateRequest(`sessions_service/`)



export const changeUserCookieApi = request((data)=>'cookie?userType=99&loginId='+data.userId+'&timestamp='+data.timestamp+'&checksum='+data.checksum+'&key='+data.key, {method: 'get'})




