import React, {Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
// util
import {debug} from '../../../../util/common'
// components
import Title from '../../../../components/common/title/Title'
import Confirm from '../../../../components/common/dialog/Confirm'
import Button from '../../../../components/common/button/Button'
import AddBsDetail from '../../../../components/record/bs/history/AddBsDetail'
// actions
import actions from './actions'
// selector
import selectors from './selectors'

export default connect(
  debug(selectors),
  actions
)(class extends Component {
  state = {
    setRemarkFlag:0,
    rcontent: '',
    rcontentnum: 0,
    degree: 36.5,
    remarkText:'',
    showAdd: false,
    submitData:{},
    levelName:'',
    level:0,
  }
  componentDidMount() {
    let {params: {recordId}, loadData} = this.props
    loadData(recordId)

  }

  componentWillUnmount() {
    this.props.clear()
    this.state = null
  }

  _textAreaChange (v) {
    var len = v.target.value.length
    const {tpRecordById} = this.props
    if (len > 50) { //如果输入的字数超过了限制
      v.target.value = v.target.value.substring(0, 50) //就去掉多余的字
      this.setState({ rcontentnum:50})
    }else{
      this.setState({ rcontentnum:len})
    }
    this.setState({
      remarkText:v.target.value,
      submitData:{
        id:tpRecordById.id,
        userId:tpRecordById.userId,
        mealPeroid: this.state.mealPeroid,
        remark: v.target.value,
      }
    })
  }
  _saveBsSubmit() {
    const {updateTpRecord, memberId} = this.props
    const {submitData} = this.state
    updateTpRecord({memberId,submitData})
  }
  _delTpRecordById() {
    const {memberId, goBack, delTpRecord, params: {recordId}} = this.props
    delTpRecord({memberId, recordId: recordId})
  }
  // 生成删除提示
  _renderDelTips() {
    const {isShowConfirm, showConfirm} = this.props
    const opts = {
      buttons: [{
        label: '取消',
        onClick: () => {
          showConfirm(false)
        }
      }, {
        label: '确定',
        onClick: () => {
          this._delTpRecordById()
          showConfirm(false)
        }
      }],
      title: '解绑提示'
    }
    return (
      <Confirm {...opts} show={isShowConfirm}>
        <div className="confirm">确认删除当前数据？</div>
      </Confirm>
    )
  }
  show() {
    this.setState({
      showAdd: true
    })
  }

  chooseMealPero(val) {
    const {tpRecordById} = this.props
    this.setState({
      submitData:{
        id:tpRecordById.id,
        userId:tpRecordById.userId,
        remark: tpRecordById.remark,
      }
    })
  }
  _renderMealBtn() {
    let glucoText = ['空腹','早餐后','午餐前','午餐后','晚餐前','晚餐后','睡前']
    const {mealPeroid} = this.state
    return glucoText.map((text, idx) => {
      return (
        <Button onClick={() => {this.chooseMealPero(idx)}} className={mealPeroid !== idx ? 'm-meal-btn-normal' : 'm-meal-btn-select'}>{text}</Button>
      )
    })
  }
   _renderContent() {
     const { tpRecordById, member, showConfirm} = this.props
     const {level, levelName, degree, rcontentnum, remarkText, setRemarkFlag} = this.state
     let showDel = member ? member['manager'] : false
     if(!setRemarkFlag){
       this.setState({
         setRemarkFlag:1,
         levelName: tpRecordById.levelName,
         level: tpRecordById.level,
         degree: tpRecordById.degree,
         remarkText: tpRecordById.remark,
         rcontentnum: tpRecordById.remark ? tpRecordById.remark.length : 0,
         submitData: tpRecordById
       })
     }
     require('../../../../styles/home/records/temperature/tpDetailPage.less')
     require('../../../../styles/home/records/temperature/tpRecord.less')
       return (
         <div className="m-tp-detail-wrap">
           <Title title='体温数据' />
           <div className="m-bp-detail-time-wrap">
             <span className="m-bp-date">{moment(tpRecordById.measurementDate).format('YYYY-MM-DD')}</span>
             <span>{moment(tpRecordById.measurementDate).format('HH:mm')}</span>
             {showDel && <div className="m-bp-detail-btn" onClick={() => showConfirm(true)}>删除</div>}

           </div>
           <div className="recordTpDetail">
             <div className="recordIcon recordText">
               <span className={`record-${level}`}>{levelName}</span></div>
             <div className="ui-row-flex currentValBox">
               <div className="ui-col ui-col">
                 <span className="m-temperature-value">{degree.toFixed(1)}℃</span>
               </div>
             </div>
           </div>

           <div className="m-bp-tips">
             <div className="m-label-show">备注</div>
             <div className="m-textarea-bg">
               {showDel ? <textarea value={remarkText} onChange={(v) => this._textAreaChange(v)}></textarea> :
                 remarkText}
               {showDel && <span className="m-bp-textarea-num">{rcontentnum}/50</span>}
             </div>
           </div>
           {showDel && <div key="save" className="pageBottomIn">
             <Button onClick={() => this._saveBsSubmit()}>保存</Button>
           </div>}
           {this._renderDelTips()}
         </div>
       )
     }
  render() {
    const {tpRecordById} = this.props

    return (
      tpRecordById && this._renderContent()

    )
  }
})

