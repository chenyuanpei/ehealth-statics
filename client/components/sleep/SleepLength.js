import React, {Component, PropTypes} from 'react'
import Mask from 'react-weui/lib/components/mask'
import {generateUrl} from '../../apis/request'
import {healthServer} from '../../apis/constant'
import {getUpdateDateDesc,checkFloat} from '../../util/common'
import {caloriesConversion,distanceConversion,round} from '../../util/sport/sport'

export default class SleepLength extends Component {

  static defaultProps = {
    showData:{
      wrapperClz:'',
      onlyMinutes:true,
      numStyle:'',
      unitStyle:'',
      hours:0,
      minutes:0,
      big:false,
      isInline:true
    }
  }

  render() {
    const {showData} = this.props

    return (
      <p style={{display:showData.isInline?'inline-block':'block'}} className={showData.wrapperClz}>
        <span style={{display:showData.onlyMinutes!==true?'inline':'none'}}>
          <span style={{fontSize:showData.big?'1.36rem':'0.56rem',marginRight:showData.big?'0.125rem':'0'}}>{showData.hours}</span>
          <span style={{fontSize:showData.big?'0.4rem':'0.4rem',marginRight:showData.big?'0.125rem':'0',color:showData.big?'#a5a5a5':''}}>小时</span>
        </span>
        <span style={{fontSize:showData.big?'1.36rem':'0.56rem',marginRight:showData.big?'0.125rem':'0'}}>{showData.minutes}</span>
        <span style={{fontSize:showData.big?'0.4rem':'0.4rem',marginRight:showData.big?'0.125rem':'0',color:showData.big?'#a5a5a5':''}}>分钟</span>
      </p>
    )
  }


}
