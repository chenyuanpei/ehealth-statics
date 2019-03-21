import React,{Component,PropTypes} from 'react'

import MemberCenter from '../../../components/member/center'

const account = {
    id: '1332',
    name: '张三',
    headImage: 'http://h.hiphotos.baidu.com/zhidao/wh%3D600%2C800/sign=4c454859a78b87d65017a31937380400/a5c27d1ed21b0ef4e48c6236dbc451da81cb3e76.jpg',
    members: [{id: 'aa', name: '儿子'}, {id: 'bb', name: '女儿'}],
    devices: [{id: '111', sn2: '8512345', type: 'i5'}]
};
export default {
    name: 'MemberCenter',
    component: ( <MemberCenter {...account}></MemberCenter>)
}