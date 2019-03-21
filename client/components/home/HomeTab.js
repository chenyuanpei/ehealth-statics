import React, {Component, PropTypes} from 'react'
import {RowFlex, Col} from '../frozenui/grid'
import {compareValue} from '../../util/compare'
import moment from 'moment'
export default class HomeTab extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    tabTime:PropTypes.string
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !compareValue(this.props, nextProps)
  }
  switchData(tabClass){
    let tabShowData = ''
    switch(tabClass)
    {
      case 'm-tab-bp':
        const {dp,sp} = this.tabData || {}
        tabShowData = sp + '/' + dp + ' mmHg'
        break;
      case 'm-tab-bs':
        const {bloodsugar} = this.tabData || {}
        tabShowData = bloodsugar + ' mmol/L'
        break;
      case 'm-tab-weight':
        const {weight} = this.tabData || {}
        tabShowData = weight ? (weight + ' kg') : '暂无数据'
        break;
      case 'm-tab-tp':
        const {degree} = this.tabData || {}
        tabShowData = degree + ' ℃'
        break;
      case 'm-tab-heartRate':
        const {heartRate} = this.tabData || {}
        let heartRateShow = 65
        if(heartRate){
          heartRateShow = heartRate
        }
        tabShowData = heartRateShow + ' 次／分'
        break;
      case 'm-tab-step':
        const {step} = this.tabData || {}
        tabShowData = step + ' 步'
        break;
      case 'm-tab-sleep':
        const {sleep} = this.tabData || {}
        let hSleep = parseInt(sleep/60)
        let mSleep = parseInt(sleep%60)
        tabShowData = hSleep + ' 小时' + mSleep + ' 分钟'
        break;
      default:
        tabShowData = '暂无数据'
    }
    return tabShowData
  }
  _switchTimeText(measurementDate) {
    let delta = (moment() - measurementDate)
    if (delta < 60 * 2 * 1000) {
      return '刚刚'
    } else if (delta <= 60 * 60 * 1000) {
      return `${Math.floor(delta / 1000 / 60)}分钟前更新`
    } else if (delta <= 60 * 60 * 1000 * 24) {
      return `${Math.floor(delta / 1000 / 60 / 60)}小时前更新`
    } else if (delta <= 60 * 60 * 1000 * 24 * 30) {
      return `${Math.floor(delta / 1000 / 60 / 60 / 24)}天前更新`
    } else if (delta <= 60 * 60 * 1000 * 24 * 365) {
      return `${Math.floor(delta / 1000 / 60 / 60 / 24 / 30)}个月前更新`
    } else {
      return `${Math.floor(delta / 1000 / 60 / 60 / 24 / 365)}年前更新`
    }
  }
  render() {
    require('../../styles/home/HomeTab.less')
    const {tabClass, tabData, name, image, onClick} = this.props
    this.tabData = tabData
    let tabShowData = '暂无数据'
    let tabShowTime = tabData ? moment(tabData.measurementDate).format('MM/DD HH:mm') : ''
    if (['m-tab-step','m-tab-sleep','m-tab-heartRate','m-tab-weight'].indexOf(tabClass) !== -1) {
      tabShowTime = tabData ? this._switchTimeText(tabData.measurementDate) : ''
    }
    if(tabData){
      tabShowData = this.switchData(tabClass)
    }

    return (
      <RowFlex className={`m-tab-wrap ` + tabClass} onClick={onClick}>
        <div>
          <img className="m-home-tab-img" src={image}/>
        </div>
        <div className="m-home-tab-name">
          {name}
        </div>
        <div className="m-home-tab-data">
          <span>{tabShowData}</span>
        </div>
        <Col className="m-home-tab-right">
          {tabShowTime}
        </Col>
      </RowFlex>
    )
  }
}
