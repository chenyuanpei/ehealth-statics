import React,{Component,PropTypes} from 'react'
import Card from '../../../components/member/card/Card'

export default class CardTest extends Component {

    render() {

        const members = [
            {id: '1', name: "亚马逊1", headimgurl: "http://www.qqpk.cn/Article/UploadFiles/201405/20140507130710523.jpg",},
            {id: '2', name: "亚马逊2", headimgurl: "http://www.qqpk.cn/Article/UploadFiles/201405/20140507130710523.jpg",},
            {id: '3', name: "亚马逊3", headimgurl: "http://www.qqpk.cn/Article/UploadFiles/201405/20140507130710523.jpg",},
        ]

        return (
            <Card members={members} onMemberChange={(member)=>alert(member.name)}>
            </Card>
        )
    }
}

export default {
    name: 'member/card/Card',
    component: (
        <CardTest></CardTest>
    )
}