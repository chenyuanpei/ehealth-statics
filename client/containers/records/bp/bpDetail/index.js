import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
// util
import {debug} from '../../../../util/common'
// components
import BpInfo from '../../../../components/home/records/bp/BpInfo'
import Title from '../../../../components/common/title/Title'
import Confirm from '../../../../components/common/dialog/Confirm'
import Button from '../../../../components/common/button/Button'
// actions
import actions from './actions'
// selector
import selectors from './selectors'
// pubsub
import {TOPIC_DELETE_BP_RECORD} from '../../../../components/record/bp/history/BpRecord'

export default connect(
  debug(selectors),
  actions
)(class extends Component {
  state = {
    setRemarkFlag:0,
    rcontent: '',
    rcontentnum: 0,
    remarkText:'',
    submitData:{}
  }
  componentDidMount() {
    let {params: {recordId}, loadData} = this.props
    this.setState({
      setRemarkFlag:0
    })
    loadData(recordId)

  }

  componentWillUnmount() {
    this.props.clear()
  }

  _textAreaChange (v) {
    var len = v.target.value.length
    const {bpRecordById} = this.props
    const {submitData} = this.state
    if (len > 50) { //如果输入的字数超过了限制
      v.target.value = v.target.value.substring(0, 50) //就去掉多余的字
      this.setState({ rcontentnum:50})
    }else{
      this.setState({ rcontentnum:len})
    }
    this.setState({
      remarkText:v.target.value,
      submitData:{
        ...bpRecordById,
        remark: v.target.value,
      }
    })
  }
  _saveBpSubmit() {
    const {updateBpRecord, memberId} = this.props
    const {submitData} = this.state
    updateBpRecord({memberId,submitData})

  }
  _delBpRecordById() {
    const {memberId, delBpRecord, push, params: {recordId}} = this.props
    delBpRecord({memberId, recordId: recordId})
    setTimeout(() => {
      push(`record/${memberId}/bp/history`)
    }, 500)
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
          this._delBpRecordById()
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
   _renderContent() {
     const {bpRecordById,member, showConfirm} = this.props
     const {rcontentnum, remarkText, setRemarkFlag} = this.state
     let showDel = member ? member['manager'] : false
     if(!setRemarkFlag){
       this.setState({
         setRemarkFlag:1,
         remarkText: bpRecordById.remark,
         rcontentnum: bpRecordById.remark ? bpRecordById.remark.length : 0,
         submitData: bpRecordById
       })
     }
     require('../../../../styles/home/records/bp/bpDetailPage.less')
     require('../../../../styles/record/record.less')
     require('../../../../styles/home/records.less')
       return (
         <div className="m-bp-detail-wrap">
           <Title title='血压数据' />
           <div className="m-bp-detail-time-wrap">
             <span className="m-bp-date">{moment(bpRecordById.measurementDate).format('YYYY-MM-DD')}</span>
             <span>{moment(bpRecordById.measurementDate).format('HH:mm')}</span>
             {showDel && <div className="m-bp-detail-btn" onClick={() => showConfirm(true)}>删除</div>}

           </div>
           <BpInfo {...bpRecordById}/>
           <div className="m-bp-tips">
             <div className="m-label-show">备注</div>
             <div className="m-textarea-bg">
               <textarea value={remarkText} onChange={(v) => this._textAreaChange(v)} ></textarea>
               <span className="m-bp-textarea-num">{rcontentnum}/50</span>
             </div>
           </div>
           {showDel && <div key="save" className="pageBottomIn">
             <Button onClick={() => this._saveBpSubmit()}>保存</Button>
           </div>}
           {this._renderDelTips()}
         </div>
       )
     }
  render() {
    const {bpRecordById} = this.props

    return (
        bpRecordById && this._renderContent()

    )
  }
})

