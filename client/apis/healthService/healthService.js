import {generateRequest} from '../request'
import {healthServer} from '../constant'

const request = generateRequest(`${healthServer}/common/`)
const requestMarketing = generateRequest(`marketing_service/activePlatform/`)


// 获取热门活动
export const getHotActiveApi = request((key) => `hot_active`, {method:'get'})
export const addPvApi = requestMarketing(`addPv`, {})



