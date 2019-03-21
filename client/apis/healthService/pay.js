import {generateRequest} from '../request'
import {healthServer} from '../constant'

const request = generateRequest(`${healthServer}/order/`)

export const getSampleGoodsInfo = request((data)=>'sample/sample_goods_info?goodsId='+data.goodsId, {method: 'get'})
export const getPurchaseSampleGoods = request((data)=>'sample/purchase_sample_goods?amount=1&buyerId='+data.buyerId+'&goodsId='+data.goodsId, {})
export const getSampleOrderStatus = request('sample/sample_order_status', {method: 'get'})






