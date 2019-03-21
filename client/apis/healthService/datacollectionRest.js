import {generateRequest} from '../request'
import {datacollectionRest} from '../constant'
const request = generateRequest(`${datacollectionRest}/`)
export const reportApi = request('event/report', {})
