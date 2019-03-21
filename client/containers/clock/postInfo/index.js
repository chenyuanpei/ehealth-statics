import React, {Component} from 'react'
import {connect} from 'react-redux'

// components
import Confirm from '../../../components/common/dialog/Confirm'
import Title from '../../../components/common/title/Title'
import {toast} from '../../../components/common/toast/PubSubToast'
import {closeWindow} from '../../../util/wxJs/wxApi'
import Rule from '../../../components/special/Rule'
import AreaChoice from '../../../components/special/AreaChoice'
// actions
import actions from './actions'
// selector
import selectors from './selectors'

export default connect(
  selectors,
  actions
)(class extends Component {
  state = {
    name:'',
    phone:'',
    region:'',
    address:'',
    provinceId:'',
    cityId:'',
    districtId:''

  }
  componentDidMount() {
    const {init,params:{memberId},location:{query:{address}}} = this.props
    // 如果query参数有create，那么代表创建新成员
    let member = null
    init({
      memberId,
      member,
      address
    })
  }
  handleChange(name,event){
    var newState={};
    newState[name]=event.target.value;
    this.setState(newState);
  }
  _checkPhone(num) {
    var telReg = !!num.match(/^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/);
    if(telReg){
      return false;
    }
    return true
  }
  submitHandler(){
    const {name,phone,address} = this.state
    const {postData,location:{query:{applyId}},showConfirm,areaData} = this.props

    if (!name) {
      toast('请填写收货人姓名')
      return
    }

    if (!phone) {
      toast('请填写联系电话')
      return
    }

    if(this._checkPhone(phone)){
      toast('电话号码有误，请重新填写')
      return
    }
    if(!areaData){
      toast('请选择省市区')
      return
    }
    if (!address) {
      toast('请填写详细地址')
      return
    }

    this.setState({
      name:name,
      phone:phone,
      region:areaData.province + ' ' + areaData.city + ' ' + areaData.districts,
      address:areaData.province + ' ' + areaData.city + ' ' + areaData.districts + '' + address
    })
    showConfirm(true)
    // postData({
    //   applyId:applyId,
    //   name:name,
    //   linkPhone:phone,
    //   address,
    // })
  }
  _closePage(){
    closeWindow()
  }
  _renderPostSuccess() {
    const {applyRecord} = this.props


    return (
      <div className="m-post-address-success-wrap" style={{display:applyRecord?'block':'none'}}>
        <div className="m-success-box">
          <img src={require('../../../../static/images/clock/img-address-success.png')} alt=""/>
          <p>您已成功提交收货信息，奖品将尽快送出，请留意查收！</p>
        </div>
      </div>
    )
  }

  // // 生成滚动选择
  // _renderCommon() {
  //   const {selectDialogOptions: {...selectDialogOptions}, member, showSelectDialog, changeMember,changeArea,getAreaSuccess} = this.props
  //   const options = {
  //     ...selectDialogOptions,
  //     onConfirm: (val) => {
  //       showSelectDialog({close: true})
  //         let provinceId = val[0].id
  //         let cityId = val[1].id
  //         let areaId = val[2].id
  //         this.setState({
  //           provinceId:provinceId,
  //           cityId:cityId,
  //           districtId:areaId
  //         })
  //         changeMember({
  //           ...member,
  //           province: provinceId,
  //           city:cityId,
  //           districtsId:areaId
  //         })
  //       getAreaSuccess({
  //         province:val[0].name,
  //         city:val[1].name,
  //         districts:val[2].name
  //       })
  //         changeArea({
  //           province:val[0].name,
  //           city:val[1].name,
  //           districts:val[2].name
  //         })
  //
  //
  //     },
  //     onCancel: () => {
  //       showSelectDialog({close: true})
  //     },
  //   }
  //   return (
  //     <AreaSelect {...options}/>
  //   )
  // }

  _renderCommon() {
    const {selectDialogOptions: {...selectDialogOptions}, member, showSelectDialog, changeMember,changeArea,getAreaSuccess} = this.props
    const options = {
      ...selectDialogOptions,
      onConfirm: (val) => {
        showSelectDialog({close: true})
          let provinceId = val[0].id
          let cityId = val[1].id
          let areaId =val[2] ?  val[2].id : ''
          this.setState({
            provinceId:provinceId,
            cityId:cityId,
            districtId:areaId
          })
          changeMember({
            ...member,
            province: provinceId,
            city:cityId,
            districtsId:areaId
          })
        getAreaSuccess({
          province:val[0].name,
          city:val[1].name,
          districts:val[2] ? val[2].name : ''
        })
          changeArea({
            province:val[0].name,
            city:val[1].name,
            districts:val[2] ? val[2].name :''
          })


      },
      onCancel: () => {
        showSelectDialog({close: true})
      },
    }
    return (
      <AreaChoice {...options}/>
    )
  }

  // 生成提交提示
  _renderConfirm() {
    const {isShowConfirm, showConfirm,postData} = this.props
    const opts = {
      buttons: [{
        label: '取消',
        onClick: () => {
          showConfirm(false)
        }
      }, {
        label: '确定',
        onClick: () => {
          showConfirm(false)
          postData({
            name:this.state.name,
            phone:this.state.phone,
            region:this.state.region,
            address:this.state.address,
            provinceId:this.state.provinceId,
            cityId:this.state.cityId,
            districtId:this.state.districtId
          })
        }
      }],
      title: '确认信息'
    }
    return (
      <Confirm {...opts} show={isShowConfirm}>
        <div className="confirm">
          <p>提交后不能修改，请确认信息无误。</p>
          <ul>
            <li className="item">
              <div className="m-label">
                收货人姓名：
              </div>
              <div className="m-right">
                {this.state.name}
              </div>
            </li>
            <li className="item">
              <div className="m-label">
                联系电话：
              </div>
              <div className="m-right">
                {this.state.phone}
              </div>
            </li>
            <li className="item">
              <div className="m-label">
                配送地址：
              </div>
              <div className="m-right">
                {this.state.address}
              </div>
            </li>
          </ul>
          <div className="hackbox"></div>
        </div>
      </Confirm>
    )
  }
  render() {
    const {areaData,showSelectDialog} = this.props
    require('../../../styles/clock/clock.less')
    return (
      <div className="page_wrap">
        <div className='m-public-device-post-wrap'>
          <Title title='请填写收货地址' />
          <div className="m-prize-box">
            <div className="title">
              您将免费获得奖品
            </div>
            <div className="m-prize-content">
              <div className="m-prize-img">
                <img src={require('../../../../static/images/clock/icon_product_glucose_meter.png')} alt=""/>
              </div>
              <div className="m-prize-text">
                <h3>乐心智能血糖仪G1</h3>
                <p>
                  已附赠试纸
                </p>
              </div>
              <div className="m-prize-num">
                一台
              </div>
            </div>
          </div>
          <div className="m-post-title">
            请填写收货信息
          </div>
          <div className="m-form-wrap">
            <form>
              <ul>
                <li>
                  <label htmlFor="name">收货人姓名</label>
                  <input className="m-form-input" type="text" placeholder="请输入" maxLength="30" onChange={this.handleChange.bind(this,'name')} value ={this.state.name} id="name" name="name"/>
                </li>
                <li>
                  <label htmlFor="phone">联系电话</label>
                  <input className="m-form-input" type="text" placeholder="请输入" maxLength="30" onChange={this.handleChange.bind(this,'phone')} value ={this.state.phone} id="phone" name="phone"/>
                </li>
                {/*<li>*/}
                  {/*<label htmlFor="phone">所在地区</label> <div className="m-form-input" onClick={() => showSelectDialog({filed: 'address'})}>{areaData ? areaData.province + ' ' + areaData.city + ' ' + areaData.districts : '请选择'}</div>*/}
                {/*</li>*/}
                <li>
                  <label htmlFor="phone">所在地区</label> <div className="m-form-input" onClick={() => showSelectDialog({filed: 'address'})}>{areaData ? areaData.province + ' ' + areaData.city + ' ' + areaData.districts : '请选择'}</div>
                </li>
                <li className="m-textarea-li">
                  <textarea className="m-textarea" maxLength="100" onChange={this.handleChange.bind(this,'address')} value ={this.state.address} placeholder="请填写详细地址"></textarea>
                </li>

              </ul>

            </form>
          </div>
          <div onClick={()=>{this.submitHandler()}} className="m-bottom-btn">提交申请</div>

        </div>
        {this._renderCommon()}
        {this._renderPostSuccess()}
        {this._renderConfirm()}
      </div>
    )
  }



})
