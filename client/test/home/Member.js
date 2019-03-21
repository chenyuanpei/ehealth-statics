import React,{Component,PropTypes} from 'react'
import Member from '../../components/home/Member'

const style = {
    height: 125
}

export default class MemberTest extends Component {

    render() {

        return (
            <div style={style}>
                <Member id="1" name="亚马逊" headimgurl="http://www.qqpk.cn/Article/UploadFiles/201405/20140507130710523.jpg"/>
            </div>
        )
    }
}

export default {
    name: 'member/card/Member',
    component: (
        <MemberTest></MemberTest>
    )
}