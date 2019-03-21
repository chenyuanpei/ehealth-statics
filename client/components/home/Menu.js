import React, {Component, PropTypes} from 'react'
import PubSub from 'pubsub-js'
import {TOPIC_PUSH_ADD_SOMETHING_CLICK,TOPIC_HOME_MEMBER_INVITATION_CLICK} from './records/topic'
import classnames from 'classnames'
export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  toggleMenu = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  closeMenu = () => {
    this.setState({ isOpen: false});
  };

  static propTypes = {
    text: PropTypes.string,
    additionalItems: PropTypes.node,
    nestedProps: PropTypes.object,
  };
  handleAddSomeThingClick(something) {
    PubSub.publish(TOPIC_PUSH_ADD_SOMETHING_CLICK, something)
  }
  handleInvitationClick() {
    PubSub.publish(TOPIC_HOME_MEMBER_INVITATION_CLICK)
  }
  render() {
    require('../../styles/record/dd_menu.less')
    const { isOpen } = this.state;
    const {manager,id,birthday,height} = this.props
    let flag = false
    if(birthday && height){
      flag = true
    }
    return (
      <div>
        <div className="opacityWrap" style={{display:isOpen?'block':'none'}} onClick={() => this.toggleMenu()}></div>
        <div className="m-home-bottom-menu" style={{display:manager?'flex':'none'}}>
          <div className="dd-menu dd-menu-center">
            <div className="dd-menu-tab" onBlur={() => this.closeMenu()} onClick={() => this.toggleMenu()}>
              <img src={require('../../../static/images/home/icon-home-adddata.png')} alt=""/>手动添加数据
            </div>
            <div className="dd-menu-items dd-items-upwards">
              <ul className={classnames('dd-items-center', { 'dd-items-show': isOpen })}>
                <li onClick={() => this.handleAddSomeThingClick({dataType:'bp',id:id})}>添加血压</li>
                <li onClick={() => this.handleAddSomeThingClick({dataType:'bs',id:id})}>添加血糖</li>
                <li onClick={() => this.handleAddSomeThingClick({dataType:'tp',id:id})}>添加体温</li>
                <li onClick={() => this.handleAddSomeThingClick({dataType:'weight',id:id,flag:flag})}>添加体重</li>
              </ul>
            </div>
          </div>
          <div className="dd-menu" onClick={() => this.handleInvitationClick()}>邀请家人关注</div>
        </div>
      </div>

    );
  }
}
