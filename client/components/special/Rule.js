import React, {Component, PropTypes} from 'react'
export default class Rule extends Component {
  constructor(props) {
    super(props);
    this.state = { show: this.props.show };
  }


  static propTypes = {
    text: PropTypes.string,
    additionalItems: PropTypes.node,
    nestedProps: PropTypes.object,
  };
  componentWillReceiveProps(nextProps) {
    const {show} = this.props
    const {show: nextShow} = nextProps

    if (show !== nextShow) {
      this.setState({
        show: nextShow
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {show} = this.state
    const {show: nextShow} = nextState
    if (show !== nextShow) {
      return true
    }
    return false
  }

  render() {
    const {show} = this.state
    const {onClick} = this.props
    return (
      <div className="m-public-device-info" style={{display:show?'block':'none'}}>
        <div onClick={onClick} className="m-public-dev-info-close">+</div>
        <div className="m-opacity-wrap"></div>
        <div className="m-public-column">
          <h3>活动时间</h3>
          <p>6月1日－6月30日</p>
        </div>
        <div className="m-public-column">
          <h3>参与规则</h3>
          <ol>
            <li>申请人代表企业提交申请，获取专属海报；</li>
            <li>申请人将活动海报转至员工（群）；</li>
            <li>获得员工支持人数>=50人，即可通过申请资格；</li>
            <li>提交收货地址，等待设备配置；</li>
            <li>广州站第一期名额为100家企业；</li>
            <li>测量次数少于30次/月，设备将被回收。</li>
          </ol>
        </div>
        <div className="m-public-column">
          <h3>注意事项</h3>
          <ol>
            <li>申请人必须为企业员工；</li>
            <li>填写信息需保证真实性，一旦被查伪，则取消活动资格；</li>
            <li>活动暂面向广州企业。</li>
          </ol>
        </div>
      </div>

    );
  }
}
