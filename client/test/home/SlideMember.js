import React,{Component,PropTypes} from 'react'
import SlideMember from '../../components/home/SlideMember'

const style = {
    height: 125,
    width: '100%'
};

export default class SlideMemberTest extends Component {

    render() {

        const members = [
            {id: '1', name: "亚马逊", headimgurl: "http://www.qqpk.cn/Article/UploadFiles/201405/20140507130710523.jpg",},
            {id: '2', name: "亚马逊", headimgurl: "http://www.qqpk.cn/Article/UploadFiles/201405/20140507130710523.jpg",},
            {id: '3', name: "亚马逊", headimgurl: "http://www.qqpk.cn/Article/UploadFiles/201405/20140507130710523.jpg",},
        ]

        return (
            <div style={style}>
                <SlideMember members={members} onChange={(member)=>alert(member.id)}/>
            </div>
        )
    }
}

export default {
    name: 'member/card/SlideMember',
    component: (
        <SlideMemberTest></SlideMemberTest>
    )
}