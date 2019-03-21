import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
// util
import {debug} from '../../../util/common'
import {getLevelText,getSuggestText,getLevelImg} from '../../../util/weight/report'
// components
import WeightReportItem from '../../../components/weight/WeightReportItem'
import Title from '../../../components/common/title/Title'
import RankingList from '../../../components/weight/RankingList'
import ScrollView from '../../../components/common/scroll/ScrollView'
// actions
import actions from './actions'
// selector
import selectors from './selectors'

export default connect(
  debug(selectors),
  actions
)(class extends Component {

  componentDidMount() {
    let {params: {memberId,weightId}, loadData} = this.props
    loadData({memberId,weightId, pageLoad: true})

  }

  onRefresh () {
    this.setState({pageNo: 1});
  }

  onLoadMore () {
    // console.log(this)
    let {organData: {organId}, rankingListData, loadRankingData} = this.props
    let pageNo = Math.ceil(rankingListData.length/9) || 1
    loadRankingData({organId, rankingListData, pageNo, pageLoad: true})
  }

  state = {
    bmi:false,
    shareShow:false,
    pageNo:1,
  }
  componentWillUnmount() {
  }



  _setState(type,flag) {
    this.setState({
      [type]:flag
    })
  }
  _setShareShow(){
    const {shareShow} = this.state
    this.setState({
      shareShow:!shareShow
    })
  }
  _goOrgan(url) {
    window.location.href=url
  }
  _renderPublicDeviceBottom() {
    const {organData} = this.props
    const {deviveName,imgUrl,linkUrl,organName,organId} = organData || {}
    return (
      <div className="m-public-device-bottom" style={{display:deviveName ? 'block' : 'none'}}>
        <div className="m-data-from">数据来自<span>{deviveName}（CFDA认证）</span></div>
        <div className="m-public-device-info">
          {/*<div className="m-public-device-link" onClick={()=>{this._goOrgan(linkUrl)}}>*/}
            {/*点击了解机构信息*/}
          {/*</div>*/}
          {/*<div className="m-organization-title" onClick={()=>{this._goOrgan(linkUrl)}}>*/}
            {/*{organName}*/}
          {/*</div>*/}
          <div className="m-organization-img" style={{display:imgUrl ? 'block' :'none'}} onClick={()=>{this._goOrgan(linkUrl)}}>
            <img src={imgUrl} alt=""/>
          </div>
          {/*<div className="m-share-box">*/}
            {/*<div className="btn" onClick={() => this._setShareShow()}>分享</div>*/}
            {/*<p>感觉不错？可以分享朋友一起来体验哦</p>*/}
          {/*</div>*/}
        </div>
      </div>
    )
  }

  _rankingList () {
    const {myRankingData, rankingListData, organData} = this.props
    // console.log("排行榜数据", myRankingData, rankingListData, organData)
    const {organId, organName} = organData || {}
    return (
        <div style={{display: organId ? 'block' : 'none'}}>
            <RankingList organId={organId} organName={organName} myRankingData={myRankingData} rankingListData={rankingListData}  onRefresh={() => this.onRefresh()} onLoadMore={() => this.onLoadMore()} />
        </div>
    )
  }

  render() {
    const {weightReportData,push,params: {memberId,weightId},organData, myRankingData, rankingListData} = this.props
    const {deviveName,organCustomImgUrl,organName,organId} = organData || {}
    const {shareShow} = this.state
    const {measurementDate,bodyScore,beatPercent,bodyStyle,weightLevel,visceralFat,visceralFatLevel,water,waterLevel,protein,proteinLevel,basalMetabolism,basalMetabolismLevel,muscleLevel,ageOffset,ageOffsetLevel,sex,bmi,bone,boneLevel,muscle,weight,age,pbf,pbfLevel,bmiLevel} = weightReportData || {}

    require('../../../styles/weight/weightReport.less')
    let bmiFlag = true
    let pdfFlag = true
    let weightFlag = true
    let muscleFlag = true
    let basalMetabolismFlag = true
    let ageOffsetFlag = true
    let visceralFatFlag = true
    let waterFlag = true
    let proteinFlag = true
    let boneFlag = true
    let firstFlag = 0
    let secondFlag = 10
    if(typeof(bmiLevel) != 'undefined' && bmiLevel != 1){
      // console.log("bmi")
      bmiFlag= false
      firstFlag ++
      secondFlag --
    }
    if(typeof(pbfLevel) != 'undefined' && pbfLevel != 1){
      pdfFlag = false
      firstFlag ++
      secondFlag --
    }
    if(typeof(weightLevel) != 'undefined' && weightLevel !=1){
      weightFlag = false
      firstFlag ++
      secondFlag --
    }
    if(typeof(muscleLevel) != 'undefined' && muscleLevel < 1){
      muscleFlag = false
      firstFlag ++
      secondFlag --
    }
    if(typeof(basalMetabolismLevel) != 'undefined' && basalMetabolismLevel != 1){
      basalMetabolismFlag = false
      firstFlag ++
      secondFlag --
    }
    if(typeof(ageOffsetLevel) != 'undefined' && ageOffsetLevel > 0){
      ageOffsetFlag = false
      firstFlag ++
      secondFlag --
    }
    if(typeof(visceralFatLevel) != 'undefined' && visceralFatLevel != 0){
      visceralFatFlag = false
      firstFlag ++
      secondFlag --
    }
    if(typeof(waterLevel) != 'undefined' && waterLevel < 1){
      waterFlag = false
      firstFlag ++
      secondFlag --
    }
    if(typeof(proteinLevel) != 'undefined' && proteinLevel < 1){
      proteinFlag = false
      firstFlag ++
      secondFlag --
    }
    if(typeof(boneLevel) != 'undefined' && boneLevel != 1){
      boneFlag = false
      firstFlag ++
      secondFlag --
    }

    // console.log("secondFlag", secondFlag, firstFlag)
    // console.log("secondFlag", basalMetabolism)
    return (
      <div className="m-weight-report-wrap" style={{paddingBottom:deviveName ? '0':'0.6rem'}}>
        <Title title='身体报告' />
        <div className={shareShow ? "m-pup-panel-block" : "m-pup-panel-none"} onClick={() => this.setState({shareShow:false})}></div>
        <div className={shareShow ? "m-pup-ico" : "m-pup-panel-none"} onClick={() => this.setState({shareShow:false})}>
          <span>发送给朋友</span>
          <span>一起来体验</span>
        </div>
        {
          beatPercent ? (
              <div className="m-weight-top">
                <div className="m-time">{moment(measurementDate).format('MM月DD日 hh:mm')}</div>
                <div className="m-score">
                  <span className="font120">{bodyScore && bodyScore.toFixed(0)}</span>
                  分
                </div>
                <div className="m-text">你已击败{beatPercent}%的乐星人！</div>
              </div>
          ) : (
              <div className="m-weight-top">
                <div className="m-time">{moment(measurementDate).format('MM月DD日 hh:mm')}</div>
                <div className="m-score">
                  <span className="font120">{weight}</span>
                  kg
                </div>
              </div>
          )
        }

        {
          sex && getLevelText(pbfLevel,muscleLevel,sex) != "--" ? (
              <div className="m-weight-report-box">
                <div className="m-report-title">
                  <img className="m-ico" src={require('../../../../static/images/weight/icon-physical-report-size-analysis.png')} alt=""/>
                  体型分析
                </div>
                <div className="m-report-analysis clearfix" onClick={()=>{push(`/weight/${memberId}/physique?level=${getLevelImg(pbfLevel,muscleLevel)}`)}}>
                  <div className="left-box" >
                    <h3 className="title">{bodyStyle}</h3>
                    <p className="text">{sex && getLevelText(pbfLevel,muscleLevel,sex)}</p>
                    <p className="text">{sex && getSuggestText(bmi,muscle,sex,weight,pbf)}</p>
                  </div>
                  <div className="right-box">
                    {typeof(pbfLevel) != 'undefined' && <img src={require(`../../../../static/images/weight/${getLevelImg(pbfLevel,muscleLevel)}.png`)} alt=""/>}
                  </div>
                  <div className="m-arrow"></div>
                </div>

              </div>
          ) : ""
        }

        <div className="m-weight-report-box" style={{display : firstFlag === 0 ? 'none' : 'block'}}>
          <div className="m-report-title">
            <img className="m-ico" src={require('../../../../static/images/weight/icon-physical-report-attention.png')} alt=""/>
            以下数据需要关注
          </div>
          <div className="m-report-data-list">
            <ul>

              {!bmiFlag && <WeightReportItem key='1'  ageOffsetLevel={ageOffsetLevel} bmi={bmi} weight={weight} sex={sex} age={age} dataLevel={bmiLevel} value={bmi} type="bmi" name="BMI"></WeightReportItem>}

              {!pdfFlag && pbf != '0' && <WeightReportItem key='2' ageOffsetLevel={ageOffsetLevel} bmi={bmi} weight={weight} sex={sex} age={age} dataLevel={pbfLevel} value={pbf} type="pbf" name="脂肪率"></WeightReportItem>}
              {!weightFlag && <WeightReportItem key='3' ageOffsetLevel={ageOffsetLevel} bmi={bmi} weight={weight} sex={sex} age={age} dataLevel={weightLevel} value={weight} type="weight" name="体重"></WeightReportItem>}
              {!muscleFlag && muscle != '0' && <WeightReportItem key='4' ageOffsetLevel={ageOffsetLevel} bmi={bmi} weight={weight} sex={sex} age={age} dataLevel={muscleLevel} value={muscle} type="muscle" name="肌肉量"></WeightReportItem>}
              {!basalMetabolismFlag && basalMetabolism != '0' && <WeightReportItem key='5' ageOffsetLevel={ageOffsetLevel} bmi={bmi} weight={weight} sex={sex} age={age} dataLevel={basalMetabolismLevel} value={basalMetabolism} type="basalMetabolism" name="基础代谢"></WeightReportItem>}
              {!ageOffsetFlag && <WeightReportItem key='6' ageOffsetLevel={ageOffsetLevel} bmi={bmi} weight={weight} sex={sex} age={age} dataLevel={ageOffsetLevel} value={ageOffset+age} type="ageOffset" name="身体年龄"></WeightReportItem>}
              {!visceralFatFlag && visceralFat != '0' && <WeightReportItem key='7' ageOffsetLevel={ageOffsetLevel} bmi={bmi} weight={weight} sex={sex} age={age} dataLevel={visceralFatLevel} value={visceralFat} type="visceralFat" name="内脏脂肪等级"></WeightReportItem>}
              {!waterFlag && water != '0' && <WeightReportItem key='8' ageOffsetLevel={ageOffsetLevel} bmi={bmi} weight={weight} sex={sex} age={age} dataLevel={waterLevel} value={water} type="water" name="水分率"></WeightReportItem>}
              {!proteinFlag && protein != '0' && <WeightReportItem key='9' ageOffsetLevel={ageOffsetLevel} bmi={bmi} weight={weight} sex={sex} age={age} dataLevel={proteinLevel} value={protein} type="protein" name="蛋白质"></WeightReportItem>}
              {!boneFlag && bone != '0' && <WeightReportItem key='10' ageOffsetLevel={ageOffsetLevel} bmi={bmi} weight={weight} sex={sex} age={age} dataLevel={boneLevel} value={bone} type="bone" name="骨量"></WeightReportItem>}
              </ul>
          </div>
        </div>
        <div className="m-weight-report-box" style={{display : ((bmiFlag && bmi) || (pdfFlag && pbf) || (weightFlag && weight && weightLevel) || (muscleFlag && muscle) || (basalMetabolismFlag && basalMetabolism) || (ageOffsetFlag && ageOffset) || (visceralFatFlag && visceralFat) || (waterFlag && water) || (proteinFlag && protein) || (boneFlag && bone)) ? 'block' : 'none'}}>
          <div className="m-report-title">
            <img className="m-ico" src={require('../../../../static/images/weight/icon-physical-report-ideal.png')} alt=""/>
            以下数据处于理想状态
          </div>
          <div className="m-report-data-list">
            <ul>

              {bmiFlag && bmi && <WeightReportItem key='11'  ageOffsetLevel={ageOffsetLevel} bmi={bmi} weight={weight} sex={sex} age={age} dataLevel={bmiLevel} value={bmi} type="bmi" name="BMI"></WeightReportItem>}

              {pdfFlag && pbf != '0' && <WeightReportItem key='12' ageOffsetLevel={ageOffsetLevel} bmi={bmi} weight={weight} sex={sex} age={age} dataLevel={pbfLevel} value={pbf} type="pbf" name="脂肪率"></WeightReportItem>}
              {weightFlag && weight && weightLevel != 'undefined' && <WeightReportItem key='13' ageOffsetLevel={ageOffsetLevel} bmi={bmi} weight={weight} sex={sex} age={age} dataLevel={weightLevel} value={weight} type="weight" name="体重"></WeightReportItem>}
              {muscleFlag && muscleLevel != 'undefined' && muscle != '0' && <WeightReportItem key='14' ageOffsetLevel={ageOffsetLevel} bmi={bmi} weight={weight} sex={sex} age={age} dataLevel={muscleLevel} value={muscle} type="muscle" name="肌肉量"></WeightReportItem>}
              {basalMetabolismFlag  && basalMetabolismLevel != 'undefined' && basalMetabolism != '0' && <WeightReportItem key='15' ageOffsetLevel={ageOffsetLevel} bmi={bmi} weight={weight} sex={sex} age={age} dataLevel={basalMetabolismLevel} value={basalMetabolism} type="basalMetabolism" name="基础代谢"></WeightReportItem>}
              {ageOffsetFlag && ageOffset && <WeightReportItem key='16' ageOffsetLevel={ageOffsetLevel} bmi={bmi} weight={weight} sex={sex} age={age} dataLevel={ageOffsetLevel} value={ageOffset+age} type="ageOffset" name="身体年龄"></WeightReportItem>}
              {visceralFatFlag && visceralFatLevel != 'undefined' && visceralFat != '0' && <WeightReportItem key='17' ageOffsetLevel={ageOffsetLevel} bmi={bmi} weight={weight} sex={sex} age={age} dataLevel={visceralFatLevel} value={visceralFat} type="visceralFat" name="内脏脂肪等级"></WeightReportItem>}
              {waterFlag && waterLevel != 'undefined' && water != '0' && <WeightReportItem key='18' ageOffsetLevel={ageOffsetLevel} bmi={bmi} weight={weight} sex={sex} age={age} dataLevel={waterLevel} value={water} type="water" name="水分率"></WeightReportItem>}
              {proteinFlag && proteinLevel != 'undefined' && protein != '0' && <WeightReportItem key='19' ageOffsetLevel={ageOffsetLevel} bmi={bmi} weight={weight} sex={sex} age={age} dataLevel={proteinLevel} value={protein} type="protein" name="蛋白质"></WeightReportItem>}
              {boneFlag && boneLevel != 'undefined' && bone != '0' && <WeightReportItem key='20' ageOffsetLevel={ageOffsetLevel} bmi={bmi} weight={weight} sex={sex} age={age} dataLevel={boneLevel} value={bone} type="bone" name="骨量"></WeightReportItem>}
            </ul>
          </div>
        </div>
        {this._renderPublicDeviceBottom()}
        {this._rankingList()}
      </div>
    )
  }
})

