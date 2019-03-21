import React, {Component} from 'react'
import {connect} from 'react-redux'
import {debug} from '../../../util/common'
// components
import Title from '../../../components/common/title/Title'
import Map from '../../../components/device/publicDevice/Map'
import PublicDeviceHead from '../../../components/device/publicDevice/PublicDeviceHead'
import PublicAdvise from '../../../components/device/publicDevice/PublicAdvise'
import PublicBanner from '../../../components/device/publicDevice/PublicBanner'
import PublicQrcode from '../../../components/device/publicDevice/PublicQrcode'
import PublicDataShow from '../../../components/device/publicDevice/PublicDataShow'
import VoiceBox from '../../../components/device/publicDevice/VoiceBox'
import Button from '../../../components/common/button/Button'
import BpInfo from '../../../components/home/records/bp/BpInfo'
import setTitle from '../../../util/setTitle'
// actions
import actions from './actions'
// selector
import selectors from './selectors'
export default connect(
  debug(selectors),
  actions
)(
  class extends Component {
    loadScript(src, cb) {
      const ref = document.getElementsByTagName("script")[0]
      const script = document.createElement("script")
      script.src = src
      ref.parentNode.insertBefore(script, ref)
      if (cb && typeof (cb) === "function") {
        script.onload = cb
      }
      return script
    }
    componentDidMount() {
      const {init, params: {id,memberId,deviceId,dataId}} = this.props
      init({id,memberId,deviceId,dataId})
    }
    _testClick(address){
      // 百度地图API功能
      var map = new BMap.Map("j-baidu-map");
      map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
      // 添加定位控件
      var geolocationControl = new BMap.GeolocationControl();
      geolocationControl.addEventListener("locationSuccess", function(e){
        // 定位成功事件
        var address = '';
        address += e.addressComponent.province;
        address += e.addressComponent.city;
        address += e.addressComponent.district;
        address += e.addressComponent.street;
        address += e.addressComponent.streetNumber;
      });
      geolocationControl.addEventListener("locationError",function(e){
        // 定位失败事件
        alert(e.message);
      });
      map.addControl(geolocationControl);
      // var local = new BMap.LocalSearch(map, {
      //   renderOptions:{map: map}
      // });
      // local.search(address);
      var myGeo = new BMap.Geocoder();
      // 将地址解析结果显示在地图上,并调整地图视野
      myGeo.getPoint(address, function(point){
        if (point) {
          map.centerAndZoom(point, 16);
          map.addOverlay(new BMap.Marker(point));
        }else{
          alert("您选择地址没有解析到结果!");
        }
      }, "广东");
    }
    _goUrl() {
      const {organizationInfo} = this.props
      const {brandLinkUrl} = organizationInfo || {}
      window.location.href = brandLinkUrl
    }

    _getMeasureData () { // 获取测量数据 和 建议
      const {device: {deviceType, name} = {}, bpRecordById, getBpSuggest} = this.props
      const {content} = getBpSuggest || {}

      return (
        <div>
          <div className="measureBox">
            <div className="top">
              <span className="tip">测量结果</span>
              <span className="type">{deviceType === '02' ? '数据':'测量'}来自<span className="cBlue">{`${name}（CFDA认证）`}</span></span>
            </div>
            <BpInfo {...bpRecordById}/>
          </div>
          {content && (<div className="suggest">
            <div className="text" dangerouslySetInnerHTML={{__html: content}}></div>
          </div>)}
        </div>
      )
    }

    _getHealthyAdviser () { // 健康 顾问
      const {getDoctorList, getBanner, params: {deviceId}} = this.props
      const {brandLinkUrl, brandImgUrl} = getBanner || {}

      return (
        <div>
          {(getDoctorList.length > 0 && <div className="healthyAdviser">
            <div className="title">
              <span className="tip">健康顾问</span>
              <span className="riText">（点击关注咨询）</span>
            </div>
            {
              getDoctorList.map((doc, j) => {
                return j < 5 && (
                  <div className="lis" key={j} onClick={() => this._go(`/doctor/${doc.id}/patientManage?param=0`)}>
                    <img className="imgBox" src={doc.headimgurl}/>
                    <span className="text">
                      <span>{doc.name}  {doc.title}</span>
                      <span>{doc.hospitalName}  {doc.departmentName}</span>
                    </span>
                    <span className="right"><img src={require('../../../../static/images/btn_new_p.png')}/></span>
                  </div>
                )
              }) || ''
            }
            <div style={{display: getDoctorList.length > 5 ? 'block' : 'none'}} className="more" onClick={() => this._go(`/organization/${deviceId}/doctor`)}>查看全部</div>
          </div>)}
          {(brandLinkUrl || brandImgUrl) && (<div className="banners">
            <a href={brandLinkUrl}><img src={brandImgUrl}/></a>
          </div>)}
        </div>
      )
    }

    _getHotNews () {
      const {getHotNewList} = this.props

      const go = ({id: columnContentInfoId, content, thirdUrl}) => {
        let text = content.match(/\<\!--content start--\>([^]*)<\!--content end--\>/)
        text = (text && text[1]) || ''
        const reg = /<[^>]*>[\s]*<\/[^>]*>|([\r\n]|<\/?.+?>)|(&nbsp;|\s*)/g
        text = text.replace(reg,'')

        if (!text) {
          if (!!thirdUrl) {
            window.location.href = thirdUrl
          } else {
            toast('此文章无内容可阅读！', {icon: 'warn'})
          }
        } else {
          this.props.push(`information/${columnContentInfoId}`)
        }
      }

      if (getHotNewList) {
        return (
            <div className="hotNewList">
              <div className="title">热门文章</div>
              {
                getHotNewList.map((h, i) => {
                  const regex = /,|，/
                  const ts = h.keyWord && h.keyWord.split(regex)
                  return i < 5 && (
                    <div className="listBox" onClick={() => go(h)} key={i}>
                      <img style={{display:h.icon?'inline-block':'none'}} src={h.icon}/>
                      <span>
                        <div className="title">{h.title}</div>
                        <div className="tipBox">
                          {
                            ts && ts.map((t, j) => <span key={j}>{t}</span>) || ''
                          }
                        </div>
                      </span>
                    </div>
                  )
                })
              }
              <div style={{display: getHotNewList.length > 5 ? 'block' : 'none'}}  className="more" onClick={() => this.props.push(`information`)}>更多文章</div>
            </div>
        )
      }
    }

    _go(url) {
      this.props.push(url)
    }

    render() {
      require('../../../styles/device/publicDevice.less')
      require('../../../styles/home/records.less')
      require('../../../styles/record/record.less')

      const {public_device_member_data,device,allRecords,weightSuggest} = this.props
      const {nickname,sex,age,height} = public_device_member_data || {}
      const {deviceType} = device || {}
      const {suggest} = weightSuggest || {}
      const {weightList} = allRecords || {}

      if (deviceType === '02') {
        setTitle(nickname + '刚完成一次免费体重测量')
      } else {
        setTitle(nickname + '刚完成一次免费血压测量')
      }

      return (
        <div className={'m-public-device-page'} style={{backgroundColor: deviceType === '08' ? 'transparent' : '#fff'}}>

          {deviceType === '08' && this._getMeasureData()}
          {deviceType === '08' && this._getHealthyAdviser()}
          {deviceType === '08' && this._getHotNews()}
          {/*{deviceType==='08' && <VoiceBox src={voiceData} id={"j-audio"} />}*/}

          {(deviceType !== '08' && this._getHead())}

          {deviceType ==='02' && <PublicAdvise suggest={suggest}></PublicAdvise>}
          {(deviceType === '02' && weightList) ? <PublicDataShow {...weightList[0]} sex={sex} age={age} height={height}></PublicDataShow> : ''}
          {/*{deviceType==='02' && <PublicQrcode qrcodeUrl={qrcodeUrl}></PublicQrcode>}*/}

          {(deviceType !== '08' && this._getShare())}
        </div>
      )
    }

    _getHead () {
      const {setShareShow,shareShow, organizationInfo, device, public_device_member_data} = this.props
      const {address,name,longitude,latitude} = organizationInfo || {}
      const {deviceType} = device || {}
      const {nickname, headImgurl} = public_device_member_data || {}

      return (
          <div>
            <div className={shareShow ? "m-pup-panel-block" : "m-pup-panel-none"}
                 onClick={() => setShareShow(!shareShow)}></div>
            <div className={shareShow ? "m-pup-ico" : "m-pup-panel-none"} onClick={() => setShareShow(!shareShow)}>
              <span>发送给朋友</span>
              <span>一起来体验</span>
            </div>
            {/* 百度地图 */}
            <div className="m-map-wrap">
              {organizationInfo && <Map longitude={longitude} latitude={latitude}/>}
            </div>
            <PublicDeviceHead deviceType={deviceType} address={address} organName={name} nickname={nickname}
                              headImgurl={headImgurl}/>
          </div>
      )
    }

    _getShare () {
      const {setShareShow, shareShow, organizationInfo, device} = this.props
      const {deviceType} = device || {}
      const {brandImgUrl} = organizationInfo || {}
      let deviceName = device && device.name

      return (
          <div className="m-public-address-wrap">
            <div onClick={()=>{this._goUrl()}}>
              {<PublicBanner deviceType={deviceType} banner={brandImgUrl} name={deviceName}></PublicBanner>}
            </div>
            {/*<h2>还有以下测量点：</h2>*/}
            {/*<ul>*/}
            {/*<li onClick={() => this._testClick('广东省广州市海珠区振兴大街27号')}>*/}
            {/*<div className="m-public-center-img"><img src={require('../../../../static/images/device/publicDevice/public_center1.jpg')}  alt="泾河服务站" /> </div>*/}
            {/*<h3>广州之窗</h3>*/}
            {/*<p>广东省广州市海珠区振兴大街27号</p>*/}
            {/*<div><span className="m-device-wrap">血压计</span></div>*/}
            {/*</li>*/}
            {/*<li onClick={() => this._testClick('广东省广州市海珠区振兴大街27号')}>*/}
            {/*<div className="m-public-center-img"><img src={require('../../../../static/images/device/publicDevice/public_center1.jpg')}  alt="泾河服务站" /> </div>*/}
            {/*<h3>广州之窗</h3>*/}
            {/*<p>广东省广州市海珠区振兴大街27号</p>*/}
            {/*<div><span className="m-device-wrap">血压计</span></div>*/}
            {/*</li>*/}
            {/*<li onClick={() => this._testClick('广东省广州市海珠区振兴大街27号')}>*/}
            {/*<div className="m-public-center-img"><img src={require('../../../../static/images/device/publicDevice/public_center1.jpg')}  alt="泾河服务站" /> </div>*/}
            {/*<h3>广州之窗</h3>*/}
            {/*<p>广东省广州市海珠区振兴大街27号</p>*/}
            {/*<div><span className="m-device-wrap">体脂秤</span><span className="m-device-wrap">血压计</span></div>*/}
            {/*</li>*/}
            {/*</ul>*/}
            <Button type={"primary"} onClick={() => setShareShow(!shareShow)}>分享</Button>
            <div className="m-bottom-text">感觉不错？可以分享朋友一起来体验哦！</div>
          </div>
      )
    }

  })
