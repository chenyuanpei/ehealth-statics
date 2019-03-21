import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import moment from 'moment'
import classnames from 'classnames'
// util
import {weekFirstAndEnd} from '../../../../util/date'
// components
import Avatar from '../../../common/Avatar/Avatar'

export default class extends Component {

  static propTypes = {
    member: PropTypes.object,
    report: PropTypes.object,
  }

  static defaultProps = {
    member: {},
    report: {},
  }

  constructor(props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    const {
      member: {headImgurl, remark, nickname, name},
      report: {begin,end,normalTimes,totalTimes}
    } = this.props
    let rateLevel = normalTimes/totalTimes
    let rateLevelText = ''
    let rateDescribe = ''
    if(rateLevel >= 0.6 && rateLevel <=0.8){
      rateLevelText = '较好'
      rateDescribe = '您的情况最好是通过饮食进行调理，糖尿病是一种多病因的代谢疾病，特点是高血糖，伴随因胰岛素分泌或作用缺陷，引起的代谢紊乱。主要治疗方法是饮食控制，少吃油腻食物，少吃辛辣食物，少喝酒，少吃精米精面，多吃粗粮与豆类食物，有助于血糖的控制。'
    }else if(rateLevel < 0.6){
      rateLevelText = '不理想'
      rateDescribe='糖尿病是慢性疾病，诊断明确后就需要及时有效的降糖治疗，根据您的血糖情况提示血糖控制不佳，请及时联系医生，调整降糖方案。'
    }else{
      rateLevelText = '理想'
      rateDescribe='建议您继续保持生活规律，吃饭要细嚼慢咽，多吃蔬菜，尽可能不在短时间内吃含葡萄糖、蔗糖量大的食品，多加锻炼身体，少熬夜。这样才能保持血糖的稳定。'
    }

    const [weekFirst = '', weekEnd = ''] = [moment(begin).format('MM.DD'),moment(end).format('MM.DD')]




    return (
      <div className={classnames('block', 'topBox','bsTopBox')}>
        <div className="headimgBox">
          <Avatar src={headImgurl}></Avatar>
        </div>
        <div className="topBg no-bg">
          <div className="nameText">{remark || nickname || name}</div>
          <div className="timeText">{weekFirst}-{weekEnd}</div>
        </div>
          <div className="bslineTitle">{'本周血糖控制评价'}</div>
          <div className="frequencyStatus">{rateLevelText}</div>
          <div className="contentText">{rateDescribe}</div>

      </div>
    )
  }
}
