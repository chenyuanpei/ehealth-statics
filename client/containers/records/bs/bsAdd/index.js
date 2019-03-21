import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
// util
import {debug} from '../../../../util/common'
// components
import AddBsSelect from '../../../../components/record/bs/bsAdd/AddBsSelect'
import BpAddTab from '../../../../components/common/form/BpAddTab'
import CommonSelect from '../../../../components/member/data/CommonSelect'
import Button from '../../../../components/common/button/Button'
import Title from '../../../../components/common/title/Title'
import Alert from '../../../../components/common/dialog/Alert'
// actions
import actions from './actions'
// selector
import selectors from './selectors'

export default connect(
  debug(selectors),
  actions
)(class extends Component {
  state = {
    showAlert:false,
    alertText:'凌晨血糖测量时间在1:00~3:00，请重新输入',
    rcontent: '',
    rcontentnum: 0,
    showAdd: false,
    date: moment().format('YYYY-MM-DD'),
    datetime: moment().format('HH:mm'),
    glucoseConcentration: 6.0,
    mealPeroid:0,
    memo: '',
    mealPeroidIndex:0,
    mealPeroidArray:[0,12,13,14,15,6,11,16],
    glucoText: ['空腹','餐前','餐后2小时','运动前','运动后','睡前','凌晨','随机']
  }
  componentDidMount() {
    let {memberId, loadData} = this.props
    let {mealPeroid} = this.state

    loadData({memberId, pageLoad: true})

  }

  componentWillUnmount() {
  }

  _textAreaChange (v) {
    let len = v.target.value.length;

    if (len > 50) { //如果输入的字数超过了限制
      v.target.value = v.target.value.substring(0, 50) //就去掉多余的字
      this.setState({ rcontentnum:50})
    }else{
      this.setState({ rcontentnum:len})
    }
    this.setState({memo:v.target.value})
  }
  // 生成完成按钮
  _renderSave() {
    return (
      <div key="save" className="pageBottomIn">
        <Button onClick={() => this._saveBs()}>完成</Button>
      </div>
    )
  }
  _saveBs() {
     const {datetime, date, glucoseConcentration, mealPeroid, memo} = this.state
     const {addBsRecord,memberId} = this.props
    if(mealPeroid == 11){
      let hourNum = parseInt(datetime.split(':')[0])
      if(hourNum < 1 || hourNum >= 3){
        this.setState({showAlert:true})
        return
      }
    }
     let timeMoment = moment(`${date} ${datetime}`).valueOf()

     const bsRecord = {
       memberId: memberId,
       measurementDate: timeMoment,
       glucoseConcentration:glucoseConcentration,
       mealPeroid:mealPeroid,
       memo: memo
     }
      addBsRecord(bsRecord)

  }
  show() {
    this.setState({
      showAdd: true
    })
  }
  cancelAdd() {
    this.setState({showAdd: false})
  }
  // 生成菜单一
  _renderTabPart() {
    const {date, datetime} = this.state
    var opts = [{
      name: '日期',
      val: date,
      onClick: () => this._showSelect('date')
    }, {
      name: '时间',
      val: datetime,
      onClick: () => this._showSelect('datetime')
    }]

    return (
      <div key="part1" className="part_one m-mb22 bs_tab_tab">
        {opts.map((opt, idx) => <BpAddTab key={idx} {...opt}/>)}
      </div>
    )
  }
  // _addBsRecord(selectValue) {
  //   let timeVal = 0
  //   switch (selectValue[0]){
  //     case '空腹' :
  //       timeVal = 0
  //       break
  //     case '早餐后' :
  //       timeVal =1
  //       break
  //     case '午餐前' :
  //       timeVal = 2
  //       break
  //     case '午餐后' :
  //       timeVal =3
  //       break
  //     case '晚餐前' :
  //       timeVal = 4
  //       break
  //     case '晚餐后' :
  //       timeVal =5
  //       break
  //     case '睡前' :
  //       timeVal =6
  //       break
  //     default :
  //       timeVal= 0
  //       break
  //   }
  //   let mealPeroidVal = parseFloat(selectValue[1])
  //   this.setState({
  //     glucoseConcentration: mealPeroidVal ,
  //     mealPeroid:timeVal,
  //     showAdd: false
  //   })
  // }
  _addBsRecord(selectValue) {

    let mealPeroidVal = parseFloat(selectValue)
    this.setState({
      glucoseConcentration: mealPeroidVal ,
      showAdd: false
    })
  }
  // 生成选择框
  _renderCommon() {
    const {selectShow, filed, showSelect, changeBs} = this.props
    const {date, datetime} = this.state


    const options = {
      onConfirm: (val) => {
        let bpTimeValue = ''
        if(filed === 'date') {
          bpTimeValue = moment(val).format('YYYY-MM-DD')
        }else {
          bpTimeValue = moment(val).format('HH:mm')
          let _mealNum = parseInt(moment(val).format('H'))

        }
        this.setState({[filed]: bpTimeValue})
        showSelect({show: false, filed: null})
      },
      onCancel: () => showSelect({show: false, filed: null}),
      value: filed === 'date' ? date : datetime,
      type: filed
    }
    return (
      <CommonSelect key="select" show={selectShow} {...options}/>
    )
  }

  // 显示选择框
  _showSelect(filed) {
    this.props.showSelect({show: true, filed})
  }
  chooseMealPero(val) {
    const {mealPeroidArray} = this.state
    this.setState({
      mealPeroid:mealPeroidArray[val],
      mealPeroidIndex:val
    })
  }
  _renderMealBtn() {
    const {mealPeroid,mealPeroidIndex,glucoText} = this.state
    return glucoText.map((text, idx) => {
      return (
        <Button onClick={() => {this.chooseMealPero(idx)}} className={mealPeroidIndex !== idx ? 'm-meal-btn-normal' : 'm-meal-btn-select'}>{text}</Button>
      )
    })
  }
  _renderAlert(){
    const {showAlert,alertText} = this.state
    return (
      <Alert show={showAlert} text="知道了" onClick={() => {this.setState({showAlert:false})}}>
        <div className="alert">{alertText}</div>
      </Alert>
    )
  }
  render() {
    const {rcontentnum, showAdd, glucoseConcentration, mealPeroid} = this.state

    require('../../../../styles/home/records/bs/bsDetailPage.less')
    return (
      <div>
        <Title title='添加数据' />
        <div className="m-bs-detail-wrap">
          <div className="m-bp-add-tab">
            <div className="m-bp-tab-content m-bs-btn-content no-border">
              {this._renderMealBtn()}
            </div>
          </div>
          <div className="m-bp-add-tab m-mb22">
            <div className="m-bp-tab-name">血糖数据</div>
            <div className="recordBsInfo m-record-info-add" onClick={() => this.show()}>
              <div className="ui-row-flex currentValBox">
                <div className="ui-col ui-col m-bs-col">
                  <span>{glucoseConcentration.toFixed(1)}</span>
                  <span>mmol/L</span>
                </div>
                <div className="ui-col ui-col">
                </div>
              </div>
              <img src={require('../../../../../static/images/btn_new_p.png')}/>
            </div>
          </div>
          {this._renderTabPart()}
          {/*<AddBsDate ref="addbsdate" glucoseConcentration={glucoseConcentration} mealPeroid={mealPeroid} show={showAdd}*/}
                     {/*onCancel={() => this.cancelAdd()}*/}
                     {/*addConfirm={(val) => this._addBsRecord(val)}></AddBsDate>*/}
          <AddBsSelect ref="addbsdate" glucoseConcentration={glucoseConcentration} show={showAdd}
                     onCancel={() => this.cancelAdd()}
                     addConfirm={(val) => this._addBsRecord(val)}></AddBsSelect>

          <div className="m-bp-tips">
            <div className="m-label-show">备注</div>
            <div className="m-textarea-bg">
              <textarea placeholder="请填写备注" onChange={(v) => this._textAreaChange(v)} ></textarea>
              <span className="m-bp-textarea-num">{rcontentnum}/50</span>
            </div>
          </div>

          {this._renderCommon()}
        </div>
        {this._renderSave()}
        {this._renderAlert()}
      </div>
    )
  }
})

