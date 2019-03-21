import {generateRequest} from '../request'
import {healthServer} from '../constant'

const request = generateRequest(`${healthServer}/smart_lib/`)
const requestAction = generateRequest(`${healthServer}/action/`)

export const getAllExperiment = request('all_experiment', {method: 'get'})
export const hasOpenExperiment = request((data)=>'has_open_experiment?userId='+data.userId+'&experiment='+data.code, {method: 'get'})
export const closeExperiment = request((data)=>'close_experiment?experiment='+data.experiment+'&userId='+data.userId, {})
export const openExperiment = request((data)=>'open_experiment?experiment='+data.experiment+'&userId='+data.userId, {})
export const getActionByIdApi = requestAction('get_action_id', {})






