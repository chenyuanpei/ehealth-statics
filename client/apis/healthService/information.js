import {generateRequest} from '../request'
import {healthServer} from '../constant'

const request = generateRequest(`${healthServer}/information/`)
const requestBanners = generateRequest(`${healthServer}/banner/`)

// 获取资讯栏目信息
export const getInformationIdApi = request((key) => `get_column_id_by_key/${key}`, {method: 'get'})

// 获取资讯二级栏目信息
export const getInformationMenuApi = request((id) => `get_columns_by_parent/${id}`, {method: 'get'})

// 根据栏目ID获取资讯内容
export const getInformationInfoApi = request((id) => `get_content_by_id/${id}`, {method: 'get'})

// 根据栏目ID获取文章列表
export const getInformationListApi = request((id) => 'get_contents_by_column_id', {})

// 根据栏目ID获取热门文章列表
export const getInformationHotApi = request((id) => 'get_hot_contents', {})

// 根据一级栏目id查询二级栏目以及5篇文章
export const getFaqListApi = request(({id, size}) => `get_contents_columns/${id}/${size}`, {method: 'get'})

// 设置资讯订阅信息
export const setInformationSubscribeApi = request('update_subscribe_columns', {})

// 设置资讯轮播图
export const getInformationBannersApi = requestBanners((data)=>'get_banners?position='+data.position, {method: 'get'})

