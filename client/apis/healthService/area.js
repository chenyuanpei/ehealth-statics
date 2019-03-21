import {generateRequest} from '../request'
import {basisService} from '../constant'

const request = generateRequest(`${basisService}/area/`)

export const getProvinces = request('getProvinces', {method: 'get'})
export const getCities = request((provinceId) => 'getCitys/'+provinceId, {method: 'get'})
export const getDistricts = request((cityId) => 'getDistricts/'+cityId, {method: 'get'})






