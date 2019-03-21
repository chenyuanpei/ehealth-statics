//import React,{Component,PropTypes} from 'react'
//import PubSub from 'pubsub-js'
//
//export const TOPIC_ADD_MEMBER = 'TOPIC_ADD_MEMBER'
//
//export default class AddMember extends Component {
//
//    shouldComponentUpdate(nextProps, nextState) {
//        return false
//    }
//
//    handleAdd() {
//        PubSub.publish(TOPIC_ADD_MEMBER, null);
//    }
//
//    render() {
//
//        require('../../styles/home/addMember.less')
//
//        return (
//            <div className="addMemberBox">
//                <div className="addMemberCard">
//                    <div className="addMemberBtn" onClick={()=>this.handleAdd()}></div>
//                    <div className="addMemberBtnText">{'点击添加成员'}</div>
//                </div>
//                <div className="addMemberInfo">{'创建成员会展示成员的健康数据，以便更好地了解他们'}</div>
//            </div>
//        )
//
//    }
//
//}
//
//AddMember.propTypes = {}
//
//AddMember.defaultProps = {}
