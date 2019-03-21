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
        <div className="m-public-column"><p style={{fontWeight:'bold',paddingTop:'20px'}}>第二期挑战21天活动火热开展中！</p></div>
        <div className="m-public-column">
          <h3>★报名时间：</h3>
          <p>9月29日-12月31日</p>
        </div>

        <div className="m-public-column">
          <h3>★活动对象：</h3>
          <p>9月29日起，首次绑定乐心血压计、且血压计型号为i5WiFi、i5S WiFi、i8的新用户</p>
        </div>
        <div className="m-public-column">
          <h3>★参与方式：</h3>
          <ol>
            <li>点击“马上报名”按钮，即可进入打卡日历页面</li>
            <li>使用乐心血压计测量血压</li>
          </ol>
          <p>注：请确认微信号已绑定血压计且连接WiFi，且网络环境正常。打卡以日期被点亮为准！</p>
        </div>
        <div className="m-public-column">
          <h3>★关于大奖：</h3>
          <p>连续测量21天，即可免费获赠乐心血糖仪G1一部（附带10片试纸）。本期奖品数量有限，送完即止。</p>
        </div>
        <div className="m-public-column">
          <h3>★奖品派发：</h3>
          <ol>
            <li>测量打卡达标后，系统将推送获奖通知；</li>
            <li>获奖用户收到获奖通知后需提交获奖信息；</li>
            <li>7个工作日内没有提交获奖信息即视为放弃；</li>
          </ol>
        </div>
        <div className="m-public-column">
          <h3>★活动细则：</h3>
          <ol>
            <li>本次活动仅面向9月29日后首次扫码绑定血压计的用户；</li>
            <li>打卡以使用乐心血压计测量的数据核算，手动输出数据不计入；</li>
            <li>打卡期间出现中断打卡/隔了几天打卡，之前的成绩会被清零，所以务必注意当天数据是否有成功上传，日历日期是否有被点亮！ </li>
            <li>本次活动同一个用户只能获取一个奖励，同一个微信号，认定为同一个用户；如果您微信号绑定了血压计，则该血压计成功上传的任意一笔数据均视为有效打卡数据，包括本人测量，成员绑定按键测量，达标由您本人领奖，只能领取一次奖励。</li>
            <li>报名截止时间为2017年12月31日，测量打卡截止时间为2018年1月21日。</li>
          </ol>
        </div>
      </div>

    );
  }
}
