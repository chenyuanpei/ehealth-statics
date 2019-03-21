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
    glucoseConcentration: 6.0,
    mealPeroid:2,
    remarkText:'',
    showAdd: false,
    submitData:{},
    levelName:'',
    level:0,
    glucoText: ['空腹','餐前','餐后2小时','运动前','运动后','睡前','凌晨'],
    mealPeroidName:''
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
    const {bsRecordById} = this.props
    if (len > 50) { //如果输入的字数超过了限制
      v.target.value = v.target.value.substring(0, 50) //就去掉多余的字
      this.setState({ rcontentnum:50})
    }else{
      this.setState({ rcontentnum:len})
    }
    this.setState({
      remarkText:v.target.value,
      submitData:{
        id:bsRecordById.id,
        userId:bsRecordById.userId,
        mealPeroid: this.state.mealPeroid,
        memo: v.target.value,
      }
    })
  }
  _saveBsSubmit() {
    const {updateBsRecord, memberId} = this.props
    const {submitData} = this.state
    updateBsRecord({memberId,submitData})
  }
  _delBsRecordById() {
    const {memberId, goBack, delBsRecord, params: {recordId}} = this.props
    delBsRecord({memberId, recordId: recordId})
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
          this._delBsRecordById()
          showConfirm(false)
        }
      }],
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
    const {bsRecordById} = this.props
    this.setState({
      mealPeroid:val,
      submitData:{
        id:bsRecordById.id,
        userId:bsRecordById.userId,
        mealPeroid: val,
        memo: bsRecordById.memo,
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
     const { bsRecordById, member, showConfirm} = this.props
     const {showAdd,level, levelName,mealPeroidName, mealPeroid, glucoseConcentration, rcontentnum, remarkText, setRemarkFlag} = this.state
     let glucoText = ['空腹','早餐后','午餐前','午餐后','晚餐前','晚餐后','睡前']
     let showDel = member ? member['manager'] : false
     if(!setRemarkFlag){
       this.setState({
         setRemarkFlag:1,
         levelName: bsRecordById.levelName,
         level: bsRecordById.level,
         mealPeroid: bsRecordById.mealPeroid,
         glucoseConcentration: bsRecordById.glucoseConcentration,
         remarkText: bsRecordById.memo,
         mealPeroidName:bsRecordById.mealPeroidName,
         rcontentnum: bsRecordById.memo ? bsRecordById.memo.length : 0,
         submitData: bsRecordById
       })
     }
     require('../../../../styles/home/records/bs/bsDetailPage.less')
     require('../../../../styles/record/bsRecord.less')
       return (
         <div className="m-bs-detail-wrap">
           <Title title='血糖数据' />
           <div className="m-bp-detail-time-wrap">
             <span className="m-bp-date">{moment(bsRecordById.measurementDate).format('YYYY-MM-DD')}</span>
             <span>{moment(bsRecordById.measurementDate).format('HH:mm')}</span>
             {showDel && <div className="m-bp-detail-btn" onClick={() => showConfirm(true)}>删除</div>}

           </div>
           <div className="m-detail-data-wrap">
             <span className="bsText">{mealPeroidName}血糖值</span>
             <span className="bsNum"><b>{glucoseConcentration.toFixed(1)}</b> mmol/L</span>
             <span className={"bsRight record-"+level }>{levelName}</span>
           </div>
           {/*<div className="m-bp-add-tab">*/}
             {/*<div className="m-bs-btn-content">*/}
               {/*{this._renderMealBtn()}*/}
             {/*</div>*/}
           {/*</div>*/}
           <div className="m-bp-tips">
             <div className="m-label-show">备注</div>
             <div className="m-textarea-bg">
               {showDel ? <textarea placeholder="点击此处添加备注" value={remarkText} onChange={(v) => this._textAreaChange(v)}></textarea> :
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
    const {bsRecordById} = this.props

    return (
        bsRecordById && this._renderContent()

    )
  }
})

