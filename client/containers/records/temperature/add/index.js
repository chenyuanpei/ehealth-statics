import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
// util
import {debug} from '../../../../util/common'
// components
import AddSelect from '../../../../components/record/temperature/add/AddSelect'
import BpAddTab from '../../../../components/common/form/BpAddTab'
import CommonSelect from '../../../../components/member/data/CommonSelect'
import Button from '../../../../components/common/button/Button'
import Title from '../../../../components/common/title/Title'
// actions
import actions from './actions'
// selector
import selectors from './selectors'

export default connect(
  debug(selectors),
  actions
)(class extends Component {
  state = {
    rcontent: '',
    rcontentnum: 0,
    showAdd: false,
    date: moment().format('YYYY-MM-DD'),
    datetime: moment().format('HH:mm'),
    degree: 36.5,
    remark: '',
  }
  componentDidMount() {
    let {memberId, loadData} = this.props
    let {mealPeroid} = this.state
    let mealPero = this._mealPeroSwitch()
    if(mealPeroid === -1){
      this.setState({
        mealPeroid:mealPero
      })
    }
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
    this.setState({remark:v.target.value})
  }
  // 生成完成按钮
  _renderSave() {
    return (
      <div key="save" className="pageBottomIn">
        <Button onClick={() => this._saveTemperature()}>完成</Button>
      </div>
    )
  }
  _saveTemperature() {
     const {datetime, date, degree, remark} = this.state
     const {addTemperatureRecord,memberId} = this.props

     let timeMoment = moment(`${date} ${datetime}`).valueOf()

     const temperatureRecord = {
       memberId: memberId,
       measurementDate: timeMoment,
       degree:degree,
       remark: remark
     }
    addTemperatureRecord(temperatureRecord)

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
      <div key="part1" className="part_one">
        {opts.map((opt, idx) => <BpAddTab key={idx} {...opt}/>)}
      </div>
    )
  }

  _addTemperatureRecord(selectValue) {

    let temperatureVal = parseFloat(selectValue)
    this.setState({
      degree: temperatureVal ,
      showAdd: false
    })
  }
  // 生成选择框
  _renderCommon() {
    const {selectShow, filed, showSelect, changeTemperature} = this.props
    const {date, datetime} = this.state


    const options = {
      onConfirm: (val) => {
        let bpTimeValue = ''
        if(filed === 'date') {
          bpTimeValue = moment(val).format('YYYY-MM-DD')
        }else {
          bpTimeValue = moment(val).format('HH:mm')

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


  render() {
    const {rcontentnum, showAdd, degree} = this.state
    require('../../../../styles/home/records/temperature/temperatureDetailPage.less')
    return (
      <div>
        <Title title='添加数据' />
        <div className="m-temperature-detail-wrap">
          {this._renderTabPart()}

          <div className="m-bp-add-tab">
            <div className="m-bp-tab-name">体温数据</div>
            <div className="recordInfo m-record-info-add" onClick={() => this.show()}>
              <div className="ui-row-flex currentValBox">
                <div className="ui-col ui-col m-bs-col">
                  <span>{degree.toFixed(1)}</span>
                  <span>℃</span>
                </div>
                <div className="ui-col ui-col">
                </div>
              </div>
              <img src={require('../../../../../static/images/btn_new_p.png')}/>
            </div>
          </div>
          <AddSelect ref="addbsdate" glucoseConcentration={degree} show={showAdd}
                     onCancel={() => this.cancelAdd()}
                     addConfirm={(val) => this._addTemperatureRecord(val)}></AddSelect>

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
      </div>
    )
  }
})

